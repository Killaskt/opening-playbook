import { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Edge-swipe-to-go-back gesture, matching iOS interactive pop.
 *
 * Attach the returned ref to a page's root element. A drag that begins within
 * EDGE px of the left screen edge and moves right past COMPLETE px navigates
 * back; anything shorter snaps the page back into place. The page follows the
 * finger during the drag for a native feel.
 */
export function useSwipeBack<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Clear any leftover exit-animation styles on every navigation. React reuses
  // this DOM node across same-component route changes (e.g. /move/a → /move/b,
  // and the navigate(-1) back to /move/a), so the transform/opacity applied
  // during a completed back-swipe would otherwise persist and leave the page we
  // land on translated off-screen and invisible.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = '';
    el.style.transform = '';
    el.style.opacity = '';
  }, [location.key]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const EDGE = 28; // px from the left edge where a back-swipe may start
    const COMPLETE = 80; // px of horizontal travel needed to trigger back
    let startX = 0;
    let startY = 0;
    let dx = 0;
    let tracking = false;
    let decided = false;
    let horizontal = false;

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t || t.clientX > EDGE) return;
      startX = t.clientX;
      startY = t.clientY;
      dx = 0;
      tracking = true;
      decided = false;
      horizontal = false;
    };

    const onMove = (e: TouchEvent) => {
      if (!tracking) return;
      const t = e.touches[0];
      if (!t) return;
      dx = t.clientX - startX;
      const dy = t.clientY - startY;

      if (!decided) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        horizontal = Math.abs(dx) > Math.abs(dy);
        decided = true;
        if (!horizontal) {
          tracking = false; // vertical scroll — let it be
          return;
        }
      }

      if (dx < 0) dx = 0;
      el.style.transition = 'none';
      el.style.transform = `translateX(${dx}px)`;
      el.style.opacity = String(Math.max(0.4, 1 - dx / (window.innerWidth * 1.5)));
      e.preventDefault(); // stop the page from scrolling while swiping back
    };

    const settle = () => {
      el.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
      el.style.transform = '';
      el.style.opacity = '';
    };

    const onEnd = () => {
      if (!tracking) return;
      tracking = false;
      if (horizontal && dx > COMPLETE) {
        el.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
        el.style.transform = `translateX(${window.innerWidth}px)`;
        el.style.opacity = '0';
        window.setTimeout(() => navigate(-1), 180);
      } else if (decided && horizontal) {
        settle();
      }
    };

    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: false });
    el.addEventListener('touchend', onEnd, { passive: true });
    el.addEventListener('touchcancel', onEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onEnd);
      el.removeEventListener('touchcancel', onEnd);
    };
  }, [navigate]);

  return ref;
}

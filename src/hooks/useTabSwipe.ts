import { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/** Left-to-right order of the main tab routes. Must match LiquidTabBar. */
const TAB_ORDER = ['/', '/library', '/learn'];

/** Walk up from the touched node; bail if the swipe began inside something that
 *  scrolls horizontally (e.g. the Library filter row) so we don't hijack it. */
function startsInHorizontalScroller(node: EventTarget | null, boundary: HTMLElement): boolean {
  let el = node as HTMLElement | null;
  while (el && el !== boundary) {
    const style = window.getComputedStyle(el);
    const ox = style.overflowX;
    if ((ox === 'auto' || ox === 'scroll') && el.scrollWidth > el.clientWidth + 1) {
      return true;
    }
    el = el.parentElement;
  }
  return false;
}

/**
 * Horizontal swipe navigation between the main tab sections. Attach the returned
 * ref to a tab page's root element: a left/right drag follows the finger and, past
 * a threshold, navigates to the adjacent tab (with rubber-band resistance at the
 * ends). Vertical scrolling and horizontal scrollers are left untouched.
 */
export function useTabSwipe<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const index = TAB_ORDER.indexOf(location.pathname);
    if (index === -1) return; // not a tab page — no-op

    const hasPrev = index > 0;
    const hasNext = index < TAB_ORDER.length - 1;
    const COMPLETE = 60; // px of travel to commit to the adjacent tab

    let startX = 0;
    let startY = 0;
    let dx = 0;
    let tracking = false;
    let decided = false;
    let horizontal = false;

    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      if (startsInHorizontalScroller(e.target, el)) return;
      const t = e.touches[0];
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
      dx = t.clientX - startX;
      const dy = t.clientY - startY;

      if (!decided) {
        if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
        // Bias toward vertical: only treat as a tab swipe when clearly horizontal.
        horizontal = Math.abs(dx) > Math.abs(dy) * 1.3;
        decided = true;
        if (!horizontal) {
          tracking = false; // it's a scroll — let it be
          return;
        }
      }

      // Rubber-band when there's no tab in the swipe direction.
      const atEdge = (dx > 0 && !hasPrev) || (dx < 0 && !hasNext);
      const follow = atEdge ? dx * 0.25 : dx;
      el.style.transition = 'none';
      el.style.transform = `translateX(${follow}px)`;
      e.preventDefault();
    };

    const settle = () => {
      el.style.transition = 'transform 0.25s ease';
      el.style.transform = '';
    };

    const onEnd = () => {
      if (!tracking) return;
      tracking = false;
      if (!horizontal) return;

      if (dx <= -COMPLETE && hasNext) {
        el.style.transition = 'none';
        el.style.transform = '';
        navigate(TAB_ORDER[index + 1]);
      } else if (dx >= COMPLETE && hasPrev) {
        el.style.transition = 'none';
        el.style.transform = '';
        navigate(TAB_ORDER[index - 1]);
      } else {
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
  }, [navigate, location.pathname]);

  return ref;
}

import { useRef, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';

interface TabItem {
  to: string;
  label: string;
  icon: string;
}

const TABS: TabItem[] = [
  { to: '/',        label: 'Moves',   icon: '♟' },
  { to: '/library', label: 'Library', icon: '☰' },
  { to: '/learn',   label: 'Learn',   icon: '✦' },
];

export function LiquidTabBar() {
  const { colors } = useTheme();
  const location = useLocation();
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);
  const [prevIndex, setPrevIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLElement | null>(null);

  const activeIndex = TABS.findIndex((t) =>
    t.to === '/' ? location.pathname === '/' : location.pathname.startsWith(t.to)
  );

  // Animate the sliding pill to the active tab
  useEffect(() => {
    const el = tabRefs.current[activeIndex];
    const container = containerRef.current;
    if (!el || !container) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = el.getBoundingClientRect();

    setPillStyle({
      left: tabRect.left - containerRect.left,
      width: tabRect.width,
    });
    setPrevIndex(activeIndex);
  }, [activeIndex]);

  const isDark = colors.bg === '#111113';

  const islandBg = isDark
    ? 'rgba(28, 28, 36, 0.72)'
    : 'rgba(255, 255, 255, 0.62)';

  const islandBorder = isDark
    ? 'rgba(255, 255, 255, 0.10)'
    : 'rgba(255, 255, 255, 0.80)';

  const pillBg = isDark
    ? 'rgba(255, 255, 255, 0.10)'
    : 'rgba(255, 255, 255, 0.85)';

  const pillBorder = isDark
    ? 'rgba(255, 255, 255, 0.18)'
    : 'rgba(200, 210, 230, 0.60)';

  return (
    <nav
      ref={containerRef}
      style={{
        position: 'fixed',
        bottom: 'max(env(safe-area-inset-bottom, 0px) + 16px, 24px)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '6px',
        gap: 0,
        borderRadius: 999,
        background: islandBg,
        backdropFilter: 'blur(40px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
        border: `1px solid ${islandBorder}`,
        boxShadow: isDark
          ? '0 8px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.06) inset'
          : '0 8px 32px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.9) inset',
        zIndex: 100,
        // Sliding pill indicator (positioned relative to this container)
        ...(pillStyle
          ? {
              '--pill-left': `${pillStyle.left}px`,
              '--pill-width': `${pillStyle.width}px`,
            }
          : {}),
      } as React.CSSProperties}
    >
      {/* Sliding pill background */}
      {pillStyle && (
        <div
          style={{
            position: 'absolute',
            top: 6,
            bottom: 6,
            left: pillStyle.left,
            width: pillStyle.width,
            borderRadius: 999,
            background: pillBg,
            border: `1px solid ${pillBorder}`,
            boxShadow: isDark
              ? '0 2px 8px rgba(0,0,0,0.3)'
              : '0 2px 12px rgba(0,0,0,0.10)',
            transition: prevIndex === -1
              ? 'none'
              : 'left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            pointerEvents: 'none',
          }}
        />
      )}

      {TABS.map((tab, i) => {
        const isActive = i === activeIndex;
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            ref={(el) => { tabRefs.current[i] = el; }}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              textDecoration: 'none',
              padding: '8px 20px',
              borderRadius: 999,
              minWidth: 72,
              transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: isActive ? 'scale(1.04)' : 'scale(1)',
            }}
          >
            <span
              style={{
                fontSize: 19,
                lineHeight: '22px',
                color: isActive ? colors.accent : colors.tabBarInactive,
                transition: 'color 0.22s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
                display: 'block',
              }}
            >
              {tab.icon}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: isActive ? 700 : 500,
                letterSpacing: isActive ? '0.02em' : '0',
                color: isActive ? colors.accent : colors.tabBarInactive,
                transition: 'color 0.22s ease, font-weight 0.22s ease',
                lineHeight: '12px',
              }}
            >
              {tab.label}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}

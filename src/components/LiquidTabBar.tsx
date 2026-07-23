import { useRef, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
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

function getActiveIndex(pathname: string): number {
  if (pathname.startsWith('/library')) return 1;
  if (pathname.startsWith('/learn')) return 2;
  return 0;
}

interface PillState {
  left: number;
  width: number;
  animated: boolean;
}

export function LiquidTabBar() {
  const { colors, isDark } = useTheme();
  const location = useLocation();
  const activeIndex = getActiveIndex(location.pathname);

  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevIndexRef = useRef<number | null>(null);

  const [pill, setPill] = useState<PillState | null>(null);

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const tabEl = tabRefs.current[activeIndex];
      if (!container || !tabEl) return;

      const containerRect = container.getBoundingClientRect();
      const tabRect = tabEl.getBoundingClientRect();

      const left = tabRect.left - containerRect.left;
      const width = tabRect.width;
      const isFirstMount = prevIndexRef.current === null;
      prevIndexRef.current = activeIndex;

      setPill({ left, width, animated: !isFirstMount });
    };

    const frame = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, isDark]);

  const pillIndicatorStyle: CSSProperties = pill
    ? {
        position: 'absolute',
        top: 4,
        bottom: 4,
        left: pill.left,
        width: pill.width,
        borderRadius: 999,
        backgroundColor: isDark
          ? 'rgba(255,255,255,0.10)'
          : 'rgba(255,255,255,0.85)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.90)'}`,
        boxShadow: isDark
          ? 'inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 1px 4px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.90)',
        transition: pill.animated
          ? 'left 0.35s cubic-bezier(0.34,1.56,0.64,1), width 0.35s cubic-bezier(0.34,1.56,0.64,1)'
          : 'none',
        pointerEvents: 'none',
        zIndex: 0,
      }
    : { display: 'none' };

  const islandStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark
      ? 'rgba(28,28,36,0.72)'
      : 'rgba(255,255,255,0.62)',
    backdropFilter: 'blur(40px) saturate(1.8)',
    WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.80)'}`,
    borderRadius: 999,
    boxShadow: isDark
      ? '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)'
      : '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.90)',
    padding: 4,
  };

  const outerStyle: CSSProperties = {
    position: 'fixed',
    bottom: 'max(calc(env(safe-area-inset-bottom, 0px) + 16px), 24px)',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100,
    pointerEvents: 'auto',
  };

  return (
    <nav style={outerStyle} aria-label="Main navigation">
      <div ref={containerRef} style={islandStyle}>
        <div style={pillIndicatorStyle} aria-hidden="true" />

        {TABS.map((tab, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={tab.to}
              ref={(el) => { tabRefs.current[idx] = el; }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <NavLink
                to={tab.to}
                end={tab.to === '/'}
                style={{
                  display: 'flex',
                  flexDirection: 'column' as const,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  textDecoration: 'none',
                  padding: '8px 20px',
                  minWidth: 72,
                  borderRadius: 999,
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                  transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
                }}
              >
                <span
                  style={{
                    fontSize: 19,
                    lineHeight: '22px',
                    color: isActive ? colors.tabBarActive : colors.tabBarInactive,
                    transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
                    transition: 'color 0.18s ease, transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
                    userSelect: 'none',
                    display: 'block',
                  }}
                >
                  {tab.icon}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: isActive ? '700' : '500',
                    letterSpacing: isActive ? '0.02em' : '0em',
                    color: isActive ? colors.tabBarActive : colors.tabBarInactive,
                    transition: 'color 0.18s ease',
                    userSelect: 'none',
                    display: 'block',
                  }}
                >
                  {tab.label}
                </span>
              </NavLink>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

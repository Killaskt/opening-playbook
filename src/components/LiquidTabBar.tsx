import type { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';

interface TabItem {
  to: string;
  label: string;
  icon: string;
}

const TABS: TabItem[] = [
  { to: '/',         label: 'Moves',   icon: '♟' },
  { to: '/library',  label: 'Library', icon: '☰' },
  { to: '/learn',    label: 'Learn',   icon: '✦' },
];

export function LiquidTabBar() {
  const { colors, spacing, typography } = useTheme();

  const barStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'stretch',
    gap: spacing.sm,
    backgroundColor: colors.cardGlassStrong,
    borderTop: `1px solid ${colors.glassBorder}`,
    padding: `${spacing.sm}px ${spacing.xl}px`,
    paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)',
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    zIndex: 100,
  };

  return (
    <nav style={barStyle}>
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          style={({ isActive }) => ({
            flex: 1,
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            textDecoration: 'none',
            paddingTop: spacing.sm,
            paddingBottom: spacing.sm,
            borderRadius: 14,
            backgroundColor: isActive ? colors.accentBg : 'transparent',
            border: isActive ? `1px solid ${colors.accent}30` : '1px solid transparent',
            transition: 'background-color 0.18s ease, border-color 0.18s ease',
          })}
        >
          {({ isActive }) => (
            <>
              <span
                style={{
                  fontSize: 20,
                  lineHeight: '24px',
                  color: isActive ? colors.accent : colors.tabBarInactive,
                  transition: 'color 0.18s ease',
                }}
              >
                {tab.icon}
              </span>
              <span
                style={{
                  fontSize: typography.labelSM.fontSize,
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? colors.accent : colors.tabBarInactive,
                  transition: 'color 0.18s ease',
                }}
              >
                {tab.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';

interface DetailHeaderProps {
  title?: string;
}

/**
 * Sticky glass navigation header for detail pages. A circular frosted back
 * button on the left, with an optional title that stays pinned while the page
 * scrolls underneath — matching the floating liquid-glass tab bar aesthetic.
 */
export function DetailHeader({ title }: DetailHeaderProps) {
  const navigate = useNavigate();
  const { colors, spacing, typography, elevation, isDark } = useTheme();

  const barStyle: CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 20,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: `${spacing.sm}px ${spacing.lg}px`,
    paddingTop: `calc(env(safe-area-inset-top, 0px) + ${spacing.sm}px)`,
    background: isDark ? 'rgba(17, 17, 19, 0.72)' : 'rgba(250, 248, 245, 0.72)',
    backdropFilter: 'blur(20px) saturate(1.6)',
    WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
    borderBottom: `1px solid ${colors.borderLight}`,
  };

  const backBtnStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    flexShrink: 0,
    borderRadius: 999,
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.cardGlassStrong,
    color: colors.text,
    fontSize: 22,
    lineHeight: 1,
    paddingBottom: 3,
    cursor: 'pointer',
    ...elevation.sm,
  };

  const titleStyle: CSSProperties = {
    fontSize: typography.titleSM.fontSize,
    fontWeight: 600,
    color: colors.text,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  return (
    <div style={barStyle}>
      <button style={backBtnStyle} onClick={() => navigate(-1)} aria-label="Back">
        ‹
      </button>
      {title && <span style={titleStyle}>{title}</span>}
    </div>
  );
}

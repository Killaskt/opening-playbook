import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme, ThemeMode } from '../theme/ThemeContext';
import { MailIcon } from './TabIcons';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
}

const MODE_ICON: Record<ThemeMode, string> = {
  light: '☀',
  dark: '☽',
  system: '◑',
};

const MODE_LABEL: Record<ThemeMode, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'Auto',
};

export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  const navigate = useNavigate();
  const { colors, mode, cycleMode, spacing, typography, elevation } = useTheme();

  const containerStyle: CSSProperties = {
    paddingTop: `calc(env(safe-area-inset-top, 0px) + ${spacing.xl}px)`,
    paddingBottom: spacing.sm,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
  };

  const rowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  };

  const titleStyle: CSSProperties = {
    fontSize: typography.titleXL.fontSize,
    fontWeight: typography.titleXL.fontWeight,
    lineHeight: `${typography.titleXL.lineHeight}px`,
    color: colors.text,
    margin: 0,
  };

  const subtitleStyle: CSSProperties = {
    fontSize: typography.bodySM.fontSize,
    lineHeight: `${typography.bodySM.lineHeight}px`,
    color: colors.textTertiary,
    marginTop: 4,
    marginBottom: 0,
  };

  const buttonsRowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 4,
    flexShrink: 0,
  };

  const themeBtnStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 10,
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.cardGlassStrong,
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    cursor: 'pointer',
    ...elevation.sm,
  };

  const mailBtnStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.cardGlassStrong,
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    cursor: 'pointer',
    ...elevation.sm,
  };

  return (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <div style={{ flex: 1 }}>
          <h1 style={titleStyle}>{title}</h1>
          {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        </div>
        <div style={buttonsRowStyle}>
          <button style={themeBtnStyle} onClick={cycleMode} aria-label={`Theme: ${MODE_LABEL[mode]}`}>
            <span style={{ fontSize: 16, color: colors.textSecondary, userSelect: 'none' }}>
              {MODE_ICON[mode]}
            </span>
            <span style={{ fontSize: 11, fontWeight: '600', color: colors.textTertiary, userSelect: 'none' }}>
              {MODE_LABEL[mode]}
            </span>
          </button>
          <button style={mailBtnStyle} onClick={() => navigate('/contact')} aria-label="Contact">
            <MailIcon color={colors.textSecondary} size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

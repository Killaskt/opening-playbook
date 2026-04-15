import type { CSSProperties, ReactNode } from 'react';
import { useTheme } from '../theme/ThemeContext';

// ── GlassCard ────────────────────────────────────────────────────────────────

interface GlassCardProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function GlassCard({ children, style }: GlassCardProps) {
  const { colors, elevation } = useTheme();

  const cardStyle: CSSProperties = {
    borderRadius: 16,
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.cardGlass,
    overflow: 'hidden',
    ...elevation.md,
    ...style,
  };

  return <div style={cardStyle}>{children}</div>;
}

// ── SectionCard ───────────────────────────────────────────────────────────────

interface SectionCardProps {
  children: ReactNode;
  accentColor?: string;
  style?: CSSProperties;
}

export function SectionCard({ children, accentColor, style }: SectionCardProps) {
  const { colors, spacing } = useTheme();

  const sectionCardStyle: CSSProperties = {
    borderRadius: 14,
    border: `1px solid ${colors.glassBorder}`,
    borderTop: `4px solid ${accentColor ?? colors.accent}`,
    backgroundColor: colors.cardGlass,
    padding: spacing.xl,
    ...style,
  };

  return <div style={sectionCardStyle}>{children}</div>;
}

// ── PillChip ──────────────────────────────────────────────────────────────────

interface PillChipProps {
  label: string;
  backgroundColor: string;
  textColor: string;
  style?: CSSProperties;
  textStyle?: CSSProperties;
}

export function PillChip({ label, backgroundColor, textColor, style, textStyle }: PillChipProps) {
  const { spacing, typography } = useTheme();

  const pillStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    minHeight: 28,
    backgroundColor,
    ...style,
  };

  const labelStyle: CSSProperties = {
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
    lineHeight: `${typography.label.lineHeight}px`,
    color: textColor,
    ...textStyle,
  };

  return (
    <div style={pillStyle}>
      <span style={labelStyle}>{label}</span>
    </div>
  );
}

// ── EcoBadge ──────────────────────────────────────────────────────────────────

interface EcoBadgeProps {
  code: string;
  style?: CSSProperties;
}

export function EcoBadge({ code, style }: EcoBadgeProps) {
  const { colors, spacing, typography } = useTheme();

  const ecoStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.chipBg,
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
    alignSelf: 'flex-start' as const,
    ...style,
  };

  const textStyle: CSSProperties = {
    fontSize: typography.labelSM.fontSize,
    fontWeight: typography.labelSM.fontWeight,
    lineHeight: `${typography.labelSM.lineHeight}px`,
    color: colors.textMuted,
    letterSpacing: 0.3,
  };

  return (
    <div style={ecoStyle}>
      <span style={textStyle}>{code}</span>
    </div>
  );
}

// ── SectionTitle ──────────────────────────────────────────────────────────────

interface SectionTitleProps {
  children: ReactNode;
  style?: CSSProperties;
  color?: string;
}

export function SectionTitle({ children, style, color }: SectionTitleProps) {
  const { colors, typography } = useTheme();

  const titleStyle: CSSProperties = {
    fontSize: typography.titleMD.fontSize,
    fontWeight: typography.titleMD.fontWeight,
    lineHeight: `${typography.titleMD.lineHeight}px`,
    color: color ?? colors.text,
    marginBottom: 12,
    marginTop: 0,
    ...style,
  };

  return <div style={titleStyle}>{children}</div>;
}

import type { CSSProperties } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { IDEA_ICONS, IdeaIconKind } from './IdeaIcons';
import type { ThemeColors } from '../theme/colors';

interface BulletRowProps {
  text: string;
  kind?: IdeaIconKind;
}

function kindColor(kind: IdeaIconKind, colors: ThemeColors): string {
  switch (kind) {
    case 'pro': return colors.green;
    case 'con': return colors.red;
    case 'warning': return colors.orange;
    case 'center': return colors.purple;
    case 'development': return colors.teal;
    case 'kingSafety': return colors.accent;
    case 'pawnStructure': return colors.orange;
    case 'spaceTempo': return colors.teal;
    case 'planning': return colors.purple;
    case 'line': return colors.textSecondary;
    case 'idea':
    default: return colors.accent;
  }
}

export function BulletRow({ text, kind = 'idea' }: BulletRowProps) {
  const { colors, spacing, typography } = useTheme();

  const rowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  };

  const iconStyle: CSSProperties = {
    color: kindColor(kind, colors),
    fontSize: typography.bodyMD.fontSize,
    lineHeight: `${typography.bodyMD.lineHeight}px`,
    minWidth: 16,
    flexShrink: 0,
    userSelect: 'none',
    textAlign: 'center',
  };

  const textStyle: CSSProperties = {
    ...typography.bodyMD,
    lineHeight: `${typography.bodyMD.lineHeight}px`,
    color: colors.text,
    flex: 1,
  };

  return (
    <div style={rowStyle}>
      <span style={iconStyle}>{IDEA_ICONS[kind]}</span>
      <span style={textStyle}>{text}</span>
    </div>
  );
}

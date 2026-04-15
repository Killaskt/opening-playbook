import type { CSSProperties } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { GlassCard } from './UIPrimitives';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

export function SearchBar({ value, onChangeText, placeholder }: SearchBarProps) {
  const { colors, spacing, typography } = useTheme();
  const showClear = value.length > 0;

  const wrapperStyle: CSSProperties = {
    padding: spacing.md,
    marginLeft: spacing.lg,
    marginRight: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: 15,
  };

  const rowStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle: CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: 12,
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.inputBg,
    color: colors.text,
    fontSize: typography.bodyLG.fontSize,
    lineHeight: `${typography.bodyLG.lineHeight}px`,
    padding: `${spacing.md}px ${showClear ? 44 : 16}px ${spacing.md}px 16px`,
    outline: 'none',
  };

  const clearBtnStyle: CSSProperties = {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `0 ${spacing.xs}px`,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: colors.textMuted,
    fontSize: 22,
    lineHeight: '24px',
    fontWeight: '300',
  };

  return (
    <GlassCard style={wrapperStyle}>
      <div style={rowStyle}>
        <input
          type="text"
          style={inputStyle}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
        />
        {showClear && (
          <button
            style={clearBtnStyle}
            onClick={() => onChangeText('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </GlassCard>
  );
}

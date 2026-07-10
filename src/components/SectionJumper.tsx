import type { CSSProperties } from 'react';
import { useTheme } from '../theme/ThemeContext';

interface SectionJumperProps {
  onPrev: () => void;
  onNext: () => void;
  canGoUp: boolean;
  canGoDown: boolean;
}

export function SectionJumper({ onPrev, onNext, canGoUp, canGoDown }: SectionJumperProps) {
  const { colors } = useTheme();

  const wrapStyle: CSSProperties = {
    position: 'fixed',
    bottom: 80,
    right: 16,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 20,
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.cardGlassStrong,
    backdropFilter: 'blur(24px) saturate(1.5)',
    WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
    boxShadow: `inset 0 1px 0 ${colors.glassSpecularLight}, 0 4px 16px rgba(0,0,0,0.14)`,
    overflow: 'hidden',
    zIndex: 100,
  };

  const btnStyle = (enabled: boolean, borderBottom: boolean): CSSProperties => ({
    width: 38,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    borderBottom: borderBottom ? `1px solid ${colors.glassBorder}` : 'none',
    cursor: enabled ? 'pointer' : 'default',
    opacity: enabled ? 1 : 0.35,
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  });

  return (
    <div style={wrapStyle}>
      <button
        style={btnStyle(canGoUp, true)}
        onClick={onPrev}
        disabled={!canGoUp}
        aria-label="Previous section"
      >
        ▲
      </button>
      <button
        style={btnStyle(canGoDown, false)}
        onClick={onNext}
        disabled={!canGoDown}
        aria-label="Next section"
      >
        ▼
      </button>
    </div>
  );
}

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useTheme } from '../theme/ThemeContext';

interface ResponseGridProps {
  responses: { id: string; move: string; name: string }[];
  onPress: (id: string) => void;
}

export function ResponseGrid({ responses, onPress }: ResponseGridProps) {
  const [pressedId, setPressedId] = useState<string | null>(null);
  const { colors, spacing } = useTheme();

  const gridStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  };

  const cardStyle = (id: string): CSSProperties => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 14,
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: pressedId === id ? colors.accentBg : colors.cardGlassStrong,
    cursor: 'pointer',
    gap: spacing.md,
    transition: 'background-color 0.1s ease',
  });

  const moveCircleStyle: CSSProperties = {
    width: 48,
    height: 48,
    borderRadius: 14,
    border: `1px solid ${colors.accent}40`,
    backgroundColor: colors.accentBg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const moveTextStyle: CSSProperties = {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: colors.accent,
  };

  return (
    <div style={gridStyle}>
      {responses.map((resp) => (
        <div
          key={resp.id}
          style={cardStyle(resp.id)}
          onClick={() => onPress(resp.id)}
          onMouseDown={() => setPressedId(resp.id)}
          onMouseUp={() => setPressedId(null)}
          onMouseLeave={() => setPressedId(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onPress(resp.id)}
        >
          <div style={moveCircleStyle}>
            <span style={moveTextStyle}>{resp.move}</span>
          </div>
          <span style={{ fontSize: 15, fontWeight: '600', color: colors.text, flex: 1 }}>
            {resp.name}
          </span>
          <span style={{ fontSize: 24, fontWeight: '600', color: colors.accent }}>›</span>
        </div>
      ))}
    </div>
  );
}

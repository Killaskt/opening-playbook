import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { AnimatedChessBoard } from './AnimatedChessBoard';
import type { TrapInfo } from '../types';

export function TrapCard({ trap }: { trap: TrapInfo }) {
  const [expanded, setExpanded] = useState(false);
  const { colors, spacing, typography } = useTheme();

  const cardStyle: CSSProperties = {
    borderRadius: 8,
    border: `1px solid ${colors.yellow}40`,
    backgroundColor: colors.yellowBg,
    overflow: 'hidden',
    cursor: 'pointer',
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  };

  const nameStyle: CSSProperties = {
    fontSize: 15,
    fontWeight: '600',
    color: colors.yellow,
    flex: 1,
  };

  const toggleStyle: CSSProperties = {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.yellow,
    paddingLeft: spacing.md,
    userSelect: 'none',
  };

  const bodyStyle: CSSProperties = {
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 14,
  };

  const descStyle: CSSProperties = {
    fontSize: typography.bodyMD.fontSize,
    lineHeight: `${typography.bodyMD.lineHeight}px`,
    color: colors.textSecondary,
    margin: 0,
    marginBottom: trap.pgn ? spacing.md : 0,
  };

  return (
    <div style={cardStyle} onClick={() => setExpanded((e) => !e)}>
      <div style={headerStyle}>
        <span style={nameStyle}>{trap.name}</span>
        <span style={toggleStyle}>{expanded ? '−' : '+'}</span>
      </div>
      {expanded && (
        <div style={bodyStyle}>
          <p style={descStyle}>{trap.description}</p>
          {trap.pgn && (
            <div onClick={(e) => e.stopPropagation()}>
              <AnimatedChessBoard pgn={trap.pgn} compact />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

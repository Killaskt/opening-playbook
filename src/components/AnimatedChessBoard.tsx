import { useState, useEffect, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Chess } from 'chess.js';
import type { BoardArrow } from '../types';
import { useTheme } from '../theme/ThemeContext';
import { renderPiece } from './ChessPieces';

interface AnimatedChessBoardProps {
  pgn: string;
  compact?: boolean;
  label?: string;
  arrows?: BoardArrow[];
  responses?: { id: string; move: string; name: string }[];
  onResponsePress?: (id: string) => void;
  /** When true the board initialises at the final position of the PGN */
  startAtEnd?: boolean;
}

// ── Arrow geometry helpers ────────────────────────────────────────────────────

/** Convert a square name ("e4") to [col, row] in board coords (0-indexed from top-left a8) */
function squareToXY(sq: string, squareSize: number): { cx: number; cy: number } {
  const col = sq.charCodeAt(0) - 97;          // 'a'=0 … 'h'=7
  const row = 8 - parseInt(sq[1], 10);         // '8'=0 … '1'=7
  return {
    cx: col * squareSize + squareSize / 2,
    cy: row * squareSize + squareSize / 2,
  };
}

interface ArrowSpec {
  from: string;
  to: string;
  color: string;
}

function BoardArrowsOverlay({
  arrows,
  squareSize,
}: {
  arrows: ArrowSpec[];
  squareSize: number;
}) {
  if (arrows.length === 0) return null;

  const boardPx = squareSize * 8;
  const SHAFT_W = squareSize * 0.18;
  const HEAD_W = squareSize * 0.42;
  const HEAD_LEN = squareSize * 0.36;

  return (
    <svg
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      width={boardPx}
      height={boardPx}
      viewBox={`0 0 ${boardPx} ${boardPx}`}
    >
      <defs>
        {arrows.map((a, i) => {
          const id = `arrowhead-${i}`;
          return (
            <marker
              key={id}
              id={id}
              markerWidth={HEAD_W / SHAFT_W}
              markerHeight={HEAD_W / SHAFT_W}
              refX={(HEAD_W / SHAFT_W) * 0.5}
              refY={(HEAD_W / SHAFT_W) * 0.5}
              orient="auto"
            >
              <polygon
                points={`0,0 ${HEAD_W / SHAFT_W},${(HEAD_W / SHAFT_W) * 0.5} 0,${HEAD_W / SHAFT_W}`}
                fill={a.color}
              />
            </marker>
          );
        })}
      </defs>

      {arrows.map((a, i) => {
        const { cx: x1, cy: y1 } = squareToXY(a.from, squareSize);
        const { cx: x2, cy: y2 } = squareToXY(a.to, squareSize);

        // Shorten endpoint so the arrowhead doesn't overshoot the center
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / len;
        const uy = dy / len;
        const ex = x2 - ux * (HEAD_LEN * 0.55);
        const ey = y2 - uy * (HEAD_LEN * 0.55);

        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={ex}
            y2={ey}
            stroke={a.color}
            strokeWidth={SHAFT_W}
            strokeLinecap="round"
            markerEnd={`url(#arrowhead-${i})`}
            opacity={0.82}
          />
        );
      })}
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function AnimatedChessBoard({
  pgn,
  compact = false,
  label,
  arrows,
  responses,
  onResponsePress,
  startAtEnd = false,
}: AnimatedChessBoardProps) {
  const { colors, elevation } = useTheme();
  const gameRef = useRef(new Chess());
  const game = gameRef.current;

  const [moves, setMoves] = useState<string[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [board, setBoard] = useState<(string | null)[][]>([]);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);

  const isAtEnd = currentMoveIndex >= moves.length - 1;

  const squareSize = compact ? 34 : 42;
  const pieceSize  = compact ? 28 : 36;

  // ── Parse PGN and optionally jump to end on mount ────────────────────────
  useEffect(() => {
    const tempGame = new Chess();
    const cleanPgn = pgn.replace(/\d+\.\s*/g, '').replace(/\s+/g, ' ').trim();
    const moveArray: string[] = [];
    for (const token of cleanPgn.split(' ').filter(Boolean)) {
      if (token.startsWith('(') || token.startsWith('{')) break;
      try {
        if (tempGame.move(token)) moveArray.push(token);
      } catch { break; }
    }

    game.reset();
    setMoves(moveArray);

    if (startAtEnd && moveArray.length > 0) {
      let last: { from: string; to: string } | null = null;
      for (const m of moveArray) {
        const mo = game.move(m);
        if (mo) last = { from: mo.from, to: mo.to };
      }
      setCurrentMoveIndex(moveArray.length - 1);
      setLastMove(last);
    } else {
      setCurrentMoveIndex(-1);
      setLastMove(null);
    }

    updateBoard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pgn, startAtEnd]);

  const updateBoard = () => {
    const boardState = game.board();
    const newBoard: (string | null)[][] = boardState.map((row) =>
      row.map((piece) => (piece ? `${piece.color}${piece.type.toUpperCase()}` : null))
    );
    setBoard(newBoard);
  };

  // ── Response squares: map from-square → {id, to} for each legal response ──
  const responseData = useMemo<Map<string, { id: string; to: string }>>(() => {
    const map = new Map<string, { id: string; to: string }>();
    if (!responses || responses.length === 0 || !isAtEnd) return map;
    const tempGame = new Chess(game.fen());
    for (const resp of responses) {
      try {
        const m = tempGame.move(resp.move);
        if (m) {
          map.set(m.from, { id: resp.id, to: m.to });
          tempGame.undo();
        }
      } catch { /* illegal move — skip */ }
    }
    return map;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAtEnd, responses, currentMoveIndex]);

  // ── Build arrow list: static arrows prop + response move arrows ───────────
  const allArrows = useMemo<ArrowSpec[]>(() => {
    const list: ArrowSpec[] = [];
    // Prop-supplied arrows (for example lines)
    if (arrows) {
      for (const a of arrows) {
        list.push({ from: a.from, to: a.to, color: a.color ?? colors.arrowAnnotation });
      }
    }
    // Response arrows (shown when at end of moves)
    if (isAtEnd) {
      for (const [from, { to }] of responseData) {
        list.push({ from, to, color: colors.arrowMove });
      }
    }
    return list;
  }, [arrows, responseData, isAtEnd, colors.arrowAnnotation, colors.arrowMove]);

  // ── Navigation handlers ───────────────────────────────────────────────────
  const handleNext = () => {
    if (currentMoveIndex < moves.length - 1) {
      const mo = game.move(moves[currentMoveIndex + 1]);
      if (mo) setLastMove({ from: mo.from, to: mo.to });
      updateBoard();
      setCurrentMoveIndex((i) => i + 1);
    }
  };

  const handlePrevious = () => {
    if (currentMoveIndex >= 0) {
      game.undo();
      updateBoard();
      const newIdx = currentMoveIndex - 1;
      setCurrentMoveIndex(newIdx);
      if (newIdx >= 0) {
        const tmp = new Chess();
        for (let k = 0; k <= newIdx; k++) {
          const mo = tmp.move(moves[k]);
          if (mo && k === newIdx) setLastMove({ from: mo.from, to: mo.to });
        }
      } else {
        setLastMove(null);
      }
    }
  };

  const handleReset = () => {
    game.reset();
    updateBoard();
    setCurrentMoveIndex(-1);
    setLastMove(null);
  };

  const handleJumpToEnd = () => {
    game.reset();
    let last: { from: string; to: string } | null = null;
    for (const m of moves) {
      const mo = game.move(m);
      if (mo) last = { from: mo.from, to: mo.to };
    }
    updateBoard();
    setCurrentMoveIndex(moves.length - 1);
    setLastMove(last);
  };

  // ── Square renderer ───────────────────────────────────────────────────────
  const renderSquare = (row: number, col: number) => {
    const isLight    = (row + col) % 2 === 0;
    const piece      = board[row]?.[col];
    const squareName = `${String.fromCharCode(97 + col)}${8 - row}`;
    const isFrom     = lastMove?.from === squareName;
    const isTo       = lastMove?.to   === squareName;
    const respEntry  = responseData.get(squareName);
    const isResponse = !!respEntry && !!onResponsePress;

    let pieceType = '';
    let isWhite   = true;
    if (piece) {
      isWhite   = piece[0] === 'w';
      pieceType = piece[1];
    }

    const bgColor = (isFrom || isTo)
      ? (isLight ? colors.squareHighlightLight : colors.squareHighlightDark)
      : (isLight ? colors.lightSquare : colors.darkSquare);

    const squareStyle: CSSProperties = {
      width:           squareSize,
      height:          squareSize,
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      position:        'relative',
      backgroundColor: bgColor,
      cursor:          isResponse ? 'pointer' : 'default',
      userSelect:      'none',
    };

    return (
      <div
        key={`${row}-${col}`}
        style={squareStyle}
        onClick={isResponse ? () => onResponsePress!(respEntry!.id) : undefined}
      >
        {/* Green response highlight */}
        {isResponse && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: `${colors.green}55`, pointerEvents: 'none' }} />
        )}

        {piece && renderPiece(pieceType, isWhite, pieceSize)}

        {/* Rank labels */}
        {!compact && col === 0 && (
          <span style={{ position: 'absolute', top: 2, left: 3, fontSize: 9, fontWeight: 'bold', pointerEvents: 'none', color: isLight ? colors.darkSquare : colors.lightSquare }}>
            {8 - row}
          </span>
        )}
        {/* File labels */}
        {!compact && row === 7 && (
          <span style={{ position: 'absolute', bottom: 2, right: 3, fontSize: 9, fontWeight: 'bold', pointerEvents: 'none', color: isLight ? colors.darkSquare : colors.lightSquare }}>
            {String.fromCharCode(97 + col)}
          </span>
        )}
      </div>
    );
  };

  // ── Styles ────────────────────────────────────────────────────────────────
  const btnStyle = (disabled: boolean): CSSProperties => ({
    padding:         '8px 14px',
    borderRadius:    12,
    border:          `1px solid ${disabled ? colors.border : `${colors.accent}45`}`,
    backgroundColor: disabled ? colors.buttonDisabledBg : colors.accentBg,
    color:           disabled ? colors.textMuted : colors.accent,
    fontSize:        13,
    fontWeight:      '600',
    cursor:          disabled ? 'default' : 'pointer',
    opacity:         disabled ? 0.5 : 1,
    minWidth:        62,
    transition:      'opacity 0.1s ease',
  });

  const containerStyle: CSSProperties = {
    display:         'flex',
    flexDirection:   'column',
    alignItems:      'center',
    padding:         16,
    borderRadius:    12,
    border:          `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.cardGlass,
    ...elevation.md,
  };

  const moveCounterStyle: CSSProperties = {
    marginTop:       12,
    marginBottom:    6,
    padding:         '6px 12px',
    borderRadius:    6,
    border:          `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.moveCounterBg,
    minWidth:        200,
    textAlign:       'center',
    fontSize:        14,
    fontWeight:      '600',
    fontFamily:      'monospace',
    color:           colors.text,
  };

  const controlsStyle: CSSProperties = {
    display:         'flex',
    flexDirection:   'row',
    gap:             8,
    marginTop:       10,
    padding:         8,
    borderRadius:    14,
    border:          `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.cardGlassStrong,
  };

  const atEnd   = currentMoveIndex >= moves.length - 1;
  const atStart = currentMoveIndex < 0;
  const boardPx = squareSize * 8;

  return (
    <div style={containerStyle}>
      {label && (
        <span style={{ fontSize: 15, fontWeight: '600', color: colors.textSecondary, marginBottom: 10 }}>
          {label}
        </span>
      )}

      {/* Board grid + SVG arrow overlay */}
      <div style={{ border: `2px solid ${colors.boardBorder}`, borderRadius: 4, position: 'relative', width: boardPx, height: boardPx }}>
        <div>
          {[...Array(8)].map((_, row) => (
            <div key={row} style={{ display: 'flex' }}>
              {[...Array(8)].map((_, col) => renderSquare(row, col))}
            </div>
          ))}
        </div>

        {/* Arrow overlay — rendered above squares but below pieces (pointer-events: none) */}
        <BoardArrowsOverlay arrows={allArrows} squareSize={squareSize} />
      </div>

      <div style={moveCounterStyle}>
        Move {currentMoveIndex + 1} of {moves.length}
        {currentMoveIndex >= 0 && ` (${moves[currentMoveIndex]})`}
      </div>

      {!compact && isAtEnd && responseData.size > 0 && (
        <span style={{ fontSize: 12, fontStyle: 'italic', color: colors.green, marginTop: 2, marginBottom: 4 }}>
          Click a highlighted square to explore that response
        </span>
      )}

      <div style={controlsStyle}>
        {!compact && (
          <button style={btnStyle(atStart)} onClick={handleReset} disabled={atStart}>Reset</button>
        )}
        <button style={btnStyle(atStart)} onClick={handlePrevious} disabled={atStart}>‹ Prev</button>
        <button style={btnStyle(atEnd)}   onClick={handleNext}     disabled={atEnd}>Next ›</button>
        {!compact && (
          <button style={btnStyle(atEnd)} onClick={handleJumpToEnd} disabled={atEnd}>End</button>
        )}
      </div>
    </div>
  );
}

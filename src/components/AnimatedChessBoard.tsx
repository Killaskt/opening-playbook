import { useState, useEffect, useMemo } from 'react';
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
}

export function AnimatedChessBoard({ pgn, compact = false, label, responses, onResponsePress }: AnimatedChessBoardProps) {
  const { colors, elevation } = useTheme();
  const [game] = useState(() => new Chess());
  const [moves, setMoves] = useState<string[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [board, setBoard] = useState<(string | null)[][]>([]);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);

  const isAtEnd = currentMoveIndex >= moves.length - 1;

  const responseSquares = useMemo<Map<string, string>>(() => {
    const map = new Map<string, string>();
    if (!responses || responses.length === 0 || !isAtEnd) return map;
    const tempGame = new Chess(game.fen());
    for (const resp of responses) {
      try {
        const m = tempGame.move(resp.move);
        if (m) {
          map.set(m.from, resp.id);
          tempGame.undo();
        }
      } catch {}
    }
    return map;
  }, [isAtEnd, responses, currentMoveIndex]);

  const squareSize = compact ? 34 : 42;
  const pieceSize = compact ? 28 : 36;

  useEffect(() => {
    const tempGame = new Chess();
    const cleanPgn = pgn
      .replace(/\d+\.\s*/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const moveArray: string[] = [];
    const tokens = cleanPgn.split(' ').filter(token => token.length > 0);

    for (const token of tokens) {
      if (token.startsWith('(') || token.startsWith('{')) break;
      try {
        const move = tempGame.move(token);
        if (move) moveArray.push(token);
      } catch (e) {
        break;
      }
    }

    setMoves(moveArray);
    setCurrentMoveIndex(-1);
    setLastMove(null);
    game.reset();
    updateBoard();
  }, [pgn]);

  const updateBoard = () => {
    const newBoard: (string | null)[][] = [];
    const boardState = game.board();

    for (let i = 0; i < 8; i++) {
      newBoard[i] = [];
      for (let j = 0; j < 8; j++) {
        const piece = boardState[i][j];
        newBoard[i][j] = piece ? `${piece.color}${piece.type.toUpperCase()}` : null;
      }
    }
    setBoard(newBoard);
  };

  const handleNext = () => {
    if (currentMoveIndex < moves.length - 1) {
      const nextMove = moves[currentMoveIndex + 1];
      const moveObj = game.move(nextMove);

      if (moveObj) {
        setLastMove({ from: moveObj.from, to: moveObj.to });
      }

      updateBoard();
      setCurrentMoveIndex(currentMoveIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentMoveIndex >= 0) {
      game.undo();
      updateBoard();
      const newIndex = currentMoveIndex - 1;
      setCurrentMoveIndex(newIndex);

      if (newIndex >= 0) {
        const tempGame = new Chess();
        for (let i = 0; i <= newIndex; i++) {
          const m = tempGame.move(moves[i]);
          if (m && i === newIndex) {
            setLastMove({ from: m.from, to: m.to });
          }
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
    moves.forEach(move => {
      const m = game.move(move);
      if (m) last = { from: m.from, to: m.to };
    });
    updateBoard();
    setCurrentMoveIndex(moves.length - 1);
    setLastMove(last);
  };


  const renderSquare = (row: number, col: number) => {
    const isLight = (row + col) % 2 === 0;
    const piece = board[row]?.[col];
    const squareName = `${String.fromCharCode(97 + col)}${8 - row}`;
    const isFrom = lastMove?.from === squareName;
    const isTo = lastMove?.to === squareName;
    const responseId = responseSquares.get(squareName);
    const isResponseSquare = !!responseId && !!onResponsePress;

    let pieceType = '';
    let isWhite = true;
    if (piece) {
      const color = piece[0];
      pieceType = piece[1];
      isWhite = color === 'w';
    }

    const bgColor = (isFrom || isTo)
      ? (isLight ? colors.squareHighlightLight : colors.squareHighlightDark)
      : (isLight ? colors.lightSquare : colors.darkSquare);

    const squareStyle: CSSProperties = {
      width: squareSize,
      height: squareSize,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      backgroundColor: bgColor,
      cursor: isResponseSquare ? 'pointer' : 'default',
      userSelect: 'none',
    };

    return (
      <div
        key={`${row}-${col}`}
        style={squareStyle}
        onClick={isResponseSquare ? () => onResponsePress!(responseId!) : undefined}
      >
        {isResponseSquare && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: colors.green + '55', pointerEvents: 'none' }} />
        )}
        {piece && renderPiece(pieceType, isWhite, pieceSize)}
        {!compact && col === 0 && (
          <span style={{ position: 'absolute', top: 2, left: 3, fontSize: 9, fontWeight: 'bold', pointerEvents: 'none', color: isLight ? colors.darkSquare : colors.lightSquare }}>
            {8 - row}
          </span>
        )}
        {!compact && row === 7 && (
          <span style={{ position: 'absolute', bottom: 2, right: 3, fontSize: 9, fontWeight: 'bold', pointerEvents: 'none', color: isLight ? colors.darkSquare : colors.lightSquare }}>
            {String.fromCharCode(97 + col)}
          </span>
        )}
      </div>
    );
  };

  const btnStyle = (disabled: boolean): CSSProperties => ({
    padding: '8px 14px',
    borderRadius: 12,
    border: `1px solid ${disabled ? colors.border : colors.accent + '45'}`,
    backgroundColor: disabled ? colors.buttonDisabledBg : colors.accentBg,
    color: disabled ? colors.textMuted : colors.accent,
    fontSize: 13,
    fontWeight: '600',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    minWidth: 62,
    transition: 'opacity 0.1s ease',
  });

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.cardGlass,
    ...elevation.md,
  };

  const moveCounterStyle: CSSProperties = {
    marginTop: 12,
    marginBottom: 6,
    padding: '6px 12px',
    borderRadius: 6,
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.moveCounterBg,
    minWidth: 200,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'monospace',
    color: colors.text,
  };

  const controlsStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    padding: 8,
    borderRadius: 14,
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.cardGlassStrong,
  };

  const atEnd = currentMoveIndex >= moves.length - 1;
  const atStart = currentMoveIndex < 0;

  return (
    <div style={containerStyle}>
      {label && (
        <span style={{ fontSize: 15, fontWeight: '600', color: colors.textSecondary, marginBottom: 10 }}>
          {label}
        </span>
      )}

      <div style={{ border: `2px solid ${colors.boardBorder}`, borderRadius: 4, position: 'relative' }}>
        {[...Array(8)].map((_, row) => (
          <div key={row} style={{ display: 'flex' }}>
            {[...Array(8)].map((_, col) => renderSquare(row, col))}
          </div>
        ))}
      </div>

      <div style={moveCounterStyle}>
        Move {currentMoveIndex + 1} of {moves.length}
        {currentMoveIndex >= 0 && ` (${moves[currentMoveIndex]})`}
      </div>

      {!compact && isAtEnd && responseSquares.size > 0 && (
        <span style={{ fontSize: 12, fontStyle: 'italic', color: colors.green, marginTop: 2, marginBottom: 4 }}>
          Click a highlighted square to continue
        </span>
      )}

      <div style={controlsStyle}>
        {!compact && (
          <button style={btnStyle(atStart)} onClick={handleReset} disabled={atStart}>Reset</button>
        )}
        <button style={btnStyle(atStart)} onClick={handlePrevious} disabled={atStart}>‹ Prev</button>
        <button style={btnStyle(atEnd)} onClick={handleNext} disabled={atEnd}>Next ›</button>
        {!compact && (
          <button style={btnStyle(atEnd)} onClick={handleJumpToEnd} disabled={atEnd}>End</button>
        )}
      </div>
    </div>
  );
}

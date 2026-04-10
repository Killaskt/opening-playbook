import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Chess } from 'chess.js';
import { renderPiece } from './ChessPieces';
import { BoardArrow } from '../types';
import { useTheme } from '../theme/ThemeContext';
import { elevation } from '../theme/elevation';

interface AnimatedChessBoardProps {
  pgn: string;
  compact?: boolean;
  label?: string;
  arrows?: BoardArrow[];
  responses?: { id: string; move: string; name: string }[];
  onResponsePress?: (id: string) => void;
}

export function AnimatedChessBoard({ pgn, compact = false, label, arrows, responses, onResponsePress }: AnimatedChessBoardProps) {
  const { colors, typography } = useTheme();
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
  const boardSize = squareSize * 8;
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

  const squareToPixel = (sq: string): { x: number; y: number } => {
    const col = sq.charCodeAt(0) - 97;
    const row = 8 - parseInt(sq[1], 10);
    return {
      x: col * squareSize + squareSize / 2,
      y: row * squareSize + squareSize / 2,
    };
  };

  const renderArrowSvg = (_arrowList: { from: string; to: string; color?: string }[]) => {
    return null;
  };

  const allArrows: { from: string; to: string; color?: string }[] = [];
  if (arrows && currentMoveIndex === moves.length - 1) allArrows.push(...arrows);
  if (lastMove) {
    allArrows.push({ from: lastMove.from, to: lastMove.to, color: colors.arrowMove });
  }

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

    const baseStyle = {
      width: squareSize,
      height: squareSize,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      position: 'relative' as const,
      backgroundColor: bgColor,
    };

    const innerContent = (
      <>
        {isResponseSquare && (
          <View
            style={[StyleSheet.absoluteFill, { backgroundColor: colors.green + '55' }]}
            pointerEvents="none"
          />
        )}
        {piece && renderPiece(pieceType, isWhite, pieceSize)}
        {!compact && col === 0 && (
          <Text style={[styles.coordinateRank, { color: isLight ? colors.darkSquare : colors.lightSquare }]}>
            {8 - row}
          </Text>
        )}
        {!compact && row === 7 && (
          <Text style={[styles.coordinateFile, { color: isLight ? colors.darkSquare : colors.lightSquare }]}>
            {String.fromCharCode(97 + col)}
          </Text>
        )}
      </>
    );

    if (isResponseSquare) {
      return (
        <Pressable
          key={`${row}-${col}`}
          style={({ pressed }) => [baseStyle, pressed && { opacity: 0.65 }]}
          onPress={() => onResponsePress!(responseId!)}
        >
          {innerContent}
        </Pressable>
      );
    }

    return (
      <View key={`${row}-${col}`} style={baseStyle}>
        {innerContent}
      </View>
    );
  };

  return (
    <View style={[styles.container, elevation.md, { backgroundColor: colors.cardGlass, borderColor: colors.glassBorder }]}>
      {label && (
        <Text style={[styles.label, typography.bodyLG, { color: colors.textSecondary }]}>{label}</Text>
      )}

      <View style={[styles.boardContainer, { borderColor: colors.boardBorder }]}>
        <View style={{ position: 'relative' }}>
          {[...Array(8)].map((_, row) => (
            <View key={row} style={styles.row}>
              {[...Array(8)].map((_, col) => renderSquare(row, col))}
            </View>
          ))}
          {renderArrowSvg(allArrows)}
        </View>
      </View>

      <View style={[styles.moveCounter, { backgroundColor: colors.moveCounterBg, borderColor: colors.glassBorder }]}>
        <Text style={[styles.moveText, typography.mono, { color: colors.text }]}>
          Move {currentMoveIndex + 1} of {moves.length}
          {currentMoveIndex >= 0 && ` (${moves[currentMoveIndex]})`}
        </Text>
      </View>

      {!compact && isAtEnd && responseSquares.size > 0 && (
        <Text style={[styles.responseHint, { color: colors.green }]}>
          Tap a highlighted piece to continue
        </Text>
      )}

      <View style={[styles.controls, { backgroundColor: colors.cardGlassStrong, borderColor: colors.glassBorder }]}>
        {!compact && (
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: colors.accentBg, borderColor: colors.accent + '45' },
              pressed && styles.buttonPressed,
              currentMoveIndex < 0 && { backgroundColor: colors.buttonDisabledBg, borderColor: colors.border, opacity: 0.5 },
            ]}
            onPress={handleReset}
            disabled={currentMoveIndex < 0}
          >
            <Text style={[styles.buttonText, { color: colors.accent }]}>Reset</Text>
          </Pressable>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.accentBg, borderColor: colors.accent + '45' },
            pressed && styles.buttonPressed,
            currentMoveIndex < 0 && { backgroundColor: colors.buttonDisabledBg, borderColor: colors.border, opacity: 0.5 },
          ]}
          onPress={handlePrevious}
          disabled={currentMoveIndex < 0}
        >
          <Text style={[styles.buttonText, { color: colors.accent }]}>{'\u2039 Prev'}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.accentBg, borderColor: colors.accent + '45' },
            pressed && styles.buttonPressed,
            currentMoveIndex >= moves.length - 1 && { backgroundColor: colors.buttonDisabledBg, borderColor: colors.border, opacity: 0.5 },
          ]}
          onPress={handleNext}
          disabled={currentMoveIndex >= moves.length - 1}
        >
          <Text style={[styles.buttonText, { color: colors.accent }]}>{'Next \u203a'}</Text>
        </Pressable>

        {!compact && (
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: colors.accentBg, borderColor: colors.accent + '45' },
              pressed && styles.buttonPressed,
              currentMoveIndex >= moves.length - 1 && { backgroundColor: colors.buttonDisabledBg, borderColor: colors.border, opacity: 0.5 },
            ]}
            onPress={handleJumpToEnd}
            disabled={currentMoveIndex >= moves.length - 1}
          >
            <Text style={[styles.buttonText, { color: colors.accent }]}>End</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  label: {
    fontWeight: '600',
    marginBottom: 10,
  },
  boardContainer: {
    borderWidth: 2,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
  },
  coordinateRank: {
    position: 'absolute',
    top: 2,
    left: 3,
    fontSize: 9,
    fontWeight: 'bold',
  },
  coordinateFile: {
    position: 'absolute',
    bottom: 2,
    right: 3,
    fontSize: 9,
    fontWeight: 'bold',
  },
  moveCounter: {
    marginTop: 16,
    marginBottom: 8,
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    minWidth: 200,
    alignItems: 'center',
  },
  moveText: {
    fontSize: 14,
    fontWeight: '600',
  },
  responseHint: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 2,
    marginBottom: 4,
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    padding: 8,
    borderRadius: 14,
    borderWidth: 1,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 78,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

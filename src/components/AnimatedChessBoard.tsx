import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Chess } from 'chess.js';
import Svg, { Line, Polygon } from 'react-native-svg';
import { renderPiece } from './ChessPieces';
import { BoardArrow } from '../types';

interface AnimatedChessBoardProps {
  pgn: string;
  compact?: boolean;
  label?: string;
  arrows?: BoardArrow[];
}

export function AnimatedChessBoard({ pgn, compact = false, label, arrows }: AnimatedChessBoardProps) {
  const [game] = useState(() => new Chess());
  const [moves, setMoves] = useState<string[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [board, setBoard] = useState<(string | null)[][]>([]);
  const [highlightedSquares, setHighlightedSquares] = useState<string[]>([]);

  const squareSize = compact ? 34 : 42;
  const boardSize = squareSize * 8;
  const pieceSize = compact ? 28 : 36;

  // Parse PGN and extract moves
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
        setHighlightedSquares([moveObj.from, moveObj.to]);
        setTimeout(() => setHighlightedSquares([]), 800);
      }

      updateBoard();
      setCurrentMoveIndex(currentMoveIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentMoveIndex >= 0) {
      const undoneMove = game.undo();
      if (undoneMove) {
        setHighlightedSquares([undoneMove.from, undoneMove.to]);
        setTimeout(() => setHighlightedSquares([]), 800);
      }
      updateBoard();
      setCurrentMoveIndex(currentMoveIndex - 1);
    }
  };

  const handleReset = () => {
    game.reset();
    updateBoard();
    setCurrentMoveIndex(-1);
    setHighlightedSquares([]);
  };

  const handleJumpToEnd = () => {
    game.reset();
    moves.forEach(move => game.move(move));
    updateBoard();
    setCurrentMoveIndex(moves.length - 1);
    setHighlightedSquares([]);
  };

  // Convert algebraic notation (e.g. "e4") to pixel coordinates (center of square)
  const squareToPixel = (sq: string): { x: number; y: number } => {
    const col = sq.charCodeAt(0) - 97; // a=0, b=1, ...
    const row = 8 - parseInt(sq[1], 10);  // 1=7, 2=6, ...
    return {
      x: col * squareSize + squareSize / 2,
      y: row * squareSize + squareSize / 2,
    };
  };

  const renderArrows = () => {
    if (!arrows || arrows.length === 0) return null;

    return (
      <Svg
        width={boardSize}
        height={boardSize}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      >
        {arrows.map((arr, i) => {
          const from = squareToPixel(arr.from);
          const to = squareToPixel(arr.to);
          const color = arr.color || 'rgba(0, 150, 50, 0.6)';

          // Calculate arrow direction
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len === 0) return null;

          const ux = dx / len;
          const uy = dy / len;

          // Shorten the line so the arrowhead sits at the target
          const headSize = squareSize * 0.3;
          const endX = to.x - ux * headSize * 0.5;
          const endY = to.y - uy * headSize * 0.5;
          const startX = from.x + ux * squareSize * 0.15;
          const startY = from.y + uy * squareSize * 0.15;

          // Arrowhead triangle
          const tipX = to.x - ux * 2;
          const tipY = to.y - uy * 2;
          const leftX = endX - uy * headSize * 0.4;
          const leftY = endY + ux * headSize * 0.4;
          const rightX = endX + uy * headSize * 0.4;
          const rightY = endY - ux * headSize * 0.4;

          return (
            <React.Fragment key={i}>
              <Line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={color}
                strokeWidth={squareSize * 0.15}
                strokeLinecap="round"
              />
              <Polygon
                points={`${tipX},${tipY} ${leftX},${leftY} ${rightX},${rightY}`}
                fill={color}
              />
            </React.Fragment>
          );
        })}
      </Svg>
    );
  };

  const renderSquare = (row: number, col: number) => {
    const isLight = (row + col) % 2 === 0;
    const piece = board[row]?.[col];
    const squareName = `${String.fromCharCode(97 + col)}${8 - row}`;
    const isHighlighted = highlightedSquares.includes(squareName);

    let pieceType = '';
    let isWhite = true;
    if (piece) {
      const color = piece[0];
      pieceType = piece[1];
      isWhite = color === 'w';
    }

    return (
      <View
        key={`${row}-${col}`}
        style={[
          { width: squareSize, height: squareSize, justifyContent: 'center', alignItems: 'center', position: 'relative' as const },
          isLight ? styles.lightSquare : styles.darkSquare,
          isHighlighted && styles.highlightedSquare,
        ]}
      >
        {piece && renderPiece(pieceType, isWhite, pieceSize)}
        {!compact && col === 0 && (
          <Text style={[styles.coordinateRank, isLight ? styles.darkText : styles.lightText]}>
            {8 - row}
          </Text>
        )}
        {!compact && row === 7 && (
          <Text style={[styles.coordinateFile, isLight ? styles.darkText : styles.lightText]}>
            {String.fromCharCode(97 + col)}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}

      <View style={styles.boardContainer}>
        <View style={{ position: 'relative' }}>
          {[...Array(8)].map((_, row) => (
            <View key={row} style={styles.row}>
              {[...Array(8)].map((_, col) => renderSquare(row, col))}
            </View>
          ))}
          {renderArrows()}
        </View>
      </View>

      {/* Move counter */}
      <View style={styles.moveCounter}>
        <Text style={styles.moveText}>
          Move {currentMoveIndex + 1} of {moves.length}
          {currentMoveIndex >= 0 && ` (${moves[currentMoveIndex]})`}
        </Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {!compact && (
          <Pressable
            style={[styles.button, currentMoveIndex < 0 && styles.buttonDisabled]}
            onPress={handleReset}
            disabled={currentMoveIndex < 0}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
        )}

        <Pressable
          style={[styles.button, currentMoveIndex < 0 && styles.buttonDisabled]}
          onPress={handlePrevious}
          disabled={currentMoveIndex < 0}
        >
          <Text style={styles.buttonText}>Prev</Text>
        </Pressable>

        <Pressable
          style={[styles.button, currentMoveIndex >= moves.length - 1 && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={currentMoveIndex >= moves.length - 1}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>

        {!compact && (
          <Pressable
            style={[styles.button, currentMoveIndex >= moves.length - 1 && styles.buttonDisabled]}
            onPress={handleJumpToEnd}
            disabled={currentMoveIndex >= moves.length - 1}
          >
            <Text style={styles.buttonText}>End</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  boardContainer: {
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
  },
  lightSquare: {
    backgroundColor: '#f0d9b5',
  },
  darkSquare: {
    backgroundColor: '#b58863',
  },
  highlightedSquare: {
    backgroundColor: '#9fff9f',
    borderWidth: 2,
    borderColor: '#00aa00',
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
  darkText: {
    color: '#b58863',
  },
  lightText: {
    color: '#f0d9b5',
  },
  moveCounter: {
    marginTop: 16,
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f4f4f4',
    borderRadius: 6,
    minWidth: 200,
    alignItems: 'center',
  },
  moveText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'monospace',
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#2e78b7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    minWidth: 70,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});

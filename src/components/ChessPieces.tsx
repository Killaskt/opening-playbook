import React from 'react';
import { Text } from 'react-native';

const PIECE_SYMBOLS: Record<string, string> = {
  K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙',
  k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟',
};

export function renderPiece(pieceType: string, isWhite: boolean, size: number) {
  const key = isWhite ? pieceType.toUpperCase() : pieceType.toLowerCase();
  return <Text style={{ fontSize: size * 0.7, lineHeight: size }}>{PIECE_SYMBOLS[key] ?? pieceType}</Text>;
}

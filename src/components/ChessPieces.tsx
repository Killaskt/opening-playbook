import type { CSSProperties } from 'react';

const WHITE_SYMBOLS: Record<string, string> = {
  K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙',
};

const BLACK_SYMBOLS: Record<string, string> = {
  K: '♚', Q: '♛', R: '♜', B: '♝', N: '♞', P: '♟',
};

export function renderPiece(pieceType: string, isWhite: boolean, size: number) {
  const symbol = isWhite
    ? WHITE_SYMBOLS[pieceType.toUpperCase()]
    : BLACK_SYMBOLS[pieceType.toUpperCase()];

  const style: CSSProperties = {
    fontSize: Math.round(size * 0.84),
    lineHeight: `${size}px`,
    display: 'inline-block',
    userSelect: 'none',
    // White pieces: filled white with dark outline so they pop off both light and dark squares
    // Black pieces: deep charcoal with subtle light stroke for definition
    color: isWhite ? '#ffffff' : '#1c1008',
    WebkitTextStroke: isWhite ? '1px rgba(40,20,0,0.75)' : '0.5px rgba(255,220,150,0.25)',
    filter: isWhite
      ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.55))'
      : 'drop-shadow(0 1px 3px rgba(0,0,0,0.45))',
  };

  return (
    <span style={style} aria-hidden="true">
      {symbol ?? pieceType}
    </span>
  );
}

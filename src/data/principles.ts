export interface Principle {
  id: string;
  name: string;
  icon: string;
  summary: string;
}

export const PRINCIPLES: Record<string, Principle> = {
  center: {
    id: 'center',
    name: 'Center Control',
    icon: '+',
    summary: 'Whoever controls the center controls the game.',
  },
  development: {
    id: 'development',
    name: 'Piece Development',
    icon: '>',
    summary: 'Get your pieces off the back rank and into the fight.',
  },
  kingSafety: {
    id: 'kingSafety',
    name: 'King Safety',
    icon: '#',
    summary: 'Castle early, protect your king before attacking.',
  },
  pawnStructure: {
    id: 'pawnStructure',
    name: 'Pawn Structure',
    icon: '=',
    summary: 'Pawns are the soul of chess — their shape determines the game.',
  },
  spaceTempo: {
    id: 'spaceTempo',
    name: 'Space & Tempo',
    icon: '^',
    summary: 'More space = more options; each move should count.',
  },
  planning: {
    id: 'planning',
    name: 'Planning Ahead',
    icon: '*',
    summary: 'Every move should have a purpose that fits a bigger plan.',
  },
};

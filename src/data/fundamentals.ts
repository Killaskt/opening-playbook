export interface FundamentalSection {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  keyPoints: string[];
  mistakes?: string[];
  example?: {
    pgn: string;
    label: string;
  };
}

export const openingTypeGuideSection: FundamentalSection = {
  id: 'opening-type-guide',
  title: 'Opening Type Guide',
  subtitle: 'Opening vs Defense vs System vs Gambit',
  content:
    'Quick definitions so you can instantly tell what kind of line you are looking at.',
  keyPoints: [
    'Opening: A broad main-line setup where both sides develop naturally and fight for the center. Best for classical positions and transferable fundamentals.',
    "Defense: Black's chosen answer to White's first move (for example, the Sicilian Defense vs 1.e4). Best for building a reliable Black repertoire.",
    'System: A setup-first approach where your piece pattern stays similar against many replies. Best for easier memorization and consistency.',
    'Gambit: An intentional pawn sacrifice for faster development, initiative, or attacking chances. Best for dynamic play and tactical risk.',
  ],
};

export const fundamentals: FundamentalSection[] = [
  {
    id: 'why-openings-matter',
    title: 'Why Openings Matter',
    subtitle: 'Setting the foundation',
    content:
      "The opening isn't about memorizing moves — it's about understanding ideas. A good opening gives you a playable middlegame; a bad one can leave you struggling for the rest of the game. The goal is always the same: get your pieces active, control key squares, and keep your king safe. Knowing why moves are played matters far more than knowing which moves to play.",
    keyPoints: [
      'The opening sets the tone for the entire game',
      'Understanding beats memorization every time',
      'A bad opening can mean fighting uphill for 40+ moves',
      'Good opening play = smooth transition to the middlegame',
    ],
  },
  {
    id: 'center-control',
    title: 'Control the Center',
    subtitle: 'The most important principle',
    content:
      "The four central squares — d4, d5, e4, e5 — are the most valuable real estate on the board. Pieces placed in or near the center control more squares, can reach both sides of the board quickly, and have maximum flexibility. That's why nearly every opening begins with a pawn move toward the center. You can control the center directly (pawns on e4/d4) or indirectly (pieces aimed at the center from the flanks, like a fianchettoed bishop).",
    keyPoints: [
      'Central pawns (e4, d4) are the most direct way to claim the center',
      'A knight on e4 or d5 controls 8 squares — on the rim, only 4',
      'Hypermodern openings control the center with pieces, not pawns',
      'Losing the center often means losing the game',
    ],
    mistakes: [
      'Pushing too many pawns early — they can become targets',
      'Ignoring the center to play on the wings',
      'Trading your central pawns without a good reason',
    ],
    example: {
      pgn: 'e4 e5 Nf3 Nc6 Bc4',
      label: 'Both sides fight for the center from move one',
    },
  },
  {
    id: 'development',
    title: 'Develop Your Pieces',
    subtitle: 'Get into the fight',
    content:
      "Every move in the opening should help get your pieces off the back rank and into active positions. Knights before bishops is a common guideline — knights have obvious best squares (f3/c3 for White, f6/c6 for Black), while bishops often wait to see where they're most useful. The key is efficiency: develop with purpose, don't move the same piece twice without a reason, and don't bring the queen out early where it can be chased around.",
    keyPoints: [
      'Knights typically go to f3/c3 (White) or f6/c6 (Black) first',
      'Bishops wait to see the best diagonal, or fianchetto (g3 + Bg2)',
      "Don't move the same piece twice unless forced",
      'Each piece should be doing something useful, not just sitting',
    ],
    mistakes: [
      'Bringing the queen out early — it becomes a target',
      'Developing only one side of the board',
      'Making pawn moves when you should be developing pieces',
      'Moving a developed piece again before finishing development',
    ],
    example: {
      pgn: 'e4 e5 Nf3 Nc6 Bc4 Bc5 d3 Nf6 O-O',
      label: 'Quick, natural development by both sides',
    },
  },
  {
    id: 'king-safety',
    title: 'Castle Early',
    subtitle: 'Protect your king',
    content:
      "The king in the center is a liability. Once the position opens up, an uncastled king is a magnet for attacks. Castling does two things at once: it tucks the king into a safe corner behind pawns, and it activates the rook by moving it toward the center. Most of the time, castling kingside (short) is preferred because it's faster — you only need to move the knight and bishop. Delaying castling is sometimes part of a plan, but for beginners, castle early and castle often.",
    keyPoints: [
      'Castle within the first 10 moves as a rule of thumb',
      'Kingside castling is faster — only 2 pieces need to move',
      'Castling connects your rooks (they can protect each other)',
      "Don't open the position before you've castled",
    ],
    mistakes: [
      'Getting caught in the center when the position opens',
      'Castling into an attack — check where your opponent\'s pieces aim first',
      'Moving the pawns in front of your castled king without good reason',
    ],
    example: {
      pgn: 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O',
      label: 'White castles early in the Ruy Lopez',
    },
  },
  {
    id: 'pawn-structure',
    title: 'Pawn Structure',
    subtitle: 'The skeleton of the position',
    content:
      "Pawns can't move backward. Every pawn move permanently changes the position. That's why pawn structure is so important — it determines where your pieces belong, which squares are weak, and what plans make sense. Doubled pawns, isolated pawns, and pawn chains all have specific strengths and weaknesses. In the opening, your pawn moves should serve a purpose: controlling the center, opening lines for your pieces, or supporting your development.",
    keyPoints: [
      'Pawns can never go back — every pawn move is permanent',
      'The pawn structure tells you where to put your pieces',
      'Pawn chains have a base (weakest point) — attack it',
      'Isolated pawns can be weak but give active piece play',
    ],
    mistakes: [
      'Creating pawn weaknesses without compensation',
      'Ignoring your opponent\'s pawn structure when making plans',
      'Making too many pawn moves instead of developing',
    ],
  },
  {
    id: 'space-tempo',
    title: 'Space & Tempo',
    subtitle: 'Time is everything',
    content:
      "In chess, time is measured in moves (tempo). Wasting a move is like giving your opponent a free turn. In the opening, every move should accomplish something — developing a piece, controlling a key square, or creating a threat. Space works similarly: the more squares you control, the more room your pieces have to maneuver. When you have more space, your opponent is cramped and their pieces get in each other's way.",
    keyPoints: [
      'A tempo is one move — wasting moves gives your opponent an advantage',
      'Gambits sacrifice material (usually a pawn) to gain tempo',
      'More space = more room for your pieces, less for your opponent',
      'A space advantage is only useful if you can use it',
    ],
    mistakes: [
      'Moving the same piece multiple times for no reason',
      'Accepting a gambit pawn and then spending moves defending it',
      'Overextending — grabbing too much space can leave weaknesses',
    ],
    example: {
      pgn: 'e4 e5 Nf3 Nc6 d4 exd4 Nxd4',
      label: 'The Scotch — White gains central space and tempo',
    },
  },
  {
    id: 'planning',
    title: 'Think in Plans, Not Moves',
    subtitle: 'The big picture',
    content:
      "The biggest mistake in the opening is playing random moves without a plan. Every opening has a set of ideas — typical pawn breaks, piece placements, and long-term goals. Instead of memorizing 20 moves of theory, learn the 2-3 key ideas behind an opening. Where do the pieces want to go? What pawn break opens the position? Which side of the board will you attack on? Once you understand the plan, the moves make themselves.",
    keyPoints: [
      'Every opening has typical plans — learn the ideas, not just the moves',
      'Ask yourself: what is my opponent trying to do? How do I stop it?',
      'Pawn breaks (like ...c5 in the French) unlock positions',
      'Piece placement follows from the pawn structure',
    ],
    mistakes: [
      'Playing moves without understanding why',
      'Following memorized theory and being lost when the opponent deviates',
      "Focusing only on your own plan and ignoring your opponent's",
    ],
  },
  {
    id: 'common-traps',
    title: 'Opening Traps & Tactics',
    subtitle: 'Watch out for these',
    content:
      "The opening is full of tactical pitfalls. Scholar's Mate, the Fried Liver, Legal's Mate — these are patterns every player should recognize. But more importantly, traps work because one side violated a principle: they left the king in the center, brought the queen out early, or neglected development. If you follow the fundamentals, you'll naturally avoid most traps. When you spot your opponent breaking principles, look for a tactical punishment.",
    keyPoints: [
      "Scholar's Mate (Qh5+Bc4) only works if Black makes mistakes",
      'Most traps punish violations of basic principles',
      'If your opponent makes a weird move, look for a tactic',
      'Knowing common patterns helps you avoid them AND set them',
    ],
    example: {
      pgn: 'e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Nxd5 Nxf7',
      label: 'The Fried Liver — punishes allowing Ng5',
    },
  },
];

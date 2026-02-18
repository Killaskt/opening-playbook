import { createOpening, createVariation, response, tree, line, trap, game, arrow, principle } from '../builders';

// ============================================================================
// WHITE'S FIRST MOVE: d4
// ============================================================================

export const d4 = createOpening({
  id: 'd4',
  move: 'd4',
  name: "Queen's Pawn Opening",
  boardPgn: 'd4',
  intent: [
    'Control the center with the queen pawn',
    'More positional and strategic than e4',
    'Leads to slower, maneuvering games with less immediate tactics',
  ],
  boardArrows: [
    arrow('d4', 'c5'),
    arrow('d4', 'e5'),
    arrow('d1', 'd4', 'rgba(100, 100, 200, 0.4)'),
  ],
  principleApplications: [
    principle('center', 'The d4 pawn occupies the center and controls c5 and e5.'),
    principle('pawnStructure', 'The d4 pawn is naturally protected by the queen, making it harder to challenge than e4.'),
    principle('planning', 'Sets up a slow, strategic game where long-term plans matter more than quick tactics.'),
  ],
  whyThisMove:
    "d4 grabs central space just like e4, but with a key difference: the d4 pawn is already protected by the queen. This makes it harder to challenge immediately and leads to slower, more strategic games. If you enjoy building up a position gradually, outmaneuvering your opponent, and squeezing them over time, d4 is your move. It's the weapon of choice for many world champions who prefer deep positional play.",
  strategicThemes: [
    'The pawn on d4 is naturally protected by the queen',
    'Often leads to closed or semi-closed positions',
    'Queenside play and minority attacks are common',
    'Space advantage and slow buildup of pressure',
  ],
  threats: [
    "White often follows with c4 to build a broad pawn center (Queen's Gambit)",
    'The c4-d4 pawn duo controls a huge amount of central territory',
    'Black needs to decide early how to challenge the center',
  ],
  traps: [
    trap(
      'Englund Gambit Trap',
      "After d4 e5?! dxe5 some beginners fall for tricks, but the gambit is objectively dubious for Black.",
      'd4 e5 dxe5'
    ),
  ],
  prosAndCons: {
    pros: [
      'Solid and strategic',
      'The d4 pawn is naturally supported',
      'Rich positional middlegames',
      'Excellent winning chances at all levels',
    ],
    cons: [
      "Games can feel slow if you prefer sharp tactics",
      'Theory is deep and can feel overwhelming',
      'Some lines are very drawish at the top level',
    ],
  },
  famousPlayers: ['Anatoly Karpov', 'Vladimir Kramnik', 'Ding Liren', 'Alexander Alekhine'],
  famousGames: [
    game(
      'Karpov vs Kasparov, 1985 Game 16',
      "A masterclass in Queen's Gambit Declined strategy from Karpov."
    ),
  ],
  responses: [
    response('d4_d5', 'd5', 'Closed Games'),
    response('d4_nf6', 'Nf6', 'Indian Defenses'),
  ],
  lines: [
    line("Queen's Gambit Declined", "d4 d5 c4 e6 Nc3"),
    line("Queen's Indian", 'd4 Nf6 c4 e6 Nf3 b6'),
    line("King's Indian", 'd4 Nf6 c4 g6 Nc3 Bg7'),
  ],
  tree: [
    tree('d4', [
      tree('d5', [
        tree("c4 (Queen's Gambit)", [tree('e6'), tree('c6')]),
        tree('Nf3'),
      ]),
      tree('Nf6', [
        tree('c4', [
          tree("e6 (Queen's Indian)"),
          tree("g6 (King's Indian)"),
        ]),
      ]),
    ]),
  ],
});

// ============================================================================
// BLACK RESPONSES TO d4
// ============================================================================

export const d4_d5 = createOpening({
  id: 'd4_d5',
  move: 'd5',
  name: 'Closed Games',
  boardPgn: 'd4 d5',
  intent: [
    'Symmetrically control the center',
    "Often leads to Queen's Gambit structures",
    'Solid and classical approach',
  ],
  principleApplications: [
    principle('center', 'Mirrors White\'s central claim — both sides occupy the center equally.'),
    principle('pawnStructure', 'Leads to Queen\'s Gambit structures where pawn play defines the middlegame.'),
    principle('planning', 'Strategic patience is key — small advantages accumulate over many moves.'),
  ],
  whyThisMove:
    "The most straightforward response to d4 — Black mirrors White's claim to the center. This classical approach says \"I'll meet you in the center and fight for equal space.\" It typically leads to Queen's Gambit positions after c4, where both sides maneuver for small advantages. These positions reward patient, strategic play and deep understanding of pawn structures.",
  strategicThemes: [
    'Central symmetry — solid foundation',
    "Queen's Gambit structures with strategic pawn play",
    'Minority attacks and pawn breaks are key themes',
    'Piece maneuvering in closed or semi-closed positions',
  ],
  threats: [
    "White's main plan is c4, offering the Queen's Gambit",
    'If Black takes c4 (QGA), they must be ready for White\'s center expansion',
    "The Slav and QGD are Black's main defensive systems",
  ],
  prosAndCons: {
    pros: [
      'Classical and well-understood positions',
      'Solid central presence',
      'Rich strategic middlegames',
    ],
    cons: [
      'Can lead to passive positions for Black',
      'White often gets a slight space advantage',
      'Theory is deep in the main lines',
    ],
  },
  famousPlayers: ['Anatoly Karpov', 'Tigran Petrosian', 'Vladimir Kramnik'],
  responses: [response('d4_d5_c4', 'c4', "Queen's Gambit")],
  lines: [
    line("Queen's Gambit Declined", 'd4 d5 c4 e6'),
    line('Slav Defense', 'd4 d5 c4 c6'),
    line("Queen's Gambit Accepted", 'd4 d5 c4 dxc4'),
  ],
  tree: [
    tree('d4 d5', [
      tree('c4', [tree('e6 (QGD)'), tree('c6 (Slav)'), tree('dxc4 (QGA)')]),
    ]),
  ],
});

export const d4_d5_c4 = createOpening({
  id: 'd4_d5_c4',
  move: 'c4',
  name: "Queen's Gambit",
  boardPgn: 'd4 d5 c4',
  intent: [
    "One of the oldest and most famous openings in chess",
    "White offers a pawn to seize central control",
    "Not a true gambit — White recovers the pawn easily",
  ],
  whyThisMove:
    "The Queen's Gambit is chess royalty — played by world champions for over a century, and now a cultural phenomenon thanks to the Netflix series. With c4, White challenges Black's d5 pawn. Despite the name, it's not a real gambit: if Black takes (dxc4), White wins the pawn back with ease. The real question is how Black responds: the solid QGD (e6), the flexible Slav (c6), or the daring QGA (dxc4). Each choice leads to deeply strategic play.",
  strategicThemes: [
    "Central tension — White wants to dominate d5 and e4",
    "Minority attacks on the queenside (a4-b5 pawn advances)",
    "Pawn structure defines the middlegame character",
    "Piece maneuvering in semi-closed positions",
  ],
  prosAndCons: {
    pros: [
      "Rich strategic positions with deep plans",
      "Over a century of grandmaster theory to learn from",
      "Suits patient, positional players",
    ],
    cons: [
      "Theory runs very deep in main lines",
      "Positions can become slow — not for tactical firebrands",
      "Black has many reliable equalizing methods",
    ],
  },
  famousPlayers: ['José Raúl Capablanca', 'Garry Kasparov', 'Beth Harmon', 'Magnus Carlsen', 'Anatoly Karpov'],
  responses: [
    response('d4_d5_c4_e6', 'e6', "Queen's Gambit Declined"),
    response('d4_d5_c4_c6', 'c6', 'Slav Defense'),
    response('d4_d5_c4_dxc4', 'dxc4', "Queen's Gambit Accepted"),
  ],
  lines: [
    line("Queen's Gambit Declined — Orthodox", 'd4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O'),
    line("Slav Defense main line", 'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4'),
    line("Queen's Gambit Accepted", 'd4 d5 c4 dxc4 e4 e5 Nf3'),
  ],
  tree: [
    tree('d4 d5 c4', [
      tree('e6 (QGD)', [tree('Nc3 Nf6 Bg5 — Orthodox')]),
      tree('c6 (Slav)', [tree('Nf3 Nf6 Nc3 — main Slav')]),
      tree('dxc4 (QGA)', [tree('e4 — central push')]),
    ]),
  ],
});
export const d4_d5_c4_e6 = createOpening({
  id: 'd4_d5_c4_e6',
  move: 'e6',
  name: "Queen's Gambit Declined",
  boardPgn: 'd4 d5 c4 e6',
  intent: [
    'The most classical response — solid and reliable',
    'e6 holds d5 firmly and prepares development',
  ],
  whyThisMove:
    "The QGD is the bedrock of classical chess. Black says 'no thanks' to the gambit and holds the center with e6. The resulting positions are rich and strategic — White often plays for a minority attack on the queenside, while Black aims for a c5 or e5 pawn break. It's the opening that defined world championship matches for decades.",
  strategicThemes: [
    'Solid central structure — d5 is firmly defended',
    'Minority attack (a4-b5) is White\'s main queenside plan',
    'Black aims for c5 or e5 pawn breaks for counterplay',
  ],
  prosAndCons: {
    pros: ['Rock solid — extremely hard to crack', 'Rich strategic play', 'Trusted at the highest level'],
    cons: ['Can feel passive early on', 'Light-squared bishop is often blocked by e6'],
  },
  famousPlayers: ['Anatoly Karpov', 'Vladimir Kramnik', 'Ding Liren'],
  lines: [
    line('Orthodox QGD', 'd4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3'),
    line('Tartakower', 'd4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6'),
  ],
});
export const d4_d5_c4_c6 = createOpening({
  id: 'd4_d5_c4_c6',
  move: 'c6',
  name: 'Slav Defense',
  boardPgn: 'd4 d5 c4 c6',
  intent: [
    'Supports d5 without blocking the light-squared bishop',
    'Flexible — dxc4 is always an option',
  ],
  whyThisMove:
    "The Slav is the QGD's cooler sibling. By playing c6 instead of e6, Black keeps the light-squared bishop free to develop to f5 or g4, which is the main drawback of the QGD. The Semi-Slav (c6 + e6) is one of the sharpest systems in all of chess. The Slav is a favorite of modern grandmasters who want a solid but dynamic position.",
  strategicThemes: [
    'Light-squared bishop stays active (unlike QGD)',
    'dxc4 followed by b5 grabs space on the queenside',
    'Semi-Slav (adding e6) leads to incredibly sharp play',
  ],
  prosAndCons: {
    pros: ['Bishop on c8 stays active', 'Flexible pawn structure', 'Can transpose to many systems'],
    cons: ['c6 doesn\'t help develop pieces', 'Some lines require precise knowledge'],
  },
  famousPlayers: ['Magnus Carlsen', 'Viswanathan Anand', 'Vladimir Kramnik'],
  lines: [
    line('Main Slav', 'd4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4'),
    line('Semi-Slav', 'd4 d5 c4 c6 Nf3 Nf6 Nc3 e6 Bg5'),
  ],
});
export const d4_d5_c4_dxc4 = createOpening({
  id: 'd4_d5_c4_dxc4',
  move: 'dxc4',
  name: "Queen's Gambit Accepted",
  boardPgn: 'd4 d5 c4 dxc4',
  intent: [
    'Take the pawn and let White prove compensation',
    'Active piece play — not as passive as it looks',
  ],
  whyThisMove:
    "Taking the pawn isn't about holding onto it — White can always recover it. The QGA is about giving White a broad center and then undermining it. Black develops quickly with Nf6, e6, c5 and challenges White to prove the center is an advantage, not a target. Modern grandmasters have shown the QGA is perfectly sound and leads to active play for Black.",
  strategicThemes: [
    'Black gives up the center temporarily for piece activity',
    'c5 pawn break challenges White\'s d4',
    'White gets a central majority but Black gets counterplay',
  ],
  prosAndCons: {
    pros: ['Active piece play for Black', 'Less theory than QGD', 'Surprise value at all levels'],
    cons: ['White gets a strong center', 'Black must play accurately to equalize', 'Can feel like defending early on'],
  },
  lines: [
    line('Main line', 'd4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5'),
    line('Central variation', 'd4 d5 c4 dxc4 e4 e5 Nf3'),
  ],
});

export const d4_nf6 = createOpening({
  id: 'd4_nf6',
  move: 'Nf6',
  name: 'Indian Defenses',
  boardPgn: 'd4 Nf6',
  intent: [
    'Hypermodern approach - control center from distance',
    'Flexible setup with many variations',
    'Often leads to fianchetto structures',
  ],
  principleApplications: [
    principle('development', 'Develops a knight to a strong central square immediately.'),
    principle('center', 'Controls d5 and e4 with a piece — hypermodern center influence.'),
    principle('planning', 'Waits to see White\'s setup before committing to a pawn structure — maximum adaptability.'),
    principle('spaceTempo', 'Counter-attacking philosophy: let White build a center, then strike at it.'),
  ],
  whyThisMove:
    "Instead of immediately contesting the center with a pawn, Nf6 develops a piece and controls both d5 and e4 from a distance. This hypermodern approach waits to see how White builds their center before deciding how to attack it. From here, Black can steer the game into the sharp King's Indian, the solid Queen's Indian, or the tricky Nimzo-Indian — each with its own character and strategic plans.",
  strategicThemes: [
    'Hypermodern center control — pieces before pawns',
    'Flexibility to choose between multiple Indian systems',
    'Fianchetto setups are common (Bg7 or Bb7)',
    'Counter-attacking philosophy: let White build, then strike',
  ],
  threats: [
    'White usually plays c4 to build a broad center',
    'If Black delays too long, White can establish a strong pawn center',
    'The Nimzo-Indian (Bb4) pins the knight and creates doubled pawns',
  ],
  prosAndCons: {
    pros: [
      'Extremely flexible — many systems to choose from',
      'Can lead to sharp, dynamic positions',
      'Strong counter-attacking chances',
      'Rich strategic variety',
    ],
    cons: [
      'White often gets more central space initially',
      'Requires knowledge of multiple systems',
      'Some lines can be cramped for Black',
    ],
  },
  famousPlayers: ['Garry Kasparov', 'Bobby Fischer', 'Mikhail Tal', 'Teimour Radjabov'],
  responses: [response('d4_nf6_c4', 'c4', 'Main line')],
  lines: [
    line("Queen's Indian", "d4 Nf6 c4 e6 Nf3 b6"),
    line("King's Indian", 'd4 Nf6 c4 g6 Nc3 Bg7'),
    line('Nimzo-Indian', 'd4 Nf6 c4 e6 Nc3 Bb4'),
  ],
  tree: [
    tree('d4 Nf6', [
      tree('c4', [
        tree("e6 (Queen's Indian/Nimzo)"),
        tree("g6 (King's Indian)"),
      ]),
    ]),
  ],
});

// Indian Defense variations
export const d4_nf6_c4 = createVariation({
  id: 'd4_nf6_c4',
  move: 'c4',
  name: 'c4',
  boardPgn: 'd4 Nf6 c4',
  intent: [
    'White expands in the center with c4 — controlling d5 and preparing a broad pawn center',
    'This is the gateway to all the Indian Defenses: Black chooses between ...g6 (King\'s Indian), ...e6 (Nimzo/Queen\'s Indian), or ...c5',
    'The move says "I want a big center" — Black must decide whether to challenge it or play around it',
  ],
  responses: [
    response('d4_nf6_c4_g6', 'g6', "King's Indian"),
    response('d4_nf6_c4_e6', 'e6', "Queen's Indian / Nimzo"),
  ],
});
export const d4_nf6_c4_g6 = createVariation({
  id: 'd4_nf6_c4_g6',
  move: 'g6',
  name: "King's Indian",
  boardPgn: 'd4 Nf6 c4 g6',
  intent: [
    'Black signals the King\'s Indian — fianchetto the bishop to g7 and build a kingside attack',
    'Black concedes the center initially (...d6 next), then strikes back with ...e5 to create dynamic counterplay',
    'One of the most combative defenses — leads to opposite-side attacks and sharp tactical battles',
  ],
  responses: [response('d4_nf6_c4_g6_nc3', 'Nc3', 'KID main')],
});
export const d4_nf6_c4_g6_nc3 = createVariation({
  id: 'd4_nf6_c4_g6_nc3',
  move: 'Nc3',
  name: "King's Indian main",
  boardPgn: 'd4 Nf6 c4 g6 Nc3 Bg7',
  intent: [
    'White develops the knight to support the center — after ...Bg7, ...d6, the King\'s Indian structure is set',
    'White can push e4 to build a massive center, then Black counters with ...e5 creating tension',
    'The classic King\'s Indian battle: White attacks on the queenside (c5), Black attacks on the kingside (f5, g5)',
  ],
});
export const d4_nf6_c4_e6 = createVariation({
  id: 'd4_nf6_c4_e6',
  move: 'e6',
  name: "Queen's Indian / Nimzo",
  boardPgn: 'd4 Nf6 c4 e6',
  intent: [
    'Black keeps options flexible — waiting to see White\'s third move before committing',
    'If White plays Nc3, Black can pin with ...Bb4 (Nimzo-Indian) — one of the most respected defenses',
    'If White plays Nf3, Black plays ...b6 (Queen\'s Indian) — a solid hypermodern setup controlling the center with pieces',
  ],
});

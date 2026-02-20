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
  famousPlayers: ['Anatoly Karpov', 'Ding Liren', 'Alexander Alekhine', 'Hikaru Nakamura'],
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
  famousPlayers: ['Anatoly Karpov', 'Tigran Petrosian', 'Magnus Carlsen'],
  famousGames: [
    game(
      'Petrosian vs Spassky, 1966 WC',
      'Petrosian — the great "Iron Tigran" — uses the solid d4 d5 structure to defend his World Championship title in a memorable strategic battle.'
    ),
    game(
      'Carlsen vs Anand, 2014 WC Game 11',
      'Magnus Carlsen navigates the closed pawn structures of d4 d5 with precision to grind out a key World Championship win.'
    ),
  ],
  responses: [
    response('d4_d5_c4', 'c4', "Queen's Gambit"),
    response('d4_d5_bf4', 'Bf4', 'London System'),
  ],
  lines: [
    line("Queen's Gambit Declined", 'd4 d5 c4 e6'),
    line('Slav Defense', 'd4 d5 c4 c6'),
    line("Queen's Gambit Accepted", 'd4 d5 c4 dxc4'),
    line('London System', 'd4 d5 Bf4 Nf6 e3 e6 Nf3 Bd6'),
  ],
  tree: [
    tree('d4 d5', [
      tree('c4', [tree('e6 (QGD)'), tree('c6 (Slav)'), tree('dxc4 (QGA)')]),
      tree('Bf4 (London)'),
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
  famousGames: [
    game(
      'Kasparov vs Anand, 1995 WC Game 10',
      'Kasparov unleashes a brilliant Queen\'s Gambit attacking game against Anand in their World Championship match in New York.'
    ),
    game(
      'Capablanca vs Lasker, 1921 WC Game 10',
      'Capablanca outplays the reigning World Champion Emanuel Lasker in a masterclass of Queen\'s Gambit technique.'
    ),
  ],
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
  famousPlayers: ['Anatoly Karpov', 'Ding Liren', 'Beth Harmon', 'Magnus Carlsen'],
  famousGames: [
    game(
      'Karpov vs Kasparov, 1986 WC Game 22',
      'Karpov uses the QGD to outmaneuver Kasparov in a long positional battle — a landmark game in their legendary rivalry.'
    ),
    game(
      'Carlsen vs Anand, 2013 WC Game 5',
      'Carlsen wins a QGD endgame in clinical fashion against Anand, showcasing the opening\'s endgame conversion possibilities.'
    ),
  ],
  responses: [
    response('d4_d5_c4_e6_nc3', 'Nc3', 'Orthodox QGD'),
  ],
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
  famousPlayers: ['Magnus Carlsen', 'Viswanathan Anand', 'Daniel Naroditsky', 'Alexandra Botez'],
  famousGames: [
    game(
      'Anand vs Gelfand, 2012 WC Game 7',
      'Anand wins a critical Slav Defense game in their World Championship match — a tense tactical battle that swung the match momentum.'
    ),
    game(
      'Topalov vs Kramnik, 2006 WC Game 1',
      'The famous "Toiletgate" match opener — Kramnik plays the Slav Defense and scores a fine win in Game 1 of their controversial title match.'
    ),
  ],
  responses: [
    response('d4_d5_c4_c6_nf3', 'Nf3', 'Slav main'),
  ],
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
  famousPlayers: ['Anatoly Karpov', 'Efim Geller', 'Boris Gelfand', 'Fabiano Caruana'],
  famousGames: [
    game(
      'Karpov vs Portisch, 1975',
      'Karpov converts a QGA edge with textbook precision — a model of how to exploit the extra central space against an active but slightly overextended Black.'
    ),
    game(
      'Gelfand vs Shirov, 1997',
      'Gelfand demonstrates active piece play in the QGA — a reminder that Black\'s counterplay can be just as sharp as White\'s central control.'
    ),
  ],
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
  famousGames: [
    game(
      'Tal vs Botvinnik, 1960 WC Game 6',
      'Tal launches an audacious King\'s Indian-style piece sacrifice against the reigning World Champion — one of the most daring games ever played.'
    ),
    game(
      'Fischer vs Petrosian, 1971 Candidates Game 7',
      'Fischer uses the King\'s Indian Defense to defeat the former World Champion in a celebrated crushing win on the road to the 1972 title.'
    ),
  ],
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
  responses: [
    response('d4_nf6_c4_g6_nc3_d5', 'd5', 'Grünfeld Defense'),
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
  responses: [
    response('d4_nf6_c4_e6_g3', 'g3', 'Catalan Opening'),
    response('d4_nf6_c4_e6_nf3', 'Nf3', 'QID / Bogo-Indian'),
  ],
});

// ============================================================================
// QGD DEPTH NODES (5th–6th level)
// ============================================================================

export const d4_d5_c4_e6_nc3 = createVariation({
  id: 'd4_d5_c4_e6_nc3',
  move: 'Nc3',
  name: 'Orthodox QGD',
  boardPgn: 'd4 d5 c4 e6 Nc3',
  intent: [
    'White develops the knight to c3, supporting the center and preparing to challenge d5',
    'Black\'s critical choice: ...Nf6 enters the Orthodox QGD — a rock-solid classical structure',
    'After Nc3 Nf6, White typically plays Bg5 (pinning the knight), beginning a strategic tug-of-war over d5',
    'The Orthodox QGD is one of the most deeply studied positions in chess — Beth Harmon\'s favorite strategic battleground',
  ],
  responses: [
    response('d4_d5_c4_e6_nc3_nf6', 'Nf6', 'Orthodox Main Line'),
  ],
});

export const d4_d5_c4_e6_nc3_nf6 = createVariation({
  id: 'd4_d5_c4_e6_nc3_nf6',
  move: 'Nf6',
  name: 'Orthodox Main Line',
  boardPgn: 'd4 d5 c4 e6 Nc3 Nf6',
  intent: [
    'Black develops the knight to its best square, completing the classic QGD setup',
    'Now White almost always plays Bg5, pinning the knight and increasing pressure on d5',
    'This is the core Orthodox QGD position — the key strategic themes are the minority attack (a4-b5) and Black\'s ...c5 counterplay',
    'Both sides have clear long-term plans: White targets the queenside, Black fights for piece activity',
  ],
  responses: [
    response('d4_d5_c4_e6_nc3_nf6_bg5', 'Bg5', 'Bg5 — Classical Pressure'),
  ],
});

export const d4_d5_c4_e6_nc3_nf6_bg5 = createVariation({
  id: 'd4_d5_c4_e6_nc3_nf6_bg5',
  move: 'Bg5',
  name: 'QGD Bg5 Classical',
  boardPgn: 'd4 d5 c4 e6 Nc3 Nf6 Bg5',
  intent: [
    'The most principled move — pins Black\'s knight and increases pressure on the d5 pawn',
    'Black must decide: ...Be7 (Orthodox, solid), ...Nbd7 (more flexible), or ...h6 (Tartakower after Bh4 b6)',
    'The Be7 line leads to the most classical positions; the Tartakower (with h6 Bh4 b6) is the sharpest and most ambitious',
    'After Be7 e3 O-O Nf3, White has a small but lasting edge in the main line — precision is key for both sides',
  ],
});

// ============================================================================
// SLAV DEPTH NODES (5th level)
// ============================================================================

export const d4_d5_c4_c6_nf3 = createVariation({
  id: 'd4_d5_c4_c6_nf3',
  move: 'Nf3',
  name: 'Slav main',
  boardPgn: 'd4 d5 c4 c6 Nf3',
  intent: [
    'White develops naturally — Nf3 supports the center and prepares e3 or Nc3',
    'This is the gateway to the main Slav lines: after ...Nf6, White can play Nc3 (main), e3, or Bg5',
    'The move order matters: Nf3 before Nc3 avoids certain sharp gambits Black can try against Nc3 directly',
    'Black\'s biggest asset in the Slav — the free light-squared bishop — must now be activated quickly',
  ],
  responses: [
    response('d4_d5_c4_c6_nf3_nf6', 'Nf6', 'Slav Nf6'),
  ],
});

export const d4_d5_c4_c6_nf3_nf6 = createVariation({
  id: 'd4_d5_c4_c6_nf3_nf6',
  move: 'Nf6',
  name: 'Slav Nf6',
  boardPgn: 'd4 d5 c4 c6 Nf3 Nf6',
  intent: [
    'Black develops the knight and contests e4, reaching the main Slav tabiya',
    'White\'s choice here defines the character of the game: Nc3 (main), e3 (safe), or Bg5 (aggressive Semi-Slav pressure)',
    'After Nc3, Black\'s classic plan is ...dxc4 followed by ...b5, grabbing queenside space',
    'The Semi-Slav (adding ...e6) leads to one of the most theoretically complex systems in chess — the Meran and Anti-Meran',
  ],
});

// ============================================================================
// LONDON SYSTEM DEPTH NODES
// ============================================================================

export const d4_d5_bf4 = createOpening({
  id: 'd4_d5_bf4',
  move: 'Bf4',
  name: 'London System',
  boardPgn: 'd4 d5 Bf4',
  intent: [
    'A system opening — White plays Bf4, e3, Nf3, Bd3, and O-O regardless of what Black does',
    'Developing the bishop outside the pawn chain before e3 locks it in — the key move-order trick',
    'No sharp theory required: understand the plan once and play it in every game',
  ],
  principleApplications: [
    principle('development', 'Bf4 develops the bishop to its ideal square before the e3 pawn can block it — a key structural detail.'),
    principle('pawnStructure', 'The Bf4 + e3 + Nf3 + Bd3 setup creates a solid, compact pawn structure with no weaknesses.'),
    principle('planning', 'System-based play — White\'s plan is identical every game: castle kingside, then decide between a kingside attack or queenside expansion.'),
    principle('kingSafety', 'Early castling and a compact pawn chain give White a very safe king position throughout the game.'),
  ],
  whyThisMove:
    "Bf4 is the London's defining move, and the timing is everything. White plays it before e3 specifically so the bishop doesn't get locked behind its own pawns — a lesson in piece activity that applies to all of chess. The London is a true system opening: after Bf4, White will play e3, Nf3, Bd3 (or Be2), and O-O no matter what Black does. It's incredibly hard to attack because White has no weaknesses. Magnus Carlsen has used it at the World Championship level, and at club level it wins countless games because opponents never quite know how to fight it.",
  strategicThemes: [
    'Bf4 + e3 + Nf3 + Bd3 + O-O — the London autopilot setup',
    'After castling, White can attack on the kingside with moves like Ne5, f3, g4',
    'The bishop on f4 controls e5 and puts pressure on Black\'s position',
    'Very solid — Black struggles to find active counterplay against a well-set-up London',
  ],
  threats: [
    'Ne5 followed by f3 and g4 is a thematic kingside attack plan',
    'Bd3 eyes the h7 pawn in many lines',
    'White can switch to a queenside plan with Qd2 + Bh6 to exchange Black\'s dark-squared bishop',
  ],
  traps: [
    trap(
      'London Trap — Qb3 Pressure',
      'After Bf4 e6 e3 Nf6 Nf3 Bd6?, White can play Bxd6 Qxd6 Bb5+!, winning a tempo and gaining the bishop pair.',
      'd4 d5 Bf4 e6 e3 Nf6 Nf3 Bd6 Bxd6 Qxd6 Bb5+'
    ),
  ],
  prosAndCons: {
    pros: [
      'No theory required — learn the plan once, apply it forever',
      'Very solid — almost impossible to get a bad position',
      'Played at all levels, including World Championship',
      'Great for beginners and time-pressed players',
    ],
    cons: [
      'Less ambitious than the Queen\'s Gambit — harder to fight for a big advantage',
      'Experienced players know how to equalize comfortably',
      'Can feel repetitive — every game has a similar structure',
    ],
  },
  famousPlayers: ['Magnus Carlsen', 'Hikaru Nakamura', 'Fabiano Caruana', 'Beth Harmon', 'Levy Rozman'],
  famousGames: [
    game(
      'Carlsen vs Caruana, 2018 WC (Rapid)',
      'Magnus Carlsen deploys the London System in the rapid playoff tiebreak, keeping the position solid and grinding out his 12th World Championship.'
    ),
    game(
      'Nakamura vs Carlsen, 2022 Chess.com Masters',
      'Hikaru Nakamura uses the London to outmaneuver Carlsen in a sharp middlegame — a reminder that the London can absolutely produce dynamic play.'
    ),
  ],
  responses: [
    response('d4_d5_bf4_nf6', 'Nf6', 'London main'),
  ],
  lines: [
    line('Classical London', 'd4 d5 Bf4 Nf6 e3 e6 Nf3 Bd6 Bxd6 Qxd6 Bd3'),
    line('London vs King\'s Indian setup', 'd4 d5 Bf4 Nf6 e3 g6 Nf3 Bg7 Be2'),
    line('London vs ...c5', 'd4 d5 Bf4 c5 e3 Nc6 Nf3 Nf6 c3'),
  ],
  tree: [
    tree('d4 d5 Bf4', [
      tree('Nf6', [
        tree('e3', [
          tree('e6 — classical', [tree('Nf3 Bd6 Bxd6 — solid')]),
          tree('g6 — King\'s Indian setup', [tree('Nf3 Bg7 Be2')]),
        ]),
      ]),
      tree('c5 — challenge the center'),
      tree('Nc6 — flexible'),
    ]),
  ],
});

export const d4_d5_bf4_nf6 = createVariation({
  id: 'd4_d5_bf4_nf6',
  move: 'Nf6',
  name: 'London main',
  boardPgn: 'd4 d5 Bf4 Nf6',
  intent: [
    'Black develops naturally — the most principled response to the London',
    'White plays e3, completing the London setup: Nf3 next, then Bd3 (or Be2), then castle',
    'After e3, Black must decide: ...e6 (solid, classical), ...g6 (King\'s Indian structure), or ...c5 (central counterplay)',
    'The Nf6 move is actually slightly challenging for White — the knight contests e4 and keeps options open',
  ],
  responses: [
    response('d4_d5_bf4_nf6_e3', 'e3', 'London setup'),
  ],
});

export const d4_d5_bf4_nf6_e3 = createVariation({
  id: 'd4_d5_bf4_nf6_e3',
  move: 'e3',
  name: 'London setup',
  boardPgn: 'd4 d5 Bf4 Nf6 e3',
  intent: [
    'The defining London move — e3 completes the pawn chain and solidifies White\'s center',
    'The bishop on f4 is now safely tucked outside the pawns — ready to stay active all game',
    'White will now play Nf3, Bd3, O-O and the London structure is complete — simple and powerful',
    'Black\'s main choices: ...e6 (solid), ...g6 (hypermodern), or ...c5 (immediate counterplay in the center)',
  ],
  responses: [
    response('d4_d5_bf4_nf6_e3_e6', 'e6', 'Classical London'),
  ],
});

export const d4_d5_bf4_nf6_e3_e6 = createVariation({
  id: 'd4_d5_bf4_nf6_e3_e6',
  move: 'e6',
  name: 'Classical London',
  boardPgn: 'd4 d5 Bf4 Nf6 e3 e6',
  intent: [
    'The most classical London structure — Black builds a solid pawn chain with d5 + e6',
    'White plays Nf3, Bd3 (or Be2), O-O — the textbook London setup is reached',
    'Black will often play ...Bd6, aiming to trade off White\'s active bishop on f4',
    'After ...Bd6 Bxd6 Qxd6, the position is roughly equal but White\'s solid structure provides long-term pressure',
  ],
});

// ============================================================================
// GRÜNFELD DEFENSE (d4 Nf6 c4 g6 Nc3 d5)
// ============================================================================

export const d4_nf6_c4_g6_nc3_d5 = createOpening({
  id: 'd4_nf6_c4_g6_nc3_d5',
  move: 'd5',
  name: 'Grünfeld Defense',
  boardPgn: 'd4 Nf6 c4 g6 Nc3 d5',
  intent: [
    'The Grünfeld — Black voluntarily gives White a massive center and immediately attacks it',
    'After cxd5 Nxd5, Black has the ...Bg7 + ...c5 counter-attack ready to dismantle White\'s center',
    'The ultimate hypermodern strategy: let White have e4 + d4, then prove it\'s a weakness',
  ],
  principleApplications: [
    principle('center', 'Black deliberately cedes the center — ...d5 followed by Nxd5 invites White to build a big center to attack.'),
    principle('planning', 'Black\'s entire strategy is the ...Bg7 + ...c5 counter-punch to shatter White\'s center.'),
    principle('development', 'After ...Bg7, the long diagonal becomes a highway aimed directly at White\'s d4 pawn.'),
  ],
  whyThisMove:
    "The Grünfeld is one of the most theoretically demanding and exciting openings in chess. Black plays d5 into a position where it can be taken — after cxd5 Nxd5 e4 Nxc3 bxc3, White has a dominant pawn center with e4 + d4. But Black's plan is precise and powerful: fianchetto the bishop to g7 where it fires down the long diagonal at d4, then play c5 to attack the center at its base. The Grünfeld has been used by World Champions Fischer, Kasparov, and Carlsen to devastating effect.",
  strategicThemes: [
    'Bg7 + c5 is Black\'s core counter-attack — pressure on d4 from multiple angles',
    'Exchange Variation (cxd5 Nxd5 e4) — White\'s massive center vs Black\'s piece activity',
    'White\'s center looks scary but Black aims to prove it\'s overextended',
    'Some of the deepest theory in chess — precision required from both sides',
  ],
  threats: [
    'Exchange Variation: White builds e4-d4 pawn center — active piece play needed immediately',
    'Russian System (Qb3) — directly attacks d5 and b7, forcing Black to respond carefully',
    'White\'s center can roll forward with e5 if Black doesn\'t counter-attack quickly enough',
  ],
  traps: [
    trap(
      'Grünfeld Trap — Nb4 Fork',
      'In some Exchange lines, after Bg7 e4 Nxc3 bxc3 c5 Nf3 Bg4?! Be3!, White\'s bishop defends everything and Black\'s pin fails.',
      'd4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Nf3 c5 Be2 Bg4 Be3'
    ),
  ],
  prosAndCons: {
    pros: [
      'Counter-attacking at the highest level — World Champions use it',
      'If you know the theory, you always have active play',
      'Extremely rich and creative positions',
    ],
    cons: [
      'White gets a powerful center — requires precise knowledge to fight it',
      'Very deep theory in the Exchange Variation — must be prepared',
      'A single inaccuracy can leave Black in a passive, cramped position',
    ],
  },
  famousPlayers: ['Bobby Fischer', 'Garry Kasparov', 'Magnus Carlsen', 'Hikaru Nakamura', 'Teimour Radjabov'],
  famousGames: [
    game(
      'Kasparov vs Karpov, 1985 WC Game 16',
      'Kasparov plays the Grünfeld to win a landmark World Championship game — one of the most celebrated games of the 1980s rivalry.'
    ),
    game(
      'Fischer vs Spassky, 1972 Game 6',
      'Fischer uses the Grünfeld (actually a QGD-like structure but Grünfeld ideas) to win what many call the greatest game ever played.'
    ),
  ],
  lines: [
    line('Exchange Variation', 'd4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7'),
    line('Russian System', 'd4 Nf6 c4 g6 Nc3 d5 Qb3'),
    line('Neo-Grünfeld', 'd4 Nf6 c4 g6 Nc3 d5 Nf3'),
  ],
  tree: [
    tree('d4 Nf6 c4 g6 Nc3 d5', [
      tree('cxd5 (Exchange)', [
        tree('Nxd5 e4 Nxc3 bxc3 Bg7', [
          tree('Nf3 (main)'),
          tree('Be3 (positional)'),
        ]),
      ]),
      tree('Qb3 (Russian System)'),
      tree('Nf3 (Neo-Grünfeld)'),
    ]),
  ],
});

// ============================================================================
// CATALAN OPENING (d4 Nf6 c4 e6 g3)
// ============================================================================

export const d4_nf6_c4_e6_g3 = createOpening({
  id: 'd4_nf6_c4_e6_g3',
  move: 'g3',
  name: 'Catalan Opening',
  boardPgn: 'd4 Nf6 c4 e6 g3',
  intent: [
    'The Catalan — White combines the Queen\'s Gambit with a kingside fianchetto',
    'The plan: Bg2 applies long-term pressure along the a8-h1 diagonal while d4-c4 controls the center',
    'Open Catalan (Black takes on c4) gives White a powerful bishop; Closed Catalan leads to maneuvering',
  ],
  principleApplications: [
    principle('center', 'White controls the center with d4-c4 while the Bg2 applies pressure from the flank.'),
    principle('planning', 'Slow, patient buildup — White aims for long-term piece activity rather than immediate tactics.'),
    principle('pawnStructure', 'The Catalan bishop on g2 is White\'s most powerful long-term asset — it never goes bad.'),
    principle('development', 'g3 + Bg2 + O-O is the Catalan setup — king is safe, bishop is active, center is stable.'),
  ],
  whyThisMove:
    "The Catalan is Magnus Carlsen's signature weapon — he used it to win multiple World Championship titles and it's one of the most refined openings in chess. By playing g3, White prepares to fianchetto the bishop to g2, where it will dominate the long diagonal for the entire game. Combined with d4-c4, this creates a powerful positional setup. If Black takes the c4 pawn (Open Catalan), the bishop becomes a monster pointing at Black's queenside. The Catalan rewards patient, technical chess — perfect for players who love grinding advantages.",
  strategicThemes: [
    'The Bg2 "Catalan bishop" is the opening\'s defining piece — it exerts pressure all game',
    'Open Catalan: White regains the c4 pawn and gets a long-term bishop advantage',
    'Minority attack on the queenside is a common endgame plan',
    'Semi-open c-file gives White long-term pressure after dxc4',
  ],
  threats: [
    'Open Catalan: Bg2 aims at c6 and a8 — the bishop can become overwhelming',
    'Qa4+ can win back the c4 pawn with initiative in the Open Catalan',
    'Slow queenside pressure builds over time in the Closed Catalan',
  ],
  traps: [
    trap(
      'Catalan Open Trap — Bg2 Battery',
      'In the Open Catalan, after dxc4 a6 Qc2, if Black plays b5?, Ng5! threatens Nxf7 and e4 simultaneously.',
      'd4 Nf6 c4 e6 g3 d5 Bg2 dxc4 Nf3 a6 O-O Nc6 Qc2 b5 Ng5'
    ),
  ],
  prosAndCons: {
    pros: [
      'Extremely solid — almost impossible to get a bad position',
      'Bg2 is a powerful long-term asset throughout the entire game',
      'Used by World Champions — deeply respected at all levels',
      'Suits patient, technical players who like long-term pressure',
    ],
    cons: [
      'Slow and positional — not for players who want quick attacks',
      'Deep theory in the Open Catalan — requires preparation',
      'Black has reliable equalizing methods in the Closed Catalan',
    ],
  },
  famousPlayers: ['Magnus Carlsen', 'Vladimir Kramnik', 'Fabiano Caruana', 'Viswanathan Anand'],
  famousGames: [
    game(
      'Carlsen vs Anand, 2014 WC Game 5',
      'Magnus Carlsen uses the Catalan to win a critical World Championship game — a masterclass in squeezing a long-term positional advantage.'
    ),
    game(
      'Kramnik vs Topalov, 2006',
      'Kramnik deploys the Catalan to outmaneuver Topalov in a technical endgame — precision chess at the highest level.'
    ),
  ],
  responses: [
    response('d4_nf6_c4_e6_g3_d5', 'd5', 'Catalan main'),
  ],
  lines: [
    line('Open Catalan', 'd4 Nf6 c4 e6 g3 d5 Bg2 dxc4 Nf3 a6 O-O'),
    line('Closed Catalan', 'd4 Nf6 c4 e6 g3 d5 Bg2 Be7 Nf3 O-O O-O'),
    line('Catalan Gambit', 'd4 Nf6 c4 e6 g3 d5 Bg2 dxc4 O-O'),
  ],
  tree: [
    tree('d4 Nf6 c4 e6 g3', [
      tree('Bg2 d5', [
        tree('Nf3', [
          tree('dxc4 (Open Catalan)', [tree('a6 O-O — main'), tree('Nd7 Bd7 — solid')]),
          tree('Be7 (Closed Catalan)', [tree('O-O Nf3 O-O')]),
        ]),
      ]),
    ]),
  ],
});

export const d4_nf6_c4_e6_g3_d5 = createVariation({
  id: 'd4_nf6_c4_e6_g3_d5',
  move: 'd5',
  name: 'Catalan main',
  boardPgn: 'd4 Nf6 c4 e6 g3 d5',
  intent: [
    'Black establishes a firm central presence with d5 — the main response to the Catalan',
    'Now White plays Bg2 to complete the fianchetto; Black must decide: take on c4 (Open) or hold the pawn (Closed)',
    'Open Catalan (dxc4): Black takes the pawn and White\'s bishop becomes a monster on g2',
    'Closed Catalan (Be7, O-O): Black keeps the center solid, planning ...c6 or ...b6 for queenside play',
  ],
});

// ============================================================================
// BOGO-INDIAN DEFENSE (d4 Nf6 c4 e6 Nf3 Bb4+)
// ============================================================================

export const d4_nf6_c4_e6_nf3 = createVariation({
  id: 'd4_nf6_c4_e6_nf3',
  move: 'Nf3',
  name: 'QID / Bogo-Indian',
  boardPgn: 'd4 Nf6 c4 e6 Nf3',
  intent: [
    'White plays Nf3, sidestepping the Nimzo-Indian (Nc3 Bb4) and steering toward QID or Bogo-Indian territory',
    'The knight on f3 is natural — controls e5, supports d4, and avoids the pin',
    'Black\'s choice defines the game: b6 (Queen\'s Indian — hypermodern), Bb4+ (Bogo-Indian — practical), or d5 (QGD transposition)',
  ],
  responses: [
    response('d4_nf6_c4_e6_nf3_bb4', 'Bb4+', 'Bogo-Indian'),
  ],
});

export const d4_nf6_c4_e6_nf3_bb4 = createOpening({
  id: 'd4_nf6_c4_e6_nf3_bb4',
  move: 'Bb4+',
  name: 'Bogo-Indian Defense',
  boardPgn: 'd4 Nf6 c4 e6 Nf3 Bb4+',
  intent: [
    'Check! Black forces an immediate response from White — every option involves a concession',
    'Bd2 (most common): offers bishop trade — after Bxd2+ Qxd2/Nxd2, Black has solid Nimzo-like structure',
    'Nd2: blocks the bishop but keeps the position flexible — less forcing than Nc3 Bb4 (Nimzo)',
    'A practical choice: less theory than the Nimzo-Indian, similar ideas, and solid positions',
  ],
  principleApplications: [
    principle('development', 'The check forces White to make a decision immediately — disrupts their development plan.'),
    principle('center', 'After the bishop trade, Black has a solid center and good piece coordination.'),
    principle('planning', 'Black\'s plan is simple: solid pawn structure, active pieces, equalize and play for long-term pressure.'),
  ],
  whyThisMove:
    "The Bogo-Indian is the Nimzo-Indian's more practical cousin. By playing Bb4+, Black forces White to make an immediate choice — either block with Nd2 or offer the bishop trade with Bd2. Unlike the Nimzo-Indian (where Nc3 is already played), the Bogo arises when White plays Nf3 instead, so the pin options are different. It's a solid, reliable opening with less theoretical baggage than the Nimzo, and it often leads to positions where Black has excellent piece activity and a sound structure.",
  strategicThemes: [
    'The check forces an immediate concession from White — piece placement disrupted',
    'After Bxd2+, Black gets the bishop pair or solid knight structure depending on how White recaptures',
    'Less theoretical than the Nimzo — good for players who want solid positions without memorizing long lines',
    'Often transposes into QID or Nimzo-like structures in the middlegame',
  ],
  prosAndCons: {
    pros: [
      'Solid and reliable — similar ideas to the Nimzo with less theory',
      'Forces White to make decisions immediately',
      'Good for practical play — positions are well-understood',
    ],
    cons: [
      'Less forcing than the Nimzo-Indian — White has easy equalization options',
      'Black sometimes gives up the bishop pair without full compensation',
      'Can lead to slightly passive positions if Black is not careful',
    ],
  },
  famousPlayers: ['Efim Geller', 'Ulf Andersson', 'Fabiano Caruana', 'Magnus Carlsen'],
  famousGames: [
    game(
      'Geller vs Bronstein, 1961',
      'Geller uses the Bogo-Indian structure to outmaneuver Bronstein in a long strategic game — a model of how to convert the opening\'s solid foundation.'
    ),
    game(
      'Carlsen vs Caruana, 2018 WC Game 1',
      'Magnus Carlsen faces a Bogo-Indian-like structure and the game exemplifies the opening\'s solid, draw-resistant character at the highest level.'
    ),
  ],
  lines: [
    line('Main line Bd2', 'd4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Bxd2+ Qxd2 O-O'),
    line('Nd2 line', 'd4 Nf6 c4 e6 Nf3 Bb4+ Nd2 O-O e3 d5'),
  ],
  tree: [
    tree('d4 Nf6 c4 e6 Nf3 Bb4+', [
      tree('Bd2 (main)', [tree('Bxd2+ Qxd2 O-O — solid')]),
      tree('Nd2 — flexible', [tree('O-O e3 d5')]),
      tree('Nc3 (Nimzo transposition)'),
    ]),
  ],
});

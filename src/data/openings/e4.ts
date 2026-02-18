import { createOpening, createVariation, response, tree, line, trap, game, arrow, principle } from '../builders';

// ============================================================================
// WHITE'S FIRST MOVE: e4
// ============================================================================

export const e4 = createOpening({
  id: 'e4',
  move: 'e4',
  name: "King's Pawn Opening",
  boardPgn: 'e4',
  intent: [
    'Control the center immediately with a pawn',
    'Open lines for the queen and bishop',
    'Most popular and aggressive first move - leads to sharp, tactical games',
  ],
  boardArrows: [
    arrow('e4', 'd5'),
    arrow('e4', 'f5'),
  ],
  principleApplications: [
    principle('center', 'The e4 pawn directly occupies a central square and controls d5 and f5.'),
    principle('development', 'Opens the diagonal for both the queen and the light-squared bishop.'),
    principle('spaceTempo', 'Immediately claims space in the center, setting the tempo for the game.'),
  ],
  whyThisMove:
    "By pushing the king's pawn two squares, White immediately stakes a claim in the center and opens diagonals for both the queen and the light-squared bishop. It's the most direct way to fight for control of the board from move one. Games after e4 tend to be open, tactical, and full of action — perfect if you like attacking chess. Bobby Fischer famously called it \"best by test.\"",
  strategicThemes: [
    'Rapid piece development — bishop and queen are both freed',
    'Central control of d5 and f5',
    'Early kingside castling is easy to set up',
    'Sets the stage for sharp, tactical middlegames',
  ],
  threats: [
    "Black must respond to White's central claim or risk falling behind",
    'If Black is passive, White can build a strong pawn center with d4',
    'The f7 square can become a target in many e4 lines',
  ],
  traps: [
    trap(
      "Scholar's Mate",
      'White plays Qh5 + Bc4 aiming at f7 for a 4-move checkmate. Easy to defend if you know it, but catches many beginners.',
      'e4 e5 Qh5 Nc6 Bc4 Nf6 Qxf7#'
    ),
  ],
  prosAndCons: {
    pros: [
      'Leads to open, exciting games',
      'Huge body of theory to learn from',
      'Natural piece development',
      'Good for aggressive players',
    ],
    cons: [
      'Well-studied — opponents may know theory deeply',
      'The e4 pawn can become a target',
      'Some defenses (French, Caro-Kann) can lead to closed positions anyway',
    ],
  },
  famousPlayers: ['Bobby Fischer', 'Garry Kasparov', 'Mikhail Tal', 'Magnus Carlsen'],
  famousGames: [
    game(
      'Kasparov vs Topalov, 1999',
      'The "Immortal Game" of modern chess — a dazzling king hunt after e4.'
    ),
    game(
      'Fischer vs Spassky, 1972 Game 6',
      'Fischer opens with c4 but the match is defined by his mastery of e4 openings.'
    ),
  ],
  responses: [
    response('e4_c5', 'c5', 'Sicilian Defense'),
    response('e4_e5', 'e5', 'Open Games'),
    response('e4_e6', 'e6', 'French Defense'),
    response('e4_c6', 'c6', 'Caro-Kann Defense'),
  ],
  lines: [
    line('Open Sicilian', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4'),
    line('Ruy Lopez', 'e4 e5 Nf3 Nc6 Bb5'),
    line('French Classical', 'e4 e6 d4 d5 Nc3'),
    line('Caro-Kann Classical', 'e4 c6 d4 d5 Nc3'),
  ],
  tree: [
    tree('e4', [
      tree('c5 (Sicilian)', [
        tree('Nf3', [tree('d6'), tree('Nc6')]),
        tree('c3 (Alapin)'),
      ]),
      tree('e5 (Open Games)', [
        tree('Nf3', [tree('Nc6')]),
        tree("f4 (King's Gambit)"),
      ]),
      tree('e6 (French)', [tree('d4', [tree('d5')])]),
      tree('c6 (Caro-Kann)', [tree('d4', [tree('d5')])]),
    ]),
  ],
});

// ============================================================================
// BLACK RESPONSES TO e4
// ============================================================================

export const e4_c5 = createOpening({
  id: 'e4_c5',
  move: 'c5',
  name: 'Sicilian Defense',
  boardPgn: 'e4 c5',
  intent: [
    'Fight for the center asymmetrically',
    'Create imbalanced positions with winning chances for both sides',
    'Most popular defense to e4 at all levels',
  ],
  boardArrows: [
    arrow('c5', 'd4'),
    arrow('c5', 'b4', 'rgba(100, 100, 200, 0.4)'),
  ],
  principleApplications: [
    principle('center', 'The c5 pawn fights for d4 without blocking Black\'s d-pawn — asymmetric center control.'),
    principle('pawnStructure', 'After ...cxd4, Black gets the semi-open c-file and a central pawn majority.'),
    principle('planning', 'Black accepts an imbalanced position with a clear plan: queenside counterplay and central pawn majority.'),
    principle('spaceTempo', 'Creates asymmetric tension — both sides get space on different parts of the board.'),
  ],
  whyThisMove:
    "The Sicilian is the most popular and statistically the best-scoring response to e4. Instead of mirroring White with e5, Black fights for the center asymmetrically with c5. The idea is brilliant: Black's c-pawn challenges White's control of d4 without blocking the d-pawn. After White eventually plays d4 and Black captures cxd4, Black gets the open c-file and a central pawn majority — leading to dynamic, unbalanced positions where both sides have real chances to win.",
  strategicThemes: [
    'Asymmetric pawn structure creates imbalance',
    'Black gets the semi-open c-file after ...cxd4',
    'Central pawn majority for Black (d and e pawns vs White\'s e pawn)',
    'White often attacks on the kingside, Black on the queenside',
  ],
  threats: [
    'White\'s main plan is to open the center with d4 and attack the kingside',
    'Beware of early Bc4 + Qf3/Qb3 ideas targeting f7 and b7',
    'The Open Sicilian (Nf3 + d4) gives White active piece play',
  ],
  traps: [
    trap(
      'Siberian Trap',
      'In the Alapin (c3), after d5 exd5 Qxd5 d4 Nf6 Nf3 Bg4, Black has a tricky pin.',
      'e4 c5 c3 d5 exd5 Qxd5 d4 Nf6 Nf3 Bg4'
    ),
    trap(
      'Magnus Smith Trap',
      'In the Dragon, White can play Nxc6 followed by e5, winning material if Black isn\'t careful.',
    ),
  ],
  prosAndCons: {
    pros: [
      'Statistically the best-scoring response to e4',
      'Creates real winning chances for Black',
      'Rich, dynamic positions with lots of variety',
      'Huge choice of sub-variations to suit your style',
    ],
    cons: [
      'Must know a lot of theory to play well',
      'White has many anti-Sicilian options (Alapin, Closed, Grand Prix)',
      'Positions can be sharp and unforgiving of mistakes',
      'Requires comfort with asymmetric, complex positions',
    ],
  },
  famousPlayers: ['Garry Kasparov', 'Bobby Fischer', 'Magnus Carlsen', 'Fabiano Caruana'],
  famousGames: [
    game(
      'Kasparov vs Anand, 1995',
      'A trademark Kasparov Sicilian victory with devastating kingside play.'
    ),
    game(
      'Fischer vs Sozin, various',
      'Fischer both played and faced the Sicilian throughout his career, contributing enormously to its theory.'
    ),
  ],
  responses: [
    response('e4_c5_nf3', 'Nf3', 'Open Sicilian'),
    response('e4_c5_c3', 'c3', 'Alapin'),
    response('e4_c5_nc3', 'Nc3', 'Closed Sicilian'),
  ],
  lines: [
    line('Open Sicilian', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4'),
    line('Najdorf', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6'),
    line('Alapin', 'e4 c5 c3'),
    line('Closed Sicilian', 'e4 c5 Nc3'),
  ],
  tree: [
    tree('e4 c5', [
      tree('Nf3 (Open Sicilian)', [tree('d6'), tree('Nc6')]),
      tree('c3 (Alapin)'),
      tree('Nc3 (Closed)'),
    ]),
  ],
});

// Sicilian variations (depth 2–3)
export const e4_c5_nf3 = createVariation({
  id: 'e4_c5_nf3',
  move: 'Nf3',
  name: 'Open Sicilian',
  boardPgn: 'e4 c5 Nf3',
  intent: [
    'The main move — White develops the knight and prepares to open the center with d4',
    'Leads to the Open Sicilian, the most critical and theory-heavy battleground in chess',
    'Black must choose a setup: d6 (Najdorf/Dragon) or Nc6 (Classical) — each leads to vastly different games',
  ],
  responses: [
    response('e4_c5_nf3_d6', 'd6', 'Najdorf / Dragon'),
    response('e4_c5_nf3_nc6', 'Nc6', 'Accelerated Dragon'),
  ],
});
export const e4_c5_nf3_d6 = createVariation({
  id: 'e4_c5_nf3_d6',
  move: 'd6',
  name: 'Najdorf / Dragon setup',
  boardPgn: 'e4 c5 Nf3 d6',
  intent: [
    'Black commits to the most popular Sicilian setup — the gateway to the Najdorf, Dragon, and Scheveningen',
    'Keeps options flexible: the knight can go to f6 while Black decides between ...a6 (Najdorf) or ...g6 (Dragon)',
    'White almost always plays d4 next, opening the position for a sharp tactical fight',
  ],
  responses: [response('e4_c5_nf3_d6_d4', 'd4', 'Open Sicilian main')],
});
export const e4_c5_nf3_d6_d4 = createVariation({
  id: 'e4_c5_nf3_d6_d4',
  move: 'd4',
  name: 'Open Sicilian main',
  boardPgn: 'e4 c5 Nf3 d6 d4 cxd4 Nxd4',
  intent: [
    'The critical Open Sicilian tabiya — White has a central majority, Black has the semi-open c-file',
    'Black chooses their system now: ...Nf6 + ...a6 = Najdorf (sharp, flexible); ...g6 = Dragon (fianchetto attack)',
    'White often aims for a kingside attack (Be3, f3, Qd2, O-O-O) while Black counterattacks on the queenside',
  ],
});
export const e4_c5_nf3_nc6 = createVariation({
  id: 'e4_c5_nf3_nc6',
  move: 'Nc6',
  name: 'Accelerated Dragon',
  boardPgn: 'e4 c5 Nf3 Nc6',
  intent: [
    'A flexible move — Black develops the knight and keeps multiple Sicilian systems open',
    'Can transpose to the Classical Sicilian (...d6 next) or Accelerated Dragon (...g6 without ...d6)',
    'The Accelerated Dragon avoids the Yugoslav Attack that regular Dragon players must face',
  ],
});
export const e4_c5_c3 = createOpening({
  id: 'e4_c5_c3',
  move: 'c3',
  name: 'Alapin Sicilian',
  boardPgn: 'e4 c5 c3',
  intent: [
    'Anti-Sicilian — avoid the main lines, play d4 next',
    'A practical weapon that leads to clear play',
  ],
  whyThisMove:
    "Don't want to wade through decades of Najdorf theory? The Alapin says 'I'm playing d4 next and you can't stop me.' White aims for a strong center quickly. Black can take on d4, challenge with d5, or develop normally. It's a sound, practical choice that avoids the sharpest Sicilian lines while giving White a meaningful game.",
  strategicThemes: [
    'White aims for d4 establishing a strong center',
    'Often leads to IQP (isolated d-pawn) positions after d5 exd5 Qxd5 d4',
    'Simpler to learn than the Open Sicilian',
  ],
  prosAndCons: {
    pros: ['Avoids deep Sicilian theory', 'Sound and principled', 'Good surprise weapon'],
    cons: ['Less ambitious than the Open Sicilian', 'Black equalizes with accurate play'],
  },
  lines: [
    line('Main line', 'e4 c5 c3 d5 exd5 Qxd5 d4'),
    line('Nf6 line', 'e4 c5 c3 Nf6 e5 Nd5 d4'),
  ],
});
export const e4_c5_nc3 = createOpening({
  id: 'e4_c5_nc3',
  move: 'Nc3',
  name: 'Closed Sicilian',
  boardPgn: 'e4 c5 Nc3',
  intent: [
    'System approach — fianchetto with g3 and Bg2',
    'Avoids the open Sicilian entirely',
  ],
  whyThisMove:
    "The Closed Sicilian is a system where White plays g3, Bg2, d3, and f4 regardless of what Black does. It avoids the theoretical jungle of the Open Sicilian and gives both sides clear plans: White builds a kingside attack with f4-f5, while Black expands on the queenside. Excellent for players who prefer understanding plans over memorizing moves.",
  strategicThemes: [
    'White fianchettoes and builds a kingside attack',
    'f4-f5 pawn push is the key attacking idea',
    'Black expands on the queenside with a6, b5, Rb8',
  ],
  prosAndCons: {
    pros: ['System-based — fewer forced lines', 'Clear plans for both sides', 'Good at club level'],
    cons: ['Less objectively testing than the Open Sicilian', 'Black knows the plans too'],
  },
  lines: [
    line('Main setup', 'e4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 d3 d6'),
  ],
});

export const e4_e5 = createOpening({
  id: 'e4_e5',
  move: 'e5',
  name: 'Open Games',
  boardPgn: 'e4 e5',
  intent: [
    'Symmetrically claim the center',
    'Lead to tactical, open positions',
    'Classical choice with rich theory',
  ],
  boardArrows: [
    arrow('e5', 'd4'),
    arrow('e5', 'f4'),
  ],
  principleApplications: [
    principle('center', 'Black mirrors White\'s central claim — both sides occupy the center equally.'),
    principle('development', 'Opens the diagonal for Black\'s dark-squared bishop and queen.'),
    principle('kingSafety', 'Symmetric positions often lead to quick castling for both sides.'),
  ],
  whyThisMove:
    "e5 is the most natural and classical response to e4. Black immediately mirrors White's central claim, establishing equal space and freeing the dark-squared bishop and queen. This leads to the \"Open Games\" — positions where both sides develop quickly and piece play matters more than pawn structure. Some of the most beautiful and famous chess games in history arise from e4 e5, including the legendary Ruy Lopez and the romantic Italian Game.",
  strategicThemes: [
    'Symmetric center — equal footing for both sides',
    'Rapid development and piece activity are key',
    'Control of the d4 and d5 squares is often the battleground',
    'Kingside castling and central play dominate the middlegame',
  ],
  threats: [
    'White can put immediate pressure on e5 with Nf3',
    "The King's Gambit (f4) sacrifices a pawn for quick development",
    'The Ruy Lopez pins the Nc6 defender of e5',
  ],
  traps: [
    trap(
      'Legal\'s Mate',
      'A classic sacrifice: White gives up the queen to deliver a knight-bishop mate.',
      'e4 e5 Nf3 Nc6 Bc4 d6 Nc3 Bg4 Nxe5 Bxd1 Bxf7+ Ke7 Nd5#'
    ),
    trap(
      'Fried Liver Attack',
      'White sacrifices a knight on f7 for a vicious attack on Black\'s king.',
      'e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Nxd5 Nxf7'
    ),
  ],
  prosAndCons: {
    pros: [
      'Natural and intuitive for beginners',
      'Leads to classical, well-understood positions',
      'Rich tactical play with many beautiful combinations',
      'Solid central foothold',
    ],
    cons: [
      'Very well-studied — opponents may have deep preparation',
      'The e5 pawn can become a target',
      'Some lines are quite forcing and require precise knowledge',
    ],
  },
  famousPlayers: ['Paul Morphy', 'Viswanathan Anand', 'Magnus Carlsen', 'Fabiano Caruana'],
  famousGames: [
    game(
      'Morphy vs Duke/Count, 1858',
      'The "Opera Game" — Morphy\'s most famous miniature, a model of rapid development.'
    ),
    game(
      'Kasparov vs Anand, 1995 (Ruy Lopez)',
      'A deep modern battle in the Ruy Lopez showing its enduring relevance.'
    ),
  ],
  responses: [
    response('e4_e5_nf3', 'Nf3', 'Knight to f3'),
    response('e4_e5_f4', 'f4', 'King\'s Gambit'),
  ],
  lines: [
    line('Ruy Lopez', 'e4 e5 Nf3 Nc6 Bb5'),
    line('Italian Game', 'e4 e5 Nf3 Nc6 Bc4'),
    line('Petrov Defense', 'e4 e5 Nf3 Nf6'),
  ],
  tree: [
    tree('e4 e5', [
      tree('Nf3', [
        tree('Nc6 (Spanish/Italian)'),
        tree('Nf6 (Petrov)'),
      ]),
      tree("f4 (King's Gambit)"),
    ]),
  ],
});

// Open Games variations
export const e4_e5_nf3 = createVariation({
  id: 'e4_e5_nf3',
  move: 'Nf3',
  name: 'Knight to f3',
  boardPgn: 'e4 e5 Nf3',
  intent: [
    'The most natural developing move — attacks the e5 pawn and develops toward the center',
    'Sets up the great fork: Bb5 (Ruy Lopez), Bc4 (Italian), or Black can play ...Nf6 (Petrov)',
    'This is the starting point for all the classical Open Games that have been played for centuries',
  ],
  responses: [
    response('e4_e5_nf3_nc6', 'Nc6', 'Spanish / Italian'),
    response('e4_e5_nf3_nf6', 'Nf6', 'Petrov Defense'),
  ],
});
export const e4_e5_nf3_nc6 = createVariation({
  id: 'e4_e5_nf3_nc6',
  move: 'Nc6',
  name: 'Spanish / Italian',
  boardPgn: 'e4 e5 Nf3 Nc6',
  intent: [
    'Black defends the e5 pawn while developing — the most classical response',
    'White now chooses: Bb5 (Ruy Lopez) for long-term strategic pressure, or Bc4 (Italian) for direct play against f7',
    'This is the defining moment — the bishop move determines whether you enter Spanish or Italian territory',
  ],
  responses: [
    response('e4_e5_nf3_nc6_bb5', 'Bb5', 'Ruy Lopez'),
    response('e4_e5_nf3_nc6_bc4', 'Bc4', 'Italian Game'),
  ],
});
export const e4_e5_nf3_nc6_bb5 = createOpening({
  id: 'e4_e5_nf3_nc6_bb5',
  move: 'Bb5',
  name: 'Ruy Lopez',
  boardPgn: 'e4 e5 Nf3 Nc6 Bb5',
  intent: [
    'The Spanish Game — the most strategic of the open games',
    'Bb5 pins the knight defending e5, creating long-term pressure',
    'Leads to rich positional and tactical middlegames',
  ],
  whyThisMove:
    "The Ruy Lopez has been the gold standard of e4 e5 chess for centuries. Bb5 doesn't immediately win the e5 pawn (Bxc6 dxc6 Nxe5? Qd4 wins it back), but it creates lasting strategic pressure. White builds a strong center with d3 and c3, maneuvers pieces behind the pawn chain, and slowly squeezes. Black has many ways to fight back — the Morphy Defense (a6), the Berlin Wall (Nf6), the Marshall Attack (sacrificing a pawn for initiative) — making this one of the deepest openings in chess.",
  strategicThemes: [
    'Long-term positional pressure on e5 and the center',
    'White builds with c3, d4 to challenge the center later',
    'Maneuvering game — knights reroute, bishops find diagonals',
    'Pawn structure decisions define the middlegame character',
  ],
  prosAndCons: {
    pros: [
      'Extremely rich strategic and tactical play',
      'White gets long-term initiative without risk',
      'Played by every world champion from Steinitz to Carlsen',
    ],
    cons: [
      'Theory runs incredibly deep — some lines go 30+ moves',
      'The Berlin Defense can lead to dry endgames',
      'Requires patience — not a quick attacking opening',
    ],
  },
  famousPlayers: ['Bobby Fischer', 'Garry Kasparov', 'Magnus Carlsen', 'Anatoly Karpov'],
  lines: [
    line('Morphy Defense', 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O'),
    line('Berlin Defense', 'e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4'),
    line('Marshall Attack', 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O c3 d5'),
  ],
  tree: [
    tree('e4 e5 Nf3 Nc6 Bb5', [
      tree('a6 (Morphy)', [tree('Ba4 Nf6 O-O — main line')]),
      tree('Nf6 (Berlin)', [tree('O-O Nxe4 — Berlin Wall')]),
      tree('d6 (Steinitz)'),
    ]),
  ],
});
export const e4_e5_nf3_nc6_bc4 = createOpening({
  id: 'e4_e5_nf3_nc6_bc4',
  move: 'Bc4',
  name: 'Italian Game',
  boardPgn: 'e4 e5 Nf3 Nc6 Bc4',
  intent: [
    'Targets the f7 square — the weakest point in Black\'s position',
    'Leads to the Giuoco Piano or the Evans Gambit',
    'More directly tactical than the Ruy Lopez',
  ],
  whyThisMove:
    "Bc4 aims straight at f7, the most vulnerable square for the uncastled king. The Italian Game leads to positions where both sides develop quickly and tactical fireworks can erupt at any moment. The Giuoco Piano ('quiet game') with Bc5 leads to rich middlegames. The Evans Gambit (b4!?) sacrifices a pawn for rapid development and a fierce attack. This is an excellent opening for players who enjoy sharp, principled chess.",
  strategicThemes: [
    'Pressure on f7 creates attacking chances',
    'Rapid development and early central tension',
    'd3 and d4 pawn breaks are key for White',
    'Both sides castle kingside — direct play in the center',
  ],
  prosAndCons: {
    pros: [
      'Natural developing moves — easy to learn',
      'Active piece play from the start',
      'Many tactical opportunities for both sides',
    ],
    cons: [
      'The Giuoco Piano can become very theoretical',
      'Black equalizes fairly easily in some lines',
      'Less long-term strategic edge than the Ruy Lopez',
    ],
  },
  famousPlayers: ['Paul Morphy', 'Mikhail Tal', 'Wesley So', 'Fabiano Caruana'],
  lines: [
    line('Giuoco Piano', 'e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4'),
    line('Evans Gambit', 'e4 e5 Nf3 Nc6 Bc4 Bc5 b4'),
    line('Two Knights Defense', 'e4 e5 Nf3 Nc6 Bc4 Nf6 d4'),
  ],
  tree: [
    tree('e4 e5 Nf3 Nc6 Bc4', [
      tree('Bc5 (Giuoco Piano)', [tree('c3 Nf6 d4'), tree('b4 (Evans Gambit)')]),
      tree('Nf6 (Two Knights)'),
    ]),
  ],
});
export const e4_e5_nf3_nf6 = createOpening({
  id: 'e4_e5_nf3_nf6',
  move: 'Nf6',
  name: 'Petrov Defense',
  boardPgn: 'e4 e5 Nf3 Nf6',
  intent: [
    'Counter-attack the e4 pawn instead of defending e5',
    'Leads to symmetrical, solid positions',
    'A drawing weapon trusted at the highest level',
  ],
  whyThisMove:
    "Instead of defending e5, Black mirrors White's attack on the center. The Petrov is the ultimate solid defense — if you're content with a draw as Black, this is your weapon. But don't be fooled: there are sharp lines too, especially if White goes for 3. Nxe5 d6 4. Nf3 Nxe4 5. d4. The Petrov rewards precise calculation and endgame skill over flashy tactics.",
  strategicThemes: [
    'Symmetrical pawn structure — equality is Black\'s goal',
    'Simplification toward endgames where Black holds easily',
    'White must play actively or face a dead draw',
    'Tactical traps exist for unprepared opponents',
  ],
  prosAndCons: {
    pros: [
      'Extremely solid — very hard for White to crack',
      'Trusted by world champions as a drawing weapon',
      'Fewer sharp lines to memorize than Sicilian or French',
    ],
    cons: [
      'Can feel passive — Black defends more than attacks',
      'Drawing tendencies may not suit aggressive players',
      'White can aim for a small edge with careful play',
    ],
  },
  famousPlayers: ['Vladimir Kramnik', 'Fabiano Caruana', 'Sergey Karjakin'],
  lines: [
    line('Classical Petrov', 'e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4'),
    line('Stafford Gambit (tricky)', 'e4 e5 Nf3 Nf6 Nxe5 Nc6'),
  ],
  tree: [
    tree('e4 e5 Nf3 Nf6', [
      tree('Nxe5 (main)', [tree('d6 Nf3 Nxe4 d4')]),
      tree('d4 (Scotch Petrov)'),
    ]),
  ],
});
export const e4_e5_f4 = createOpening({
  id: 'e4_e5_f4',
  move: 'f4',
  name: 'King\'s Gambit',
  boardPgn: 'e4 e5 f4',
  intent: [
    'The ultimate romantic gambit — sacrifice a pawn for a wild attack',
    'Opens the f-file for the rook and clears diagonals',
    'Beloved by attacking players for 400+ years',
  ],
  whyThisMove:
    "The King's Gambit is chess at its most daring. White throws f4 at the board on move two, offering a pawn to rip open lines toward Black's king. If Black accepts with exf4, White gets a strong center (d4, e4) and an open f-file after castling. The Fischer Defense (d6), the Falkbeer Counter-Gambit (d5), and the Classical (Bc5) all give Black fighting chances. This isn't an opening for the faint-hearted — both sides need to play with courage.",
  strategicThemes: [
    'Sacrifice f-pawn for rapid development and open lines',
    'After castling, the f-file becomes a highway for the rook',
    'Strong center with d4 + e4 if Black takes',
    'Attack the king before Black can consolidate the extra pawn',
  ],
  prosAndCons: {
    pros: [
      'Explosive attacking chances from the very start',
      'Opponents are often unprepared for it',
      'Incredibly fun and creative play',
    ],
    cons: [
      'Weakens the king position (f2 to f4 opens the diagonal)',
      'Black can decline and hold a solid position',
      'Modern engines evaluate it as slightly dubious',
    ],
  },
  famousPlayers: ['Adolf Anderssen', 'Boris Spassky', 'Bobby Fischer', 'Hikaru Nakamura'],
  lines: [
    line('King\'s Gambit Accepted', 'e4 e5 f4 exf4 Nf3 d6'),
    line('Falkbeer Counter-Gambit', 'e4 e5 f4 d5 exd5 e4'),
    line('Classical Defense', 'e4 e5 f4 Bc5'),
  ],
  tree: [
    tree('e4 e5 f4', [
      tree('exf4 (Accepted)', [tree('Nf3 — main line'), tree('Bc4 — Bishop\'s Gambit')]),
      tree('d5 (Falkbeer)'),
      tree('Bc5 (Classical)'),
    ]),
  ],
});

export const e4_e6 = createOpening({
  id: 'e4_e6',
  move: 'e6',
  name: 'French Defense',
  boardPgn: 'e4 e6',
  intent: [
    'Solid pawn structure with focus on d5',
    'Accept a somewhat passive position for counterplay later',
    'Create a strong pawn chain',
  ],
  principleApplications: [
    principle('pawnStructure', 'Creates a resilient pawn chain (e6-d5) that\'s very hard to break down.'),
    principle('planning', 'Black accepts a slightly cramped position with a clear plan: attack White\'s pawn chain base with ...c5.'),
    principle('center', 'Prepares to challenge the center with d5 on the next move.'),
  ],
  whyThisMove:
    "The French Defense is a solid, resilient choice. By playing e6, Black prepares to challenge White's center with d5 on the very next move. The resulting pawn chain (pawns on d5 and e6) gives Black a fortress-like structure. The trade-off? The light-squared bishop on c8 gets locked in behind its own pawns — a well-known problem in the French. But Black gets counterplay by attacking White's pawn chain at its base, often with moves like c5 and f6.",
  strategicThemes: [
    'Pawn chain play — attack the base of White\'s chain',
    'Counterplay with ...c5 is the main break',
    'The light-squared bishop problem — plan to exchange or activate it',
    'Solid, resilient pawn structure that\'s hard to crack',
  ],
  threats: [
    'White can play the Advance variation (e5) to cramp Black',
    'The Winawer (Nc3 Bb4) creates sharp, theoretical positions',
    'White often gains space on the kingside',
  ],
  traps: [
    trap(
      'Milner-Barry Gambit',
      'In the Advance variation, White can sacrifice a pawn with c3 and Bd3 for a strong kingside attack.',
    ),
  ],
  prosAndCons: {
    pros: [
      'Very solid and hard for White to break through',
      'Clear strategic plans for both sides',
      'Good for players who like pawn structure battles',
      'Strong counterattacking potential',
    ],
    cons: [
      'The light-squared bishop is often a problem piece',
      'Can feel cramped, especially in the Advance variation',
      'Requires patience — not for those who want quick action',
    ],
  },
  famousPlayers: ['Viktor Korchnoi', 'Wolfgang Uhlmann', 'Tigran Petrosian', 'Ding Liren'],
  famousGames: [
    game(
      'Korchnoi vs Karpov, 1978',
      'A classic French Defense battle in the World Championship match.'
    ),
  ],
  responses: [response('e4_e6_d4', 'd4', 'Advance / Classical')],
  lines: [
    line('Classical', 'e4 e6 d4 d5 Nc3 Nf6'),
    line('Tarrasch', 'e4 e6 d4 d5 Nd2'),
    line('Advance', 'e4 e6 d4 d5 e5'),
  ],
  tree: [
    tree('e4 e6', [
      tree('d4', [
        tree('d5', [tree('Nc3'), tree('Nd2'), tree('e5')]),
      ]),
    ]),
  ],
});

// French variations
export const e4_e6_d4 = createVariation({
  id: 'e4_e6_d4',
  move: 'd4',
  name: 'd4',
  boardPgn: 'e4 e6 d4',
  intent: [
    'Claim the center with d4 — leads to the main French Defense tabiya',
    'Black must commit: ...d5 creates the classic French pawn chain, where the battle revolves around e4 vs d5',
  ],
  responses: [response('e4_e6_d4_d5', 'd5', 'French main')],
});
export const e4_e6_d4_d5 = createVariation({
  id: 'e4_e6_d4_d5',
  move: 'd5',
  name: 'French main',
  boardPgn: 'e4 e6 d4 d5',
  intent: [
    'The defining French structure — pawns lock horns on e4 vs d5, creating a tense center',
    'White must decide how to handle the tension: defend (Nc3/Nd2), advance (e5), or exchange (exd5)',
    'Each choice leads to a fundamentally different type of game — this is where the French truly branches',
  ],
  responses: [
    response('e4_e6_d4_d5_nc3', 'Nc3', 'Classical'),
    response('e4_e6_d4_d5_nd2', 'Nd2', 'Tarrasch'),
    response('e4_e6_d4_d5_e5', 'e5', 'Advance'),
  ],
});
export const e4_e6_d4_d5_nc3 = createVariation({
  id: 'e4_e6_d4_d5_nc3',
  move: 'Nc3',
  name: 'French Classical',
  boardPgn: 'e4 e6 d4 d5 Nc3',
  intent: [
    'The main line — White defends e4 with the knight, keeping maximum tension',
    'Black can play ...Nf6 (Classical, solid) or ...Bb4 (Winawer, sharp and provocative)',
    'The Winawer leads to wild, double-edged play; the Classical is more strategic',
  ],
});
export const e4_e6_d4_d5_nd2 = createVariation({
  id: 'e4_e6_d4_d5_nd2',
  move: 'Nd2',
  name: 'Tarrasch',
  boardPgn: 'e4 e6 d4 d5 Nd2',
  intent: [
    'The Tarrasch variation — White sidesteps the sharp Winawer by blocking the bishop pin',
    'Leads to solid, maneuvering positions where White aims to exploit the French bishop on c8',
    'Less forcing than Nc3, but avoids Black\'s most dynamic counterplay',
  ],
});
export const e4_e6_d4_d5_e5 = createVariation({
  id: 'e4_e6_d4_d5_e5',
  move: 'e5',
  name: 'French Advance',
  boardPgn: 'e4 e6 d4 d5 e5',
  intent: [
    'White grabs space and locks the center — a pawn chain from d4 to e5 controls the board',
    'Black\'s plan is clear: break the chain with ...c5, then attack the base at d4',
    'Leads to strategic battles over pawn breaks; Black\'s light-squared bishop is cramped but the position is playable',
  ],
});

export const e4_c6 = createOpening({
  id: 'e4_c6',
  move: 'c6',
  name: 'Caro-Kann Defense',
  boardPgn: 'e4 c6',
  intent: [
    'Solid defense with less space restriction than French',
    'Support d5 break while keeping the light-squared bishop active',
    'Reliable and safe with good equalizing chances',
  ],
  principleApplications: [
    principle('center', 'Supports a d5 push to challenge White\'s center directly.'),
    principle('pawnStructure', 'Avoids the French\'s bishop problem — the light-squared bishop stays free.'),
    principle('kingSafety', 'Solid setup that rarely leads to king safety issues; Black equalizes safely.'),
  ],
  whyThisMove:
    "The Caro-Kann is like the French Defense's more practical cousin. Black plays c6 to support a d5 push on the next move, fighting for the center just like in the French. But there's a crucial difference: the light-squared bishop on c8 isn't blocked! After d4 d5, Black can develop this bishop freely, avoiding the French's biggest headache. The Caro-Kann is known as one of the most solid and reliable openings in chess — a perfect choice if you want a safe, low-risk game with good equalizing chances.",
  strategicThemes: [
    'Solid pawn structure with an active light-squared bishop',
    'Aim to equalize first, then look for chances',
    'Often leads to endgames where Black\'s solidity pays off',
    'Less cramped than the French — more room for pieces',
  ],
  threats: [
    'The Advance variation (e5) can be cramping',
    'In the Classical (Nc3 dxe4 Nxe4), White gets active pieces quickly',
    'The Panov Attack (with c4) creates isolated queen pawn positions',
  ],
  traps: [
    trap(
      'Caro-Kann Smothered Mate',
      'In some Advance lines, an unexpected Ng6 can trap White\'s pieces.',
    ),
  ],
  prosAndCons: {
    pros: [
      'Extremely solid and reliable',
      'No light-squared bishop problem (unlike the French)',
      'Good equalizing chances',
      'Leads to positions that are hard for White to attack',
    ],
    cons: [
      'Can be slightly passive',
      'Less dynamic winning chances for Black compared to the Sicilian',
      'Some lines are quite dry and drawish',
    ],
  },
  famousPlayers: ['Anatoly Karpov', 'Vishwanathan Anand', 'Fabiano Caruana', 'Alireza Firouzja'],
  famousGames: [
    game(
      'Karpov vs Kasparov, 1984/85',
      'Karpov used the Caro-Kann expertly in their marathon World Championship match.'
    ),
  ],
  responses: [response('e4_c6_d4', 'd4', 'Main line')],
  lines: [
    line('Classical', 'e4 c6 d4 d5 Nc3 dxe4 Nxe4'),
    line('Advance', 'e4 c6 d4 d5 e5'),
    line('Exchange', 'e4 c6 d4 d5 exd5 cxd5'),
  ],
  tree: [
    tree('e4 c6', [
      tree('d4', [
        tree('d5', [tree('Nc3'), tree('e5'), tree('exd5')]),
      ]),
    ]),
  ],
});

// Caro-Kann variations
export const e4_c6_d4 = createVariation({
  id: 'e4_c6_d4',
  move: 'd4',
  name: 'd4',
  boardPgn: 'e4 c6 d4',
  intent: [
    'White builds the ideal center — e4 + d4 controls the key central squares',
    'Black\'s ...c6 prepared ...d5 to challenge this center, so the real battle starts next move',
  ],
  responses: [response('e4_c6_d4_d5', 'd5', 'Caro main')],
});
export const e4_c6_d4_d5 = createVariation({
  id: 'e4_c6_d4_d5',
  move: 'd5',
  name: 'Caro main',
  boardPgn: 'e4 c6 d4 d5',
  intent: [
    'The key Caro-Kann tabiya — Black challenges the e4 pawn with the c6-d5 pawn chain',
    'White must decide: defend e4 (Nc3), advance (e5), or exchange (exd5) — each gives a completely different game',
    'Unlike the French, Black\'s light-squared bishop stays free (it can go to f5 or g4)',
  ],
  responses: [
    response('e4_c6_d4_d5_nc3', 'Nc3', 'Classical'),
    response('e4_c6_d4_d5_e5', 'e5', 'Advance'),
    response('e4_c6_d4_d5_exd5', 'exd5', 'Exchange'),
  ],
});
export const e4_c6_d4_d5_nc3 = createVariation({
  id: 'e4_c6_d4_d5_nc3',
  move: 'Nc3',
  name: 'Caro-Kann Classical',
  boardPgn: 'e4 c6 d4 d5 Nc3 dxe4 Nxe4',
  intent: [
    'The Classical main line — after ...dxe4 Nxe4, the center opens and piece play takes over',
    'Black plays ...Bf5 (most popular, developing the "good" bishop) or ...Nd7 (more flexible)',
    'Leads to clear, structured positions where both sides have defined plans',
  ],
});
export const e4_c6_d4_d5_e5 = createVariation({
  id: 'e4_c6_d4_d5_e5',
  move: 'e5',
  name: 'Caro-Kann Advance',
  boardPgn: 'e4 c6 d4 d5 e5',
  intent: [
    'White grabs space with e5, creating a pawn chain similar to the French Advance',
    'Black typically plays ...Bf5 (keeping the bishop active) then ...c5 to undermine White\'s center',
    'More strategic than the Classical — both sides maneuver around the pawn chain',
  ],
});
export const e4_c6_d4_d5_exd5 = createVariation({
  id: 'e4_c6_d4_d5_exd5',
  move: 'exd5',
  name: 'Exchange Variation',
  boardPgn: 'e4 c6 d4 d5 exd5 cxd5',
  intent: [
    'Simplifies the center — leads to symmetrical pawn structures that can feel drawish',
    'White often tries to exploit the isolated d-pawn or play for a minority attack on the queenside',
    'Considered less ambitious, but can surprise opponents who expect the main line fight',
  ],
});

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
  famousPlayers: ['Bobby Fischer', 'Garry Kasparov', 'Mikhail Tal', 'Magnus Carlsen', 'Hikaru Nakamura'],
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
    response('e4_d5', 'd5', 'Scandinavian Defense'),
    response('e4_nf6', 'Nf6', "Alekhine's Defense"),
    response('e4_d6', 'd6', 'Pirc Defense'),
  ],
  lines: [
    line('Open Sicilian', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4'),
    line('Ruy Lopez', 'e4 e5 Nf3 Nc6 Bb5'),
    line('French Classical', 'e4 e6 d4 d5 Nc3'),
    line('Caro-Kann Classical', 'e4 c6 d4 d5 Nc3'),
    line('Scandinavian', 'e4 d5 exd5 Qxd5'),
    line("Alekhine's Defense", 'e4 Nf6 e5 Nd5'),
    line('Pirc Defense', 'e4 d6 d4 Nf6 Nc3 g6'),
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
      tree('d5 (Scandinavian)', [tree('exd5', [tree('Qxd5'), tree('Nf6')])]),
      tree("Nf6 (Alekhine's)", [tree('e5', [tree('Nd5')])]),
      tree('d6 (Pirc)', [tree('d4 Nf6 Nc3 g6')]),
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
  famousPlayers: ['Garry Kasparov', 'Bobby Fischer', 'Magnus Carlsen', 'Fabiano Caruana', 'Hikaru Nakamura', 'Levy Rozman'],
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
  responses: [
    response('e4_c5_nf3_d6_d4_nf6', 'Nf6', 'Sicilian Nf6'),
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
  famousPlayers: ['Evgeny Sveshnikov', 'Sergei Tiviakov', 'Magnus Carlsen', 'Hikaru Nakamura'],
  famousGames: [
    game(
      'Sveshnikov vs Adorjan, 1981',
      'Sveshnikov — the opening\'s modern pioneer — demonstrates the Alapin\'s rich strategic potential in a classic positional squeeze.'
    ),
    game(
      'Tiviakov vs Leko, 2007',
      'Tiviakov, one of the all-time Alapin specialists, converts a long technical advantage in a model endgame.'
    ),
  ],
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
  famousPlayers: ['Mikhail Botvinnik', 'Magnus Carlsen', 'Hikaru Nakamura', 'Daniel Naroditsky'],
  famousGames: [
    game(
      'Botvinnik vs Reshevsky, 1948',
      'Botvinnik uses the Closed Sicilian setup in the World Championship tournament, converting a methodical kingside attack.'
    ),
    game(
      'Carlsen vs Radjabov, 2008',
      'A young Magnus Carlsen demonstrates the Closed Sicilian\'s attacking ideas with a masterful f4-f5 kingside assault.'
    ),
  ],
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
  famousPlayers: ['Paul Morphy', 'Viswanathan Anand', 'Magnus Carlsen', 'Fabiano Caruana', 'Daniel Naroditsky'],
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
    response('e4_e5_nc3', 'Nc3', 'Vienna Game'),
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
    response('e4_e5_nf3_nc6_d4', 'd4', 'Scotch Game'),
    response('e4_e5_nf3_nc6_nc3', 'Nc3', 'Four Knights'),
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
  famousPlayers: ['Bobby Fischer', 'Garry Kasparov', 'Magnus Carlsen', 'Anatoly Karpov', 'Daniel Naroditsky', 'Hikaru Nakamura'],
  famousGames: [
    game(
      'Fischer vs Spassky, 1972 World Championship Game 3',
      "Fischer's stunning strategic masterpiece in the Ruy Lopez — considered one of the greatest games ever played and a turning point in the match."
    ),
    game(
      'Kasparov vs Karpov, 1986 World Championship Game 16',
      "A legendary Ruy Lopez battle from Kasparov and Karpov's five-match series — Kasparov's attacking genius overwhelming Karpov's defense."
    ),
  ],
  responses: [
    response('e4_e5_nf3_nc6_bb5_a6', 'a6', 'Morphy Defense'),
    response('e4_e5_nf3_nc6_bb5_nf6', 'Nf6', 'Berlin Defense'),
  ],
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
  famousPlayers: ['Paul Morphy', 'Mikhail Tal', 'Fabiano Caruana', 'Levy Rozman', 'Hikaru Nakamura'],
  famousGames: [
    game(
      'Morphy vs Duke Karl & Count Isouard, 1858 (The Opera Game)',
      "Morphy's most famous miniature — a perfect lesson in development and sacrifice. He gave up both rooks to deliver a brilliant checkmate in 17 moves."
    ),
    game(
      'Carlsen vs Caruana, Stavanger 2015',
      "A razor-sharp modern Italian — Magnus Carlsen proving the opening's relevance at the absolute highest level with a clinical attacking win."
    ),
  ],
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
  famousPlayers: ['Fabiano Caruana', 'Sergey Karjakin', 'Magnus Carlsen', 'Daniel Naroditsky'],
  famousGames: [
    game(
      'Carlsen vs Caruana, 2018 World Championship',
      "Carlsen used the Petrov throughout the 12-game classical match — the ultimate proof of its solidity. The match ended 6-6 before Carlsen won the rapids."
    ),
    game(
      'Karjakin vs Anand, Candidates 2016',
      "Karjakin's precise Petrov endgame technique — extracting a win from a theoretically equal position through patient maneuvering."
    ),
  ],
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
  famousPlayers: ['Adolf Anderssen', 'Boris Spassky', 'Bobby Fischer', 'Hikaru Nakamura', 'Eric Rosen'],
  famousGames: [
    game(
      'Anderssen vs Kieseritzky, 1851',
      '"The Immortal Game" — Anderssen sacrifices both rooks and a queen in the King\'s Gambit to deliver a brilliant checkmate. Possibly the most famous game ever played.'
    ),
    game(
      'Spassky vs Bronstein, 1960',
      'A virtuosic King\'s Gambit attacking display — Spassky launches a devastating kingside assault that became a template for attacking chess.'
    ),
  ],
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
  famousPlayers: ['Viktor Korchnoi', 'Wolfgang Uhlmann', 'Ding Liren', 'Levy Rozman', 'Daniel Naroditsky'],
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
  famousPlayers: ['Anatoly Karpov', 'Viswanathan Anand', 'Fabiano Caruana', 'Alireza Firouzja', 'Alexandra Botez'],
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

// ============================================================================
// RUY LOPEZ — DEPTH NODES (6th level)
// ============================================================================

export const e4_e5_nf3_nc6_bb5_a6 = createVariation({
  id: 'e4_e5_nf3_nc6_bb5_a6',
  move: 'a6',
  name: 'Morphy Defense',
  boardPgn: 'e4 e5 Nf3 Nc6 Bb5 a6',
  intent: [
    'The most popular response — forces White to clarify the bishop\'s intentions',
    'a6 says: "Are you going to take on c6? If not, where is the bishop going?"',
    'White almost always retreats to Ba4, keeping the pin alive; if Bxc6 dxc6, Black gets the bishop pair',
    'This is the gateway to the richest and most deeply studied lines in chess: the Open Ruy Lopez, the Closed Lopez, and the Marshall',
  ],
  responses: [
    response('e4_e5_nf3_nc6_bb5_a6_ba4', 'Ba4', 'Ruy Lopez Ba4'),
  ],
});

export const e4_e5_nf3_nc6_bb5_a6_ba4 = createVariation({
  id: 'e4_e5_nf3_nc6_bb5_a6_ba4',
  move: 'Ba4',
  name: 'Ruy Lopez Ba4',
  boardPgn: 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4',
  intent: [
    'White keeps the bishop active — Ba4 maintains the pin on the knight without conceding the bishop pair',
    'Black\'s most common reply is ...Nf6, developing and attacking e4',
    'After Nf6 O-O, the game branches: ...Be7 (Closed Lopez), ...b5 Bb3 d6 (Classical), or eventually ...d5 (Marshall Attack)',
    'White plans to build a solid center with c3 and d4 — the Ruy Lopez is a long positional battle',
  ],
  responses: [
    response('e4_e5_nf3_nc6_bb5_a6_ba4_nf6', 'Nf6', 'Ruy Lopez Nf6'),
  ],
});

export const e4_e5_nf3_nc6_bb5_a6_ba4_nf6 = createVariation({
  id: 'e4_e5_nf3_nc6_bb5_a6_ba4_nf6',
  move: 'Nf6',
  name: 'Ruy Lopez Nf6',
  boardPgn: 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6',
  intent: [
    'The principled response — Black develops and counterattacks e4',
    'White almost always castles (O-O) next, getting the king to safety before the center opens',
    'After O-O, Black must decide: the safe ...Be7 (Closed Lopez), the ambitious ...b5 Bb3 O-O (preparing Marshall), or ...Nxe4?! (risky open Lopez)',
    'Daniel Naroditsky calls this one of the most instructive positions in chess — understanding White\'s buildup (c3, d4) and Black\'s counterplay (...d5 break) teaches you how to play chess',
  ],
});

export const e4_e5_nf3_nc6_bb5_nf6 = createVariation({
  id: 'e4_e5_nf3_nc6_bb5_nf6',
  move: 'Nf6',
  name: 'Berlin Defense',
  boardPgn: 'e4 e5 Nf3 Nc6 Bb5 Nf6',
  intent: [
    'The Berlin Defense — the ultimate drawing weapon at the top level',
    'Nf6 attacks e4 and prepares ...Nxe4 after White castles — leading to a famous endgame known as the "Berlin Wall"',
    'After O-O Nxe4 d4 Nd6 Bxc6 dxc6 dxe5 Nf5, Black has an endgame with doubled c-pawns but long-term fortifying potential',
    'Magnus Carlsen used the Berlin to neutralize Fabiano Caruana\'s attacking ambitions — it\'s the most solid defense against 1.e4',
  ],
  responses: [
    response('e4_e5_nf3_nc6_bb5_nf6_oo', 'O-O', 'Berlin main'),
  ],
});

export const e4_e5_nf3_nc6_bb5_nf6_oo = createVariation({
  id: 'e4_e5_nf3_nc6_bb5_nf6_oo',
  move: 'O-O',
  name: 'Berlin main',
  boardPgn: 'e4 e5 Nf3 Nc6 Bb5 Nf6 O-O',
  intent: [
    'White castles — getting the king safe before committing to a plan against Black\'s Berlin',
    'Now ...Nxe4 is the critical move — Black grabs the pawn, entering the famous Berlin endgame',
    'After Nxe4 d4 Nd6 Bxc6 dxc6 dxe5 Nf5, Black has tripled (well, doubled) c-pawns but an incredibly resilient position',
    'This endgame has been studied to extreme depth — it\'s roughly equal but Black has to be precise for many moves',
  ],
});

// ============================================================================
// SCOTCH GAME (e4 e5 Nf3 Nc6 d4)
// ============================================================================

export const e4_e5_nf3_nc6_d4 = createOpening({
  id: 'e4_e5_nf3_nc6_d4',
  move: 'd4',
  name: 'Scotch Game',
  boardPgn: 'e4 e5 Nf3 Nc6 d4',
  intent: [
    'Open the center immediately on move 3 — no slow buildup like the Ruy Lopez',
    'After exd4 Nxd4, White has rapid piece activity and a strong central knight',
    'Less theory than Spanish or Italian — understanding beats memorization',
  ],
  principleApplications: [
    principle('center', 'Opens the center on move 3 — an immediate fight for the d4 square.'),
    principle('spaceTempo', 'White gains a central pawn break early and active piece play in return.'),
    principle('development', 'After Nxd4, White is well developed and can continue with Nc3, Be3, etc.'),
  ],
  whyThisMove:
    "The Scotch Game is a direct, no-nonsense approach. Instead of building pressure slowly with Bb5 or Bc4, White rips open the center on move 3 with d4. After exd4 Nxd4, the game immediately becomes tactical and active. Garry Kasparov revived the Scotch in the 1990s and used it to demolish Karpov repeatedly — showing it's far from the quiet, old-fashioned system some thought it was. For players who want an open fight without the deep Ruy Lopez theory, the Scotch is a fantastic choice.",
  strategicThemes: [
    'Immediate central confrontation — no delay',
    'White gets active piece play after Nxd4',
    'Nxd4 Nf6 Nc3 leads to Scotch Four Knights or Scotch Game main lines',
    'Black can try 4...Bc5 (Classical), 4...Nf6 (energetic), or 4...Qh4 (Tricky but risky)',
  ],
  threats: [
    'After exd4 Nxd4, White\'s knight is powerfully centralized',
    'Nxd4 sets up Nc3 and Be3 for fast development with initiative',
    'The Göring Gambit (c3) is a pawn sacrifice variant for aggressive players',
  ],
  traps: [
    trap(
      'Scotch Gambit Trap',
      'After exd4, White can play c3 (Göring Gambit) — sacrificing a pawn for rapid development and a dangerous attack.',
      'e4 e5 Nf3 Nc6 d4 exd4 c3'
    ),
  ],
  prosAndCons: {
    pros: [
      'Direct and active — no slow buildup required',
      'Less memorization than Ruy Lopez main lines',
      'Kasparov proved it works at the very highest level',
      'Rich middlegame positions with genuine winning chances',
    ],
    cons: [
      'Black has solid equalizing options with ...Bc5 or ...Nf6',
      'After Nxd4, Black can simplify quickly with Nxd4 and equal play',
      'Requires understanding of the resulting open positions',
    ],
  },
  famousPlayers: ['Garry Kasparov', 'Magnus Carlsen', 'Jan Krzysztof Duda', 'Daniel Naroditsky'],
  famousGames: [
    game(
      'Kasparov vs Karpov, 1990',
      'Kasparov\'s Scotch revival — used the opening to score decisive wins in their World Championship rematches.'
    ),
  ],
  responses: [
    response('e4_e5_nf3_nc6_d4_exd4', 'exd4', 'Main line'),
  ],
  lines: [
    line('Classical Scotch', 'e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5'),
    line('Scotch Four Knights', 'e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3'),
    line('Göring Gambit', 'e4 e5 Nf3 Nc6 d4 exd4 c3'),
  ],
  tree: [
    tree('e4 e5 Nf3 Nc6 d4', [
      tree('exd4', [
        tree('Nxd4', [tree('Bc5 (Classical)'), tree('Nf6 Nc3 (Four Knights)')]),
        tree('c3 (Göring Gambit)'),
      ]),
    ]),
  ],
});

export const e4_e5_nf3_nc6_d4_exd4 = createVariation({
  id: 'e4_e5_nf3_nc6_d4_exd4',
  move: 'exd4',
  name: 'Scotch main',
  boardPgn: 'e4 e5 Nf3 Nc6 d4 exd4',
  intent: [
    'The critical move — Black takes the pawn, opening the center immediately',
    'White recaptures with Nxd4, getting a well-placed knight and active position',
    'Black\'s choices now define the character of the game: Bc5 (Classical), Nf6 (energetic), or Qh4 (risky)',
    'This is the most common reply — both sides enter sharp, tactical positions where understanding matters more than memory',
  ],
  responses: [
    response('e4_e5_nf3_nc6_d4_exd4_nxd4', 'Nxd4', 'Scotch Nxd4'),
  ],
});

export const e4_e5_nf3_nc6_d4_exd4_nxd4 = createVariation({
  id: 'e4_e5_nf3_nc6_d4_exd4_nxd4',
  move: 'Nxd4',
  name: 'Scotch Nxd4',
  boardPgn: 'e4 e5 Nf3 Nc6 d4 exd4 Nxd4',
  intent: [
    'White recaptures with the knight — centralized powerfully on d4',
    'Black\'s main options: ...Bc5 (Classical, attacks the knight), ...Nf6 (energetic, attacks e4), ...Qh4 (provocative but risky)',
    'After ...Bc5, White can play c3 (solid), Be3 (attacking), or Nb3 (retreating to keep the knight safe)',
    'The Scotch main line is rich with ideas — both sides can fight for the initiative',
  ],
});

// ============================================================================
// FOUR KNIGHTS GAME (e4 e5 Nf3 Nc6 Nc3)
// ============================================================================

export const e4_e5_nf3_nc6_nc3 = createOpening({
  id: 'e4_e5_nf3_nc6_nc3',
  move: 'Nc3',
  name: 'Four Knights Game',
  boardPgn: 'e4 e5 Nf3 Nc6 Nc3',
  intent: [
    'Develop all four knights in the first few moves — classical and natural',
    'After ...Nf6, all four knights are on the board — symmetrical and solid',
    'A good choice if you want solid, principled play without sharp theoretical battles',
  ],
  principleApplications: [
    principle('development', 'Pure rapid development — all four knights are deployed naturally.'),
    principle('center', 'Pieces control the center without pawn commitments — flexible and sound.'),
    principle('kingSafety', 'Both sides castle kingside early — safe setups on both sides of the board.'),
  ],
  whyThisMove:
    "The Four Knights is chess at its most principled. White plays Nc3 to develop a second piece and reinforce the center. After the natural ...Nf6, all four knights are on the board — each one on its best square. From here, both sides castle kingside and a strategic middlegame unfolds. While it doesn't create immediate fireworks, the Four Knights is solid, well-understood, and can lead to creative positions. The Halloween Gambit (Nxe5!??) is an explosive piece sacrifice that turns the calm into chaos instantly.",
  strategicThemes: [
    'All four pieces developed naturally — ideal structure for a solid middlegame',
    'Spanish Four Knights (Bb5) gives White the most realistic advantage attempt',
    'Italian Four Knights (Bc4) leads to sharp tactical play',
    'Halloween Gambit (Nxe5!?) sacrifices a knight for three pawns and initiative',
  ],
  threats: [
    'White can follow with Bb5 (Spanish Four Knights) for long-term pressure',
    'Bc4 targets f7 directly in the Italian Four Knights',
    'd4 push creates immediate central tension',
  ],
  traps: [
    trap(
      'Halloween Gambit',
      'After Nc6 Nf6 Nc3, White can sacrifice with Nxe5!? — giving up a piece for three pawns and chaos.',
      'e4 e5 Nf3 Nc6 Nc3 Nf6 Nxe5'
    ),
  ],
  prosAndCons: {
    pros: [
      'Natural and easy to learn — all moves make sense',
      'Leads to rich middlegames from a solid foundation',
      'Excellent for understanding classical chess principles',
    ],
    cons: [
      'Drawish tendencies in the symmetric lines',
      'Black has solid equalizing options',
      'Less initiative for White than Ruy Lopez or Italian',
    ],
  },
  famousPlayers: ['Frank Marshall', 'Mikhail Chigorin', 'Levon Aronian'],
  famousGames: [
    game(
      'Chigorin vs Burn, 1905',
      'Chigorin uses the Four Knights to build a fierce kingside attack — a fine example of the opening\'s aggressive potential.'
    ),
    game(
      'Aronian vs Grischuk, 2009',
      'Aronian demonstrates the Spanish Four Knights variation at the top level, turning a principled opening into a creative masterpiece.'
    ),
  ],
  responses: [
    response('e4_e5_nf3_nc6_nc3_nf6', 'Nf6', 'Four Knights main'),
  ],
  lines: [
    line('Spanish Four Knights', 'e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5'),
    line('Italian Four Knights', 'e4 e5 Nf3 Nc6 Nc3 Nf6 Bc4'),
    line('Halloween Gambit', 'e4 e5 Nf3 Nc6 Nc3 Nf6 Nxe5'),
  ],
  tree: [
    tree('e4 e5 Nf3 Nc6 Nc3', [
      tree('Nf6', [
        tree('Bb5 (Spanish Four Knights)'),
        tree('Bc4 (Italian Four Knights)'),
        tree('Nxe5 (Halloween Gambit)'),
      ]),
    ]),
  ],
});

export const e4_e5_nf3_nc6_nc3_nf6 = createVariation({
  id: 'e4_e5_nf3_nc6_nc3_nf6',
  move: 'Nf6',
  name: 'Four Knights main',
  boardPgn: 'e4 e5 Nf3 Nc6 Nc3 Nf6',
  intent: [
    'Black completes the four knights setup — all four knights are now on their ideal squares',
    'White chooses the character of the game: Bb5 (Spanish, positional), Bc4 (Italian, tactical), or Nxe5 (Halloween, chaotic)',
    'This is one of the most principled positions in chess — naturally developed pieces on both sides',
    'Castling short is normal for both sides; the middlegame will be determined by White\'s third piece move',
  ],
});

// ============================================================================
// VIENNA GAME (e4 e5 Nc3)
// ============================================================================

export const e4_e5_nc3 = createOpening({
  id: 'e4_e5_nc3',
  move: 'Nc3',
  name: 'Vienna Game',
  boardPgn: 'e4 e5 Nc3',
  intent: [
    'Flexible and aggressive — Nc3 supports e4 and prepares f4 (Vienna Gambit)',
    'Can transpose to a delayed King\'s Gambit or Italian-like setups',
    'Eric Rosen\'s signature opening — source of many famous tactical finishes',
  ],
  principleApplications: [
    principle('development', 'Nc3 develops a piece naturally while reinforcing e4.'),
    principle('center', 'Keeps e4 firmly defended while preparing the central push f4 or d4.'),
    principle('planning', 'Maximum flexibility — White can steer into gambit or positional play based on Black\'s response.'),
  ],
  whyThisMove:
    "The Vienna Game is more cunning than it looks. Nc3 reinforces e4 while keeping every option open — White can follow up with f4 (Vienna Gambit, a King's Gambit cousin), Bc4 (entering Italian-like positions), or d3 for a slow positional game. Eric Rosen has made the Vienna famous at the amateur and streamer level with brilliant attacking games. The opening is especially tricky because many e4 e5 Nf3 players aren't prepared for the Nc3 move order. The Vienna Gambit (f4) is the sharpest and most aggressive continuation — perfect for players who want to set the tempo immediately.",
  strategicThemes: [
    'f4 push creates a King\'s Gambit-like attack — open f-file and active play',
    'Bc4 can lead to Vienna-Italian hybrid positions targeting f7',
    'Flexibility — White reveals their plan based on how Black responds',
    'The Vienna trap (Oh No My Queen!) catches many unprepared opponents',
  ],
  threats: [
    'f4 threatens to open the f-file and gain central space (Vienna Gambit)',
    'Bc4 combined with Nd5 can create tactical threats on f7',
    'Vienna Gambit after f4 exf4 Nf3 targets the center with d4',
  ],
  traps: [
    trap(
      '"Oh No My Queen!" Trap',
      'After Nc3 Nf6 Bc4 Nxe4??, White plays Bxf7+! Kxf7 Qd5+ forking king and knight — winning the piece back with interest.',
      'e4 e5 Nc3 Nf6 Bc4 Nxe4 Bxf7+'
    ),
  ],
  prosAndCons: {
    pros: [
      'Flexible — adapts to Black\'s response',
      'Surprise value against players who know only Nf3 lines',
      'Vienna Gambit is explosive and fun to play',
      'Eric Rosen has made it fashionable and well-documented at all levels',
    ],
    cons: [
      'Black has solid options with ...Nf6 or ...Bc5',
      'If White plays too slowly, Black equalizes comfortably',
      'Less central pressure than Nf3 on move 2',
    ],
  },
  famousPlayers: ['Wilhelm Steinitz', 'Eric Rosen', 'Hikaru Nakamura'],
  famousGames: [
    game(
      'Steinitz vs Anderssen, 1873',
      'Steinitz — the Vienna\'s greatest early champion — defeats the legendary Anderssen with a model demonstration of its attacking ideas.'
    ),
    game(
      'Rosen vs IM Bartholomew, 2021',
      'Eric Rosen\'s "Oh No My Queen!" moment — perhaps the most-watched Vienna Game trap in chess streaming history, introducing millions to the opening.'
    ),
  ],
  responses: [
    response('e4_e5_nc3_nf6', 'Nf6', 'Vienna Nf6'),
    response('e4_e5_nc3_bc5', 'Bc5', 'Vienna Bc5'),
  ],
  lines: [
    line('Vienna Gambit', 'e4 e5 Nc3 Nf6 f4 d5 fxe5'),
    line('Vienna-Italian', 'e4 e5 Nc3 Bc5 Bc4 Nf6 d3'),
    line('Frankenstein-Dracula', 'e4 e5 Nc3 Nf6 Bc4 Nxe4 Qh5'),
  ],
  tree: [
    tree('e4 e5 Nc3', [
      tree('Nf6', [tree('f4 (Vienna Gambit)'), tree('Bc4 (Vienna-Italian)')]),
      tree('Bc5', [tree('Bc4 — mirror Italian'), tree('f4 — gambit try')]),
    ]),
  ],
});

export const e4_e5_nc3_nf6 = createVariation({
  id: 'e4_e5_nc3_nf6',
  move: 'Nf6',
  name: 'Vienna Nf6',
  boardPgn: 'e4 e5 Nc3 Nf6',
  intent: [
    'The most principled response — Black attacks e4 and develops',
    'Now White must show their hand: f4 (Vienna Gambit, aggressive), Bc4 (Vienna-Italian, tactical), or d3 (quiet)',
    'After f4, Black plays d5 — fighting back immediately in the center: "If you want to gambit, I\'ll counter-gambit!"',
    'Eric Rosen loves f4 here — after exf4?? Nd5!, Black loses the queen to a fork: the infamous "Oh No My Queen!" moment',
  ],
  responses: [
    response('e4_e5_nc3_nf6_f4', 'f4', 'Vienna Gambit'),
  ],
});

export const e4_e5_nc3_nf6_f4 = createVariation({
  id: 'e4_e5_nc3_nf6_f4',
  move: 'f4',
  name: 'Vienna Gambit',
  boardPgn: 'e4 e5 Nc3 Nf6 f4',
  intent: [
    'The Vienna Gambit — White pushes f4 aggressively, threatening to gain central space with fxe5',
    'Black\'s best response is d5! — fighting back in the center rather than taking on f4',
    'After d5 fxe5 Nxe4, Black has a strong central knight and active play — balanced but sharp',
    'If Black plays passively (like exf4?), White gets a King\'s Gambit-like setup with a huge center',
  ],
});

export const e4_e5_nc3_bc5 = createVariation({
  id: 'e4_e5_nc3_bc5',
  move: 'Bc5',
  name: 'Vienna Bc5',
  boardPgn: 'e4 e5 Nc3 Bc5',
  intent: [
    'Black develops the bishop actively, aiming at f2 and contesting the center indirectly',
    'White typically replies Bc4, creating an Italian-like mirror structure with both bishops eyeing the center',
    'These positions are rich and strategic — less violent than the Vienna Gambit, more about piece play',
    'The Vienna-Italian hybrid can transpose into many different systems — excellent for players who know Italian structures',
  ],
});

// ============================================================================
// SICILIAN — NAJDORF, DRAGON, SCHEVENINGEN (dedicated nodes)
// ============================================================================

export const e4_c5_nf3_d6_d4_nf6 = createVariation({
  id: 'e4_c5_nf3_d6_d4_nf6',
  move: 'Nf6',
  name: 'Sicilian Nf6',
  boardPgn: 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6',
  intent: [
    'The most popular reply — Black develops the knight actively and attacks the e4 pawn',
    'Now White almost always plays Nc3 to defend e4 and develop, reaching the key Sicilian crossroads',
    'After Nc3, Black\'s choice of system defines the entire game: Najdorf (a6), Dragon (g6), or Scheveningen (e6)',
    'This is one of the most studied positions in all of chess — immense theory on every branch',
  ],
  responses: [
    response('e4_c5_nf3_d6_d4_nf6_nc3', 'Nc3', 'Sicilian Nc3'),
  ],
});

export const e4_c5_nf3_d6_d4_nf6_nc3 = createVariation({
  id: 'e4_c5_nf3_d6_d4_nf6_nc3',
  move: 'Nc3',
  name: 'Sicilian Nc3',
  boardPgn: 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3',
  intent: [
    'White defends e4 with Nc3 — the most natural developing move, reaching the main Sicilian fork',
    'This is the defining moment: Black now selects their Sicilian weapon',
    'a6 = Najdorf (aggressive, flexible, theory-heavy); g6 = Dragon (fianchetto, uncompromising); e6 = Scheveningen (solid, flexible)',
    'Each system has a fundamentally different character — understanding why you choose one is more important than memorizing all three',
  ],
  responses: [
    response('e4_c5_nf3_d6_d4_nf6_nc3_a6', 'a6', 'Najdorf'),
    response('e4_c5_nf3_d6_d4_nf6_nc3_g6', 'g6', 'Dragon'),
    response('e4_c5_nf3_d6_d4_nf6_nc3_e6', 'e6', 'Scheveningen'),
  ],
});

export const e4_c5_nf3_d6_d4_nf6_nc3_a6 = createOpening({
  id: 'e4_c5_nf3_d6_d4_nf6_nc3_a6',
  move: 'a6',
  name: 'Sicilian Najdorf',
  boardPgn: 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6',
  intent: [
    'The most ambitious and theory-heavy Sicilian — a6 is deceptively flexible',
    'Prevents Bb5+ and immediately prepares queenside expansion with b5',
    'Keeps every door open: Black hasn\'t committed to any structure yet',
  ],
  principleApplications: [
    principle('planning', 'a6 is a multi-purpose move — prevents Bb5, prepares b5, and delays any structural commitment.'),
    principle('spaceTempo', 'Black stakes out queenside space while allowing White to choose their attacking setup.'),
    principle('center', 'Black challenges White\'s center indirectly — the c-file and d5 square are the long-term battleground.'),
  ],
  whyThisMove:
    "Bobby Fischer called the Najdorf the best Sicilian. Garry Kasparov played it for his entire career. The move a6 seems passive but it's the most cunning move in the position — it prevents Bb5+, prepares ...b5-b4 to kick White's knight, and keeps all of Black's options open simultaneously. White can try the English Attack (Be3, f3, Qd2, g4-g5), the Classical (Bc4), or the older Be2 systems. Each requires different preparation. The Najdorf is the ultimate chess arms race.",
  strategicThemes: [
    'Queenside expansion with b5-b4 is Black\'s main plan',
    'English Attack (Be3, f3, Qd2, g4) is White\'s most dangerous setup',
    'Black counterattacks on the queenside while defending the kingside',
    'Incredibly deep theory — some lines are analyzed 25+ moves deep by engines',
  ],
  threats: [
    'White typically attacks on the kingside (g4, h4, g5)',
    'The English Attack (f3, Be3, Qd2, g4) is the most dangerous line',
    'If Black is not precise, White\'s attack arrives much faster than Black\'s counterplay',
  ],
  traps: [
    trap(
      'Poisoned Pawn Variation',
      'After Be3, Black can take the b2 pawn with Qxb2 — incredibly risky but analyzed for decades.',
      'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qb6 Qd2 Qxb2'
    ),
  ],
  prosAndCons: {
    pros: [
      'Maximum flexibility — a6 doesn\'t commit to any structure',
      'The most popular and deeply studied Sicilian at the top level',
      'Queenside counterplay with b5-b4 is powerful',
      'Beloved by Fischer, Kasparov, Nakamura, Rozman, and many others',
    ],
    cons: [
      'Requires enormous theoretical knowledge to play safely',
      'White has many dangerous attacking systems',
      'Easy to go wrong in the early middlegame if unprepared',
    ],
  },
  famousPlayers: ['Bobby Fischer', 'Garry Kasparov', 'Hikaru Nakamura', 'Levy Rozman', 'Fabiano Caruana'],
  famousGames: [
    game(
      'Kasparov vs Anand, 1995 PCA World Championship',
      'A definitive Najdorf battle — Kasparov defended the Najdorf against some of the deepest preparation ever seen.'
    ),
  ],
  lines: [
    line('English Attack', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nb3 Be6 f3 Be7 Qd2 O-O g4'),
    line('Bg5 (Classical)', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4'),
    line('Be2 (Quiet)', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3'),
  ],
  tree: [
    tree('e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6', [
      tree('Be3 (English Attack)', [tree('e5 Nb3 Be6 f3')]),
      tree('Bg5 (Classical)', [tree('e6 f4')]),
      tree('Be2 (Quiet system)'),
    ]),
  ],
});

export const e4_c5_nf3_d6_d4_nf6_nc3_g6 = createOpening({
  id: 'e4_c5_nf3_d6_d4_nf6_nc3_g6',
  move: 'g6',
  name: 'Sicilian Dragon',
  boardPgn: 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6',
  intent: [
    'Fianchetto the bishop to g7 — the legendary Dragon diagonal',
    'Black aims for dynamic counterplay with the Bg7 battery down the long diagonal',
    'One of the most sharp and committal systems in chess — no going back once you fianchetto',
  ],
  principleApplications: [
    principle('planning', 'g6 commits to a fianchetto setup — Black\'s entire strategy centers on the Bg7 "Dragon" bishop.'),
    principle('kingSafety', 'Opposite castling (White O-O-O, Black O-O) creates mutual king attacks — whoever gets there first wins.'),
    principle('spaceTempo', 'Black\'s queenside counterplay (c-file pressure, Rc8) races against White\'s kingside attack.'),
  ],
  whyThisMove:
    "The Dragon is one of the most exciting and committal openings in chess. By fianchettoing the bishop to g7, Black creates the 'Dragon' — a bishop on the long diagonal that breathes fire toward White's queenside. White's main answer is the Yugoslav Attack (Bc4, Be3, Qd2, O-O-O, then g4-h4-h5), launching a direct assault on Black's king. Black simultaneously attacks down the c-file and the long diagonal. It's a race with no brake pedal — pure chess warfare.",
  strategicThemes: [
    'Bg7 on the long diagonal is Black\'s key piece — protect it at all costs',
    'Opposite castling creates mutual attacks: White attacks g7, Black targets d4 and c2',
    'Yugoslav Attack (Bc4, Qd2, O-O-O, g4) is the sharpest and most critical line',
    'The Dragon is a battle of who gets there first — tempo is everything',
  ],
  threats: [
    'White\'s Yugoslav Attack (g4-h4-h5) is a direct assault on Black\'s kingside',
    'If Black doesn\'t counterattack fast enough, the h-file opens dangerously',
    'Sac on h6 (Bxh6) is a standard attacking idea to remove the Dragon bishop\'s protection',
  ],
  traps: [
    trap(
      'Dragon Sac on h6',
      'White sacrifices the bishop on h6 to remove the pawn cover from Black\'s kingside, opening lines for the attack.',
      'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 O-O Bc4 Nc6 Qd2 Bd7 O-O-O Rc8 Bxh6'
    ),
  ],
  prosAndCons: {
    pros: [
      'Incredibly dynamic — Black has real winning chances from the start',
      'The Dragon bishop on g7 can dominate the entire board',
      'Counter-attacking possibilities are enormous',
    ],
    cons: [
      'The Yugoslav Attack is brutally dangerous if Black doesn\'t know the theory',
      'One wrong move on the kingside can be immediately fatal',
      'Requires fearless, precise play — not for the faint-hearted',
    ],
  },
  famousPlayers: ['Mikhail Tal', 'Garry Kasparov', 'Gata Kamsky', 'Hikaru Nakamura'],
  famousGames: [
    game(
      'Tal vs Smyslov, 1959 Candidates',
      'Mikhail Tal\'s Dragon attacks were legendary for their ferocity and creativity.'
    ),
  ],
  lines: [
    line('Yugoslav Attack', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 O-O Bc4 Nc6 Qd2 Bd7 O-O-O'),
    line('Classical Dragon', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 O-O Nc6'),
  ],
  tree: [
    tree('e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6', [
      tree('Be3 Bg7 f3 O-O Bc4 Nc6 Qd2 (Yugoslav)', [tree('Bd7 O-O-O')]),
      tree('Be2 Bg7 O-O Nc6 (Classical)'),
    ]),
  ],
});

export const e4_c5_nf3_d6_d4_nf6_nc3_e6 = createOpening({
  id: 'e4_c5_nf3_d6_d4_nf6_nc3_e6',
  move: 'e6',
  name: 'Sicilian Scheveningen',
  boardPgn: 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 e6',
  intent: [
    'Build a small but resilient center with d6 and e6 — the "Scheveningen pawn structure"',
    'Maximum flexibility: Black can transpose to Najdorf (with ...a6), Hedgehog, or keep the Scheveningen structure',
    'Solid and sophisticated — Kasparov and Karpov both used this from opposite sides',
  ],
  principleApplications: [
    principle('pawnStructure', 'The "small center" (d6+e6) is the defining feature — extremely hard to break and very resilient.'),
    principle('planning', 'Black\'s plan is to develop harmoniously (Be7, O-O) then expand on the queenside with a6-b5.'),
    principle('center', 'By not playing e5 or d5 yet, Black keeps maximum flexibility — both breaks remain available.'),
  ],
  whyThisMove:
    "The Scheveningen is the Sicilian for sophisticated, flexible players. The pawns on d6 and e6 form a solid fortress — the 'small center' — that gives Black an incredibly resilient structure. Unlike the Dragon or Najdorf, the Scheveningen doesn't commit to a single dramatic plan right away. Black develops naturally (Be7, O-O) and then expands with a6 and b5. Karpov used this against Kasparov in their championship matches, and Kasparov used it against Karpov too — it suits both attacking and defending styles.",
  strategicThemes: [
    'Small center (d6+e6) — solid and flexible, hard to attack directly',
    'Queenside expansion with a6-b5 is Black\'s standard plan',
    'Keres Attack (g4 immediately) is White\'s most aggressive try',
    'Can transpose to Najdorf by adding ...a6, or Hedgehog structures with ...b6',
  ],
  threats: [
    'The Keres Attack (f4, g4 early) tries to attack before Black consolidates',
    'White often plays Be2, O-O with a slow kingside buildup',
    'If Black is passive, White can build a large space advantage on both wings',
  ],
  prosAndCons: {
    pros: [
      'Extremely flexible — can transpose to many Sicilian systems',
      'Rock solid pawn structure — very hard to crack',
      'Works for both attacking and defensive styles',
    ],
    cons: [
      'The Keres Attack (g4!) is sharply aggressive and requires specific knowledge',
      'Less forcing than the Najdorf or Dragon — White has many setups',
      'Can feel passive if Black doesn\'t activate the pieces correctly',
    ],
  },
  famousPlayers: ['Anatoly Karpov', 'Garry Kasparov', 'Magnus Carlsen', 'Fabiano Caruana'],
  famousGames: [
    game(
      'Karpov vs Kasparov, 1984-85 World Championship',
      'Both players used the Scheveningen from both sides in their landmark championship battles.'
    ),
  ],
  lines: [
    line('Keres Attack', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 e6 g4'),
    line('English Attack', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 e6 Be3 a6 f3 b5'),
    line('Classical', 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 e6 Be2 Be7 O-O'),
  ],
  tree: [
    tree('e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 e6', [
      tree('g4 (Keres Attack)', [tree('h6 — sidestep'), tree('Nc6 — brave')]),
      tree('Be3 a6 f3 (English Attack)'),
      tree('Be2 Be7 O-O (Classical)'),
    ]),
  ],
});

// ============================================================================
// SCANDINAVIAN DEFENSE (e4 d5)
// ============================================================================

export const e4_d5 = createOpening({
  id: 'e4_d5',
  move: 'd5',
  name: 'Scandinavian Defense',
  boardPgn: 'e4 d5',
  intent: [
    'Immediately challenge White\'s center — the most direct response to e4',
    'After exd5, Black can recapture with the queen (active) or knight (solid)',
    'A practical choice that sidesteps the massive theory of the Sicilian and French',
  ],
  principleApplications: [
    principle('center', 'Directly challenges the e4 pawn — forcing White to commit to an exchange or let d5 stand.'),
    principle('development', 'After Qxd5, the queen develops but must retreat — a tempo cost that defines the opening\'s character.'),
    principle('planning', 'Black\'s plan is solid: develop naturally, get the queen to a safe square, and equalize quickly.'),
  ],
  whyThisMove:
    "The Scandinavian is one of chess's oldest openings and one of its most direct — Black immediately strikes at e4 with the d-pawn. After exd5, most beginners take with the queen (Qxd5) — this is playable but the queen has to retreat after Nc3, losing a tempo. The modern move is Nf6 (the Modern Scandinavian), developing a piece and delaying the pawn recapture. Both lines are legitimate and have been played at the top level.",
  strategicThemes: [
    'Simplify the center early — no massive pawn battles',
    'Qd8-d6 is a solid queen retreat plan (avoids Qd8-d5-d8 harassment)',
    'Black\'s plan is pragmatic: equalize, then look for counterplay',
    'Less theoretical than the Sicilian — good for practical players',
  ],
  threats: [
    'White can develop quickly with Nc3 and Nf3, gaining free development',
    'After Qxd5 Nc3, White gains a tempo chasing the queen',
    'White often gets a slight space advantage with Nf3, d4, Bd3, O-O',
  ],
  traps: [
    trap(
      'Fool\'s Mate via Scandinavian',
      'After exd5 Qxd5 Nc3 Qa5?! d4 e5? dxe5 Bc5? Qd5! wins material — Black\'s queen is overloaded.',
      'e4 d5 exd5 Qxd5 Nc3 Qa5 d4 e5 dxe5 Bc5 Qd5'
    ),
  ],
  prosAndCons: {
    pros: [
      'Cuts through theory — easy to learn and play',
      'Forces early simplification of the center',
      'Strong at club level — many opponents are unprepared',
    ],
    cons: [
      'Queen can be harassed after Qxd5 Nc3 — tempo loss',
      'White gets free development and a space advantage',
      'Black is often slightly passive in the resulting positions',
    ],
  },
  famousPlayers: ['Bent Larsen', 'Magnus Carlsen', 'Hikaru Nakamura', 'Anish Giri', 'Levy Rozman'],
  famousGames: [
    game(
      'Carlsen vs Giri, 2015',
      'Giri plays the Scandinavian against Carlsen — a high-level demonstration of how solid the opening can be even against the World Champion.'
    ),
    game(
      'Nakamura vs Bronznik, 2003',
      'A young Nakamura scores a brilliant attacking win from a Scandinavian, showing the opening\'s hidden tactical potential.'
    ),
  ],
  responses: [
    response('e4_d5_exd5', 'exd5', 'Main line'),
  ],
  lines: [
    line('Classical (Qxd5)', 'e4 d5 exd5 Qxd5 Nc3 Qa5'),
    line('Modern (Nf6)', 'e4 d5 exd5 Nf6 d4 Nxd5'),
    line('Icelandic Gambit', 'e4 d5 exd5 Nf6 c4 e6'),
  ],
  tree: [
    tree('e4 d5', [
      tree('exd5', [
        tree('Qxd5 (Classical)', [tree('Nc3 Qa5 — solid retreat')]),
        tree('Nf6 (Modern)', [tree('d4 Nxd5')]),
      ]),
    ]),
  ],
});

export const e4_d5_exd5 = createVariation({
  id: 'e4_d5_exd5',
  move: 'exd5',
  name: 'Scandinavian main',
  boardPgn: 'e4 d5 exd5',
  intent: [
    'White captures — the only consistent move; declining with d3 or e5 would be passive or unusual',
    'Now Black must decide: Qxd5 (classical, active but tempo-losing) or Nf6 (modern, piece-first)',
    'The Qxd5 line has been played since the 1400s; Nf6 is the modern preference at the top level',
    'After Qxd5 Nc3, Black\'s queen must retreat — Qa5 (main), Qd8 (safe but passive), or Qd6 (central but slightly risky)',
  ],
  responses: [
    response('e4_d5_exd5_qxd5', 'Qxd5', 'Classical'),
    response('e4_d5_exd5_nf6', 'Nf6', 'Modern'),
  ],
});

export const e4_d5_exd5_qxd5 = createVariation({
  id: 'e4_d5_exd5_qxd5',
  move: 'Qxd5',
  name: 'Scandinavian Classical',
  boardPgn: 'e4 d5 exd5 Qxd5',
  intent: [
    'Recapture with the queen — active but White gains a tempo with Nc3, forcing the queen to move again',
    'Black\'s best retreat: Qa5 (the main move — keeps the queen active and eyes the c7/e5 squares)',
    'Qd8 (passive but safe) or Qd6 (central but risky — the bishop on c4 can target it) are alternatives',
    'White gets free development after Nc3 — this tempo advantage is the main "cost" of the Classical Scandinavian',
  ],
});

export const e4_d5_exd5_nf6 = createVariation({
  id: 'e4_d5_exd5_nf6',
  move: 'Nf6',
  name: 'Modern Scandinavian',
  boardPgn: 'e4 d5 exd5 Nf6',
  intent: [
    'Modern approach — develop a piece and recapture the pawn later with ...Nxd5',
    'White can try to hold the pawn with c4, but this creates queenside weaknesses',
    'After d4 Nxd5, Black has a solid, symmetrical pawn structure with the "Scandinavian Sicilian" feel',
    'This is the preferred move of modern grandmasters — avoids the tempo-losing queen excursion',
  ],
});

// ============================================================================
// ALEKHINE'S DEFENSE (e4 Nf6)
// ============================================================================

export const e4_nf6 = createOpening({
  id: 'e4_nf6',
  move: 'Nf6',
  name: "Alekhine's Defense",
  boardPgn: 'e4 Nf6',
  intent: [
    'Provoke White\'s pawns forward — the knight attacks e4, forcing it to advance',
    'After e5 Nd5, White usually pushes further: d4, c4 — building a big center that can be overextended',
    'The hypermodern strategy: let White have the center, then attack it systematically',
  ],
  principleApplications: [
    principle('center', 'Black deliberately provokes White into building a large pawn center to attack it later.'),
    principle('spaceTempo', 'White gains space with e5, d4, c4 — but each pawn advance can become a weakness under pressure.'),
    principle('planning', 'Black\'s plan is systematic deconstruction: c5, d6, and Nc6 to pressure the overextended center.'),
  ],
  whyThisMove:
    "Alekhine's Defense is one of the most provocative openings in chess. Named after World Champion Alexander Alekhine, Nf6 directly attacks e4 — daring White to push forward with e5. After e5 Nd5, White typically plays d4 and c4, building a massive pawn center. Black's plan is then to show that this center is overextended and can be attacked with c5, d6, and Nc6. It requires confidence and counter-attacking ability — this isn't an opening for passive players.",
  strategicThemes: [
    'Lure White\'s pawns forward into potentially weak positions',
    'Attack the center with c5, d6, Nc6 — systematic deconstruction',
    'Knight on d5 becomes a powerful outpost or forces White into commitments',
    'Counter-attack is the primary weapon — avoid passivity',
  ],
  threats: [
    'White gains huge central space with e5, d4, c4 — development advantage',
    'Four Pawns Attack (e5 d4 c4 Nf3 f4) is White\'s most aggressive option',
    'Exchange Variation (e5 Nd5 d4 d6 c4 Nb6 exd6) simplifies to a slight White advantage',
  ],
  traps: [
    trap(
      'Two Pawns Attack Trap',
      'In the Four Pawns Attack, after e5 Nd5 d4 d6 c4 Nb6 f4 dxe5 fxe5 Nc6 Nf3 Bg4?!, Bb5! wins immediately.',
      'e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 f4 dxe5 fxe5 Nc6 Nf3 Bg4 Bb5'
    ),
  ],
  prosAndCons: {
    pros: [
      'Surprise value — few players prepare for it',
      'Rich, original positions with complex counter-play',
      'Forces White out of their normal e4 setup',
    ],
    cons: [
      'White gets a big center and can be very comfortable',
      'Black must play accurately to prove the center is weak',
      'Four Pawns Attack is dangerous if Black doesn\'t know the theory',
    ],
  },
  famousPlayers: ['Alexander Alekhine', 'Lev Alburt', 'Hikaru Nakamura', 'Baadur Jobava'],
  famousGames: [
    game(
      'Steiner vs Alekhine, 1921',
      'Alekhine himself demonstrates his namesake defense with devastating counter-attacking play — the game that put the opening on the map.'
    ),
    game(
      'Miles vs Karpov, 1980',
      'Tony Miles plays the provocative 1...a5!? but the principles of Alekhine\'s — luring forward and attacking — are the same. A legendary upset of the World Champion.'
    ),
  ],
  responses: [
    response('e4_nf6_e5', 'e5', 'Main line'),
  ],
  lines: [
    line('Exchange Variation', 'e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 exd6'),
    line('Four Pawns Attack', 'e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 f4'),
    line('Modern Variation', 'e4 Nf6 e5 Nd5 d4 d6 Nf3'),
  ],
  tree: [
    tree('e4 Nf6', [
      tree('e5', [
        tree('Nd5', [
          tree('d4 d6 c4 Nb6', [
            tree('f4 (Four Pawns Attack)'),
            tree('exd6 (Exchange)'),
            tree('Nf3 (Modern)'),
          ]),
        ]),
      ]),
    ]),
  ],
});

export const e4_nf6_e5 = createVariation({
  id: 'e4_nf6_e5',
  move: 'e5',
  name: "Alekhine's main",
  boardPgn: 'e4 Nf6 e5',
  intent: [
    'White takes the bait — e5 chases the knight and gains central space',
    'The knight must move: Nd5 is by far the best square (Ng8 retreating is too passive)',
    'White now builds a center with d4 and c4 — the battle begins over whether this center is a strength or weakness',
    'This is the only principled response — anything else concedes Black easy equality',
  ],
  responses: [
    response('e4_nf6_e5_nd5', 'Nd5', 'Nd5 — main'),
  ],
});

export const e4_nf6_e5_nd5 = createVariation({
  id: 'e4_nf6_e5_nd5',
  move: 'Nd5',
  name: "Alekhine's — Nd5",
  boardPgn: 'e4 Nf6 e5 Nd5',
  intent: [
    'Knight retreats to its best square — d5 is a powerful central outpost',
    'White almost always plays d4 to claim more central space, which is what Alekhine\'s Defense invites',
    'After d4, Black plays d6 — striking at the overextended e5 pawn to begin White\'s center deconstruction',
    'Black\'s goal: prove that White\'s pawns on e5, d4, and c4 are overextended and vulnerable to attack',
  ],
});

// ============================================================================
// PIRC DEFENSE (e4 d6 d4 Nf6 Nc3 g6)
// ============================================================================

export const e4_d6 = createVariation({
  id: 'e4_d6',
  move: 'd6',
  name: 'Pirc / Modern',
  boardPgn: 'e4 d6',
  intent: [
    'A flexible start — d6 prepares Nf6 while keeping the option of the Pirc or Modern Defense',
    'White almost always plays d4, claiming the center — Black\'s response defines the opening',
    'If Black plays Nf6 + g6, the game enters the Pirc; if Black plays Nf6 + e5, it\'s the Philidor Defense',
  ],
  responses: [
    response('e4_d6_d4', 'd4', 'Pirc/Philidor'),
  ],
});

export const e4_d6_d4 = createVariation({
  id: 'e4_d6_d4',
  move: 'd4',
  name: 'Pirc/Philidor main',
  boardPgn: 'e4 d6 d4',
  intent: [
    'White builds an ideal center with e4 + d4 — the position Black must now decide how to fight',
    'Nf6 is the principled response — developing a piece and putting pressure on e4',
    'After Nc3, Black can choose: g6 (Pirc — hypermodern fianchetto) or e5 (Philidor — solid central fight)',
  ],
  responses: [
    response('e4_d6_d4_nf6', 'Nf6', 'Main development'),
  ],
});

export const e4_d6_d4_nf6 = createVariation({
  id: 'e4_d6_d4_nf6',
  move: 'Nf6',
  name: 'Pirc Nf6',
  boardPgn: 'e4 d6 d4 Nf6',
  intent: [
    'Black develops naturally — Nf6 attacks e4 and stakes a claim in the center',
    'White plays Nc3 to reinforce e4; Black then chooses their system',
    'After Nc3, g6 signals the Pirc (fianchetto bishop to g7); Nbd7 signals the Philidor',
  ],
  responses: [
    response('e4_d6_d4_nf6_nc3', 'Nc3', 'Pirc main'),
  ],
});

export const e4_d6_d4_nf6_nc3 = createVariation({
  id: 'e4_d6_d4_nf6_nc3',
  move: 'Nc3',
  name: 'Pirc main',
  boardPgn: 'e4 d6 d4 Nf6 Nc3',
  intent: [
    'White reinforces e4 with the knight — the gateway to the main Pirc Defense tabiya',
    'Black plays g6 — signaling the Pirc: fianchetto the dark-squared bishop to g7',
    'After g6, White must choose how to respond: Austrian Attack (f4), Classical (Be2), or 150 Attack (Be3 Qd2 Bh6)',
  ],
  responses: [
    response('e4_d6_d4_nf6_nc3_g6', 'g6', 'Pirc Defense'),
  ],
});

export const e4_d6_d4_nf6_nc3_g6 = createOpening({
  id: 'e4_d6_d4_nf6_nc3_g6',
  move: 'g6',
  name: 'Pirc Defense',
  boardPgn: 'e4 d6 d4 Nf6 Nc3 g6',
  intent: [
    'The Pirc is committed — Black will fianchetto Bg7 and let White have the center',
    'The hypermodern plan: Bg7 pressures d4, and Black waits for the right moment to strike with e5 or c5',
    'White can go aggressive (Austrian Attack with f4) or solid (Classical with Be2)',
  ],
  principleApplications: [
    principle('center', 'Let White build the center — Black\'s fianchetto will put pressure on it from the flank.'),
    principle('development', 'Bg7 on the long diagonal is a powerful piece that influences both d4 and the kingside.'),
    principle('planning', 'Counter-attack with e5 or c5 at exactly the right moment to blow up White\'s center.'),
    principle('kingSafety', 'Early castling kingside with a compact setup — the fianchettoed bishop protects the king throughout.'),
  ],
  whyThisMove:
    "g6 signals the Pirc Defense — one of chess's most flexible and resilient systems. Black plans to fianchetto the bishop to g7, where it will apply pressure along the long diagonal to d4. White gets a large pawn center (e4 + d4), but Black's strategy is patience: let the center be built, then attack it at exactly the right moment with e5 or c5. The Austrian Attack (f4-f5) is White's most dangerous weapon — the Pirc requires Black to be comfortable in positions where White is actively attacking.",
  strategicThemes: [
    'Bg7 creates long-term pressure on the d4-e5 central structure',
    'Counter-punch with e5 or c5 when the center is ready to be attacked',
    'Austrian Attack (f4-f5) — White creates a powerful kingside storm',
    'Classical system (Be2) — a solid, maneuvering game with slow buildup',
  ],
  threats: [
    'Austrian Attack (f4) can be dangerous — White builds a direct kingside assault',
    '150 Attack (Be3 Qd2 Bh6) tries to trade off Black\'s "good" bishop on g7',
    'White\'s strong pawn center can become oppressive if Black is too passive',
  ],
  traps: [
    trap(
      'Austrian Attack Quick Attack',
      'After f4 Bg7 Nf3 O-O Be2 c5 d5, White can play e5! dxe5 fxe5 Nfd7 e6! with a decisive attack.',
      'e4 d6 d4 Nf6 Nc3 g6 f4 Bg7 Nf3 O-O Be2 c5 d5 e5'
    ),
  ],
  prosAndCons: {
    pros: [
      'Flexible — Black can adapt the plan based on White\'s setup',
      'Rich counter-attacking chances — never boring',
      'Good at club level where opponents may not know the Austrian Attack theory',
    ],
    cons: [
      'White gets a very comfortable center with many attacking plans',
      'Passive play leads to being squeezed — requires active counter-play',
      'Austrian Attack (f4-f5) can be difficult to handle without preparation',
    ],
  },
  famousPlayers: ['Vasily Smyslov', 'Leonid Stein', 'Hikaru Nakamura', 'Magnus Carlsen'],
  famousGames: [
    game(
      'Fischer vs Gheorghiu, 1970',
      'Bobby Fischer uses the Austrian Attack to crush the Pirc in spectacular fashion — a warning to all Black players about the f4-f5 attack.'
    ),
    game(
      'Carlsen vs Giri, 2019',
      'Magnus Carlsen outmaneuvers Giri from a Pirc Defense structure — a model of how to handle the complex middlegame positions that arise.'
    ),
  ],
  responses: [
    response('e4_d6_d4_nf6_nc3_g6_bg7', 'Bg7', 'Pirc fianchetto'),
  ],
  lines: [
    line('Austrian Attack', 'e4 d6 d4 Nf6 Nc3 g6 f4 Bg7 Nf3 O-O'),
    line('Classical', 'e4 d6 d4 Nf6 Nc3 g6 Be2 Bg7 Nf3 O-O'),
    line('150 Attack', 'e4 d6 d4 Nf6 Nc3 g6 Be3 Bg7 Qd2 Nc6 Bh6'),
  ],
  tree: [
    tree('e4 d6 d4 Nf6 Nc3 g6', [
      tree('Bg7', [
        tree('Nf3 O-O', [
          tree('f4 (Austrian Attack)'),
          tree('Be2 (Classical)'),
          tree('Be3 Qd2 Bh6 (150 Attack)'),
        ]),
      ]),
    ]),
  ],
});

export const e4_d6_d4_nf6_nc3_g6_bg7 = createVariation({
  id: 'e4_d6_d4_nf6_nc3_g6_bg7',
  move: 'Bg7',
  name: 'Pirc fianchetto',
  boardPgn: 'e4 d6 d4 Nf6 Nc3 g6 Bg7',
  intent: [
    'The defining Pirc move — the bishop takes up its post on g7, raking the long diagonal',
    'White now reveals their plan: f4 (Austrian Attack), Be2 (Classical), or Be3 (150 Attack)',
    'Black should castle kingside next, then decide between ...c5 and ...e5 counter-attacks based on White\'s setup',
    'The bishop on g7 is a long-term weapon — it will influence play throughout the entire game',
  ],
});

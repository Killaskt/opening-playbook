import { OpeningNode } from '../types';
import { createOpening, createVariation, response, tree, line, trap, game, arrow, principle } from './builders';

// ============================================================================
// WHITE'S FIRST MOVES
// ============================================================================

const e4 = createOpening({
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

const d4 = createOpening({
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

const c4 = createOpening({
  id: 'c4',
  move: 'c4',
  name: 'English Opening',
  boardPgn: 'c4',
  intent: [
    'Flexible opening controlling d5 from the side',
    'Avoid main-line theory while keeping options open',
    'Can transpose to many different structures',
  ],
  boardArrows: [
    arrow('c4', 'd5'),
    arrow('c4', 'b5'),
  ],
  principleApplications: [
    principle('center', 'Controls d5 from the flank — a hypermodern approach to the center.'),
    principle('planning', 'Keeps maximum flexibility; White can adapt the plan based on Black\'s response.'),
    principle('spaceTempo', 'Claims queenside space and keeps options for multiple pawn structures.'),
  ],
  whyThisMove:
    "The English is a hypermodern choice — instead of occupying the center with a pawn, White controls the d5 square from the flank. It's incredibly flexible: depending on how Black responds, it can morph into a Sicilian with colors reversed, transpose into a Queen's Gambit, or become a uniquely English structure. If you like keeping your opponent guessing and adapting your play to what they do, the English is a fantastic weapon.",
  strategicThemes: [
    'Flank control of the center rather than direct occupation',
    'Extreme flexibility — can transpose to many systems',
    'Often leads to fianchetto setups with g3 and Bg2',
    'Positional squeeze and slow buildup',
  ],
  threats: [
    'White can quickly follow with Nc3 and g3 for a strong fianchetto',
    'The c4 pawn controls d5, making it hard for Black to establish a d5 pawn',
    'Can transpose to favorable Queen\'s Gambit lines with a later d4',
  ],
  traps: [
    trap(
      'Reversed Sicilian Trap',
      'If Black plays e5, White gets a Sicilian position with an extra tempo — a subtle but meaningful advantage.'
    ),
  ],
  prosAndCons: {
    pros: [
      'Very flexible — adapts to Black\'s play',
      'Less memorized theory than e4 or d4',
      'Surprise value against players who prepare mainly for e4/d4',
      'Rich strategic positions',
    ],
    cons: [
      'Slower development — no immediate threats',
      'Black has many comfortable setups',
      'Can feel aimless without a plan',
    ],
  },
  famousPlayers: ['Mikhail Botvinnik', 'Garry Kasparov', 'Magnus Carlsen', 'Hikaru Nakamura'],
  famousGames: [
    game(
      'Botvinnik vs Capablanca, 1938',
      'A legendary game where Botvinnik used the English to build a crushing kingside attack.'
    ),
  ],
  responses: [
    response('c4_e5', 'e5', 'Reversed Sicilian'),
    response('c4_c5', 'c5', 'Symmetrical English'),
  ],
  lines: [
    line('Reversed Sicilian', 'c4 e5 Nc3 Nf6 Nf3'),
    line('Symmetrical', 'c4 c5 Nc3 Nc6 g3'),
    line('English into QG', 'c4 Nf6 Nc3 e6 e4'),
  ],
  tree: [
    tree('c4', [
      tree('e5', [tree('Nc3', [tree('Nf6')])]),
      tree('c5', [tree('Nc3', [tree('Nc6')])]),
    ]),
  ],
});

const nf3 = createOpening({
  id: 'nf3',
  move: 'Nf3',
  name: 'Réti Opening',
  boardPgn: 'Nf3',
  intent: [
    'Develop a piece while keeping maximum flexibility',
    'Control the center from afar (hypermodern approach)',
    "Can transpose to many openings based on Black's response",
  ],
  principleApplications: [
    principle('development', 'Develops a knight to its best square on the very first move.'),
    principle('center', 'Controls e5 and d4 without committing any pawns.'),
    principle('planning', 'Maximum flexibility — White can steer into any system depending on Black\'s reply.'),
  ],
  whyThisMove:
    "Nf3 develops a knight to its best square while keeping every option open. White doesn't commit to any pawn structure yet — they can later play d4, c4, g3, e4, or even b3 depending on what Black does. It's the ultimate \"let's see what you do\" move, favored by players who like to react and adapt rather than force the game into a specific direction.",
  strategicThemes: [
    'Maximum flexibility — no pawn structure commitment',
    'Controls e5 and d4 squares',
    'Often leads to fianchetto setups',
    'Hypermodern philosophy: control center with pieces first',
  ],
  threats: [
    'No immediate threats — the strength is in flexibility',
    'White can steer into virtually any opening system',
    'Black cannot easily prepare a specific line',
  ],
  prosAndCons: {
    pros: [
      'Incredibly flexible — adapts to any Black setup',
      'Avoids opponent\'s specific preparation',
      'Develops a piece on a natural square',
      'Can transpose into favorable lines',
    ],
    cons: [
      'No immediate central pressure',
      'Gives Black freedom to choose the type of game',
      'Requires broad opening knowledge to use well',
    ],
  },
  famousPlayers: ['Richard Réti', 'Vladimir Kramnik', 'Levon Aronian'],
  responses: [
    response('nf3_d5', 'd5', 'Réti Proper'),
    response('nf3_nf6', 'Nf6', 'Double Fianchetto'),
  ],
  lines: [
    line('Réti with c4', 'Nf3 d5 c4 d4 e3'),
    line('Réti Fianchetto', 'Nf3 Nf6 c4 g6 g3'),
    line('Réti with g3', 'Nf3 d5 g3 c6 Bg2'),
  ],
  tree: [
    tree('Nf3', [
      tree('d5', [tree('c4'), tree('g3')]),
      tree('Nf6', [tree('c4'), tree('g3')]),
    ]),
  ],
});

const b3 = createOpening({
  id: 'b3',
  move: 'b3',
  name: 'Larsen Opening',
  boardPgn: 'b3',
  intent: [
    'Fianchetto the queenside bishop immediately',
    'Avoid main-line theory entirely',
    'Surprise opponents and play for a positional game',
  ],
  principleApplications: [
    principle('development', 'Prepares to develop the bishop to b2, a powerful long diagonal.'),
    principle('planning', 'A creative, offbeat plan — avoid mainstream theory and create original positions.'),
  ],
  whyThisMove:
    "Named after the creative Danish grandmaster Bent Larsen, b3 immediately prepares to fianchetto the dark-squared bishop to b2, where it will rake across the long diagonal toward Black's kingside. It's an offbeat choice that says \"I'm not going to play your preparation — I'll create my own game.\" While not as theoretically rigorous as e4 or d4, it leads to rich, original positions.",
  strategicThemes: [
    'Long diagonal control with Bb2',
    'Pressure on the e5 and g7 squares',
    'Flexible pawn structure — can support e3, d3, or c4 later',
    'Original positions with less theory',
  ],
  threats: [
    'The fianchettoed bishop can become very powerful on the long diagonal',
    'If Black isn\'t careful, the bishop on b2 can target the kingside',
  ],
  prosAndCons: {
    pros: [
      'Surprise value — few opponents prepare for it',
      'Leads to original, uncharted positions',
      'The Bb2 bishop can be very strong',
    ],
    cons: [
      'Doesn\'t fight for the center immediately',
      'Black can seize central space freely',
      'Not considered fully equal at the highest level',
    ],
  },
  famousPlayers: ['Bent Larsen', 'Richard Rapport'],
  responses: [
    response('b3_e5', 'e5', 'Central Counter'),
    response('b3_d5', 'd5', 'Solid Center'),
  ],
  lines: [
    line('With e5', 'b3 e5 Bb2 Nc6 e3'),
    line('With d5', 'b3 d5 Bb2 Nf6 Nf3'),
  ],
  tree: [
    tree('b3', [
      tree('e5', [tree('Bb2', [tree('Nc6')])]),
      tree('d5', [tree('Bb2', [tree('Nf6')])]),
    ]),
  ],
});

// ============================================================================
// BLACK RESPONSES TO e4
// ============================================================================

const e4_c5 = createOpening({
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
const e4_c5_nf3 = createVariation({
  id: 'e4_c5_nf3',
  move: 'Nf3',
  name: 'Open Sicilian',
  boardPgn: 'e4 c5 Nf3',
  intent: ['Main line — open center with d4 next'],
  responses: [
    response('e4_c5_nf3_d6', 'd6', 'Najdorf / Dragon'),
    response('e4_c5_nf3_nc6', 'Nc6', 'Accelerated Dragon'),
  ],
});
const e4_c5_nf3_d6 = createVariation({
  id: 'e4_c5_nf3_d6',
  move: 'd6',
  name: 'Najdorf / Dragon setup',
  boardPgn: 'e4 c5 Nf3 d6',
  intent: ['Most popular Sicilian — leads to Najdorf, Dragon, Scheveningen'],
  responses: [response('e4_c5_nf3_d6_d4', 'd4', 'Open Sicilian main')],
});
const e4_c5_nf3_d6_d4 = createVariation({
  id: 'e4_c5_nf3_d6_d4',
  move: 'd4',
  name: 'Open Sicilian main',
  boardPgn: 'e4 c5 Nf3 d6 d4 cxd4 Nxd4',
  intent: ['Critical position — Nf6, Nf6 a6 (Najdorf), g6 (Dragon)'],
});
const e4_c5_nf3_nc6 = createVariation({
  id: 'e4_c5_nf3_nc6',
  move: 'Nc6',
  name: 'Accelerated Dragon',
  boardPgn: 'e4 c5 Nf3 Nc6',
  intent: ['Flexible — can transpose to Classical or Accelerated Dragon'],
});
const e4_c5_c3 = createVariation({
  id: 'e4_c5_c3',
  move: 'c3',
  name: 'Alapin Sicilian',
  boardPgn: 'e4 c5 c3',
  intent: ['Anti-Sicilian — solid, less theory'],
});
const e4_c5_nc3 = createVariation({
  id: 'e4_c5_nc3',
  move: 'Nc3',
  name: 'Closed Sicilian',
  boardPgn: 'e4 c5 Nc3',
  intent: ['Slow, strategic — fianchetto or d3 systems'],
});

const e4_e5 = createOpening({
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
const e4_e5_nf3 = createVariation({
  id: 'e4_e5_nf3',
  move: 'Nf3',
  name: 'Knight to f3',
  boardPgn: 'e4 e5 Nf3',
  intent: ['Main continuation — Ruy Lopez, Italian, or Petrov'],
  responses: [
    response('e4_e5_nf3_nc6', 'Nc6', 'Spanish / Italian'),
    response('e4_e5_nf3_nf6', 'Nf6', 'Petrov Defense'),
  ],
});
const e4_e5_nf3_nc6 = createVariation({
  id: 'e4_e5_nf3_nc6',
  move: 'Nc6',
  name: 'Spanish / Italian',
  boardPgn: 'e4 e5 Nf3 Nc6',
  intent: ['Ruy Lopez (Bb5) or Italian (Bc4) next'],
  responses: [
    response('e4_e5_nf3_nc6_bb5', 'Bb5', 'Ruy Lopez'),
    response('e4_e5_nf3_nc6_bc4', 'Bc4', 'Italian Game'),
  ],
});
const e4_e5_nf3_nc6_bb5 = createVariation({
  id: 'e4_e5_nf3_nc6_bb5',
  move: 'Bb5',
  name: 'Ruy Lopez',
  boardPgn: 'e4 e5 Nf3 Nc6 Bb5',
  intent: ['The Spanish — pins Nc6, deep theory'],
});
const e4_e5_nf3_nc6_bc4 = createVariation({
  id: 'e4_e5_nf3_nc6_bc4',
  move: 'Bc4',
  name: 'Italian Game',
  boardPgn: 'e4 e5 Nf3 Nc6 Bc4',
  intent: ['Direct attack on f7 — Evans, Giuoco Piano'],
});
const e4_e5_nf3_nf6 = createVariation({
  id: 'e4_e5_nf3_nf6',
  move: 'Nf6',
  name: 'Petrov Defense',
  boardPgn: 'e4 e5 Nf3 Nf6',
  intent: ['Solid exchange — symmetrical, draws common'],
});
const e4_e5_f4 = createVariation({
  id: 'e4_e5_f4',
  move: 'f4',
  name: 'King\'s Gambit',
  boardPgn: 'e4 e5 f4',
  intent: ['Romantic — sacrifices f-pawn for attack'],
});

const e4_e6 = createOpening({
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
const e4_e6_d4 = createVariation({
  id: 'e4_e6_d4',
  move: 'd4',
  name: 'd4',
  boardPgn: 'e4 e6 d4',
  intent: ['Central pawn break'],
  responses: [response('e4_e6_d4_d5', 'd5', 'French main')],
});
const e4_e6_d4_d5 = createVariation({
  id: 'e4_e6_d4_d5',
  move: 'd5',
  name: 'French main',
  boardPgn: 'e4 e6 d4 d5',
  intent: ['Classical pawn structure'],
  responses: [
    response('e4_e6_d4_d5_nc3', 'Nc3', 'Classical'),
    response('e4_e6_d4_d5_nd2', 'Nd2', 'Tarrasch'),
    response('e4_e6_d4_d5_e5', 'e5', 'Advance'),
  ],
});
const e4_e6_d4_d5_nc3 = createVariation({
  id: 'e4_e6_d4_d5_nc3',
  move: 'Nc3',
  name: 'French Classical',
  boardPgn: 'e4 e6 d4 d5 Nc3',
  intent: ['Main line — Nf6 (Classical), Bb4 (Winawer)'],
});
const e4_e6_d4_d5_nd2 = createVariation({
  id: 'e4_e6_d4_d5_nd2',
  move: 'Nd2',
  name: 'Tarrasch',
  boardPgn: 'e4 e6 d4 d5 Nd2',
  intent: ['Avoids Winawer — solid, flexible'],
});
const e4_e6_d4_d5_e5 = createVariation({
  id: 'e4_e6_d4_d5_e5',
  move: 'e5',
  name: 'French Advance',
  boardPgn: 'e4 e6 d4 d5 e5',
  intent: ['Space advantage — Black breaks with c5'],
});

const e4_c6 = createOpening({
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
const e4_c6_d4 = createVariation({
  id: 'e4_c6_d4',
  move: 'd4',
  name: 'd4',
  boardPgn: 'e4 c6 d4',
  intent: ['Central claim'],
  responses: [response('e4_c6_d4_d5', 'd5', 'Caro main')],
});
const e4_c6_d4_d5 = createVariation({
  id: 'e4_c6_d4_d5',
  move: 'd5',
  name: 'Caro main',
  boardPgn: 'e4 c6 d4 d5',
  intent: ['Key tabiya'],
  responses: [
    response('e4_c6_d4_d5_nc3', 'Nc3', 'Classical'),
    response('e4_c6_d4_d5_e5', 'e5', 'Advance'),
    response('e4_c6_d4_d5_exd5', 'exd5', 'Exchange'),
  ],
});
const e4_c6_d4_d5_nc3 = createVariation({
  id: 'e4_c6_d4_d5_nc3',
  move: 'Nc3',
  name: 'Caro-Kann Classical',
  boardPgn: 'e4 c6 d4 d5 Nc3 dxe4 Nxe4',
  intent: ['Main line — Bf5 or Nd7'],
});
const e4_c6_d4_d5_e5 = createVariation({
  id: 'e4_c6_d4_d5_e5',
  move: 'e5',
  name: 'Caro-Kann Advance',
  boardPgn: 'e4 c6 d4 d5 e5',
  intent: ['Space — Black plays c5, Bf5'],
});
const e4_c6_d4_d5_exd5 = createVariation({
  id: 'e4_c6_d4_d5_exd5',
  move: 'exd5',
  name: 'Exchange Variation',
  boardPgn: 'e4 c6 d4 d5 exd5 cxd5',
  intent: ['Simplifies — isolated d-pawn positions'],
});

// ============================================================================
// BLACK RESPONSES TO d4
// ============================================================================

const d4_d5 = createOpening({
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

// d4 d5 needs c4 first - add intermediate
const d4_d5_c4 = createVariation({
  id: 'd4_d5_c4',
  move: 'c4',
  name: "Queen's Gambit",
  boardPgn: 'd4 d5 c4',
  intent: ['Gambit or development'],
  responses: [
    response('d4_d5_c4_e6', 'e6', 'QGD'),
    response('d4_d5_c4_c6', 'c6', 'Slav'),
    response('d4_d5_c4_dxc4', 'dxc4', 'QGA'),
  ],
});
const d4_d5_c4_e6 = createVariation({
  id: 'd4_d5_c4_e6',
  move: 'e6',
  name: "Queen's Gambit Declined",
  boardPgn: 'd4 d5 c4 e6',
  intent: ['Solid — Nc3, Nf3, or e3 next'],
});
const d4_d5_c4_c6 = createVariation({
  id: 'd4_d5_c4_c6',
  move: 'c6',
  name: 'Slav Defense',
  boardPgn: 'd4 d5 c4 c6',
  intent: ['Solid — avoids Bg5 pin, dxc4 possible'],
});
const d4_d5_c4_dxc4 = createVariation({
  id: 'd4_d5_c4_dxc4',
  move: 'dxc4',
  name: "Queen's Gambit Accepted",
  boardPgn: 'd4 d5 c4 dxc4',
  intent: ['Sharp — White regains pawn, Black develops'],
});

const d4_nf6 = createOpening({
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
const d4_nf6_c4 = createVariation({
  id: 'd4_nf6_c4',
  move: 'c4',
  name: 'c4',
  boardPgn: 'd4 Nf6 c4',
  intent: ['Broad center'],
  responses: [
    response('d4_nf6_c4_g6', 'g6', "King's Indian"),
    response('d4_nf6_c4_e6', 'e6', "Queen's Indian / Nimzo"),
  ],
});
const d4_nf6_c4_g6 = createVariation({
  id: 'd4_nf6_c4_g6',
  move: 'g6',
  name: "King's Indian",
  boardPgn: 'd4 Nf6 c4 g6',
  intent: ['Fianchetto — Nc3 Bg7 next'],
  responses: [response('d4_nf6_c4_g6_nc3', 'Nc3', 'KID main')],
});
const d4_nf6_c4_g6_nc3 = createVariation({
  id: 'd4_nf6_c4_g6_nc3',
  move: 'Nc3',
  name: "King's Indian main",
  boardPgn: 'd4 Nf6 c4 g6 Nc3 Bg7',
  intent: ['Bg7, d6 — kingside attack'],
});
const d4_nf6_c4_e6 = createVariation({
  id: 'd4_nf6_c4_e6',
  move: 'e6',
  name: "Queen's Indian / Nimzo",
  boardPgn: 'd4 Nf6 c4 e6',
  intent: ['Nf3 b6 (QID) or Nc3 Bb4 (Nimzo)'],
});

// ============================================================================
// BLACK RESPONSES TO c4
// ============================================================================

const c4_e5 = createOpening({
  id: 'c4_e5',
  move: 'e5',
  name: 'Reversed Sicilian',
  boardPgn: 'c4 e5',
  intent: [
    'Play a Sicilian structure with White having an extra tempo',
    'Active and ambitious',
  ],
  principleApplications: [
    principle('center', 'Grabs central space immediately with a pawn.'),
    principle('development', 'Opens the diagonal for Black\'s dark-squared bishop.'),
  ],
  whyThisMove:
    "By grabbing the center with e5, Black essentially gives White a reversed Sicilian — but since White already has an extra move, the positions can be tricky. Black gets a solid central foothold and active piece play.",
  strategicThemes: [
    'Central occupation with a pawn',
    'Active piece play for Black',
    'Reversed Sicilian pawn structures',
  ],
  prosAndCons: {
    pros: [
      'Active and straightforward for Black',
      'Solid central presence',
    ],
    cons: [
      'White has the extra tempo advantage',
      'Can transpose into positions where White is comfortable',
    ],
  },
  lines: [line('Main Line', 'c4 e5 Nc3 Nf6 Nf3 Nc6')],
  tree: [tree('c4 e5', [tree('Nc3', [tree('Nf6')])])],
});

const c4_c5 = createOpening({
  id: 'c4_c5',
  move: 'c5',
  name: 'Symmetrical English',
  boardPgn: 'c4 c5',
  intent: [
    "Mirror White's setup",
    'Balanced game with equal chances',
  ],
  principleApplications: [
    principle('center', 'Mirrors White\'s flank control — symmetrical pressure on d4 and d5.'),
    principle('pawnStructure', 'Symmetrical structure leads to balanced, positional play.'),
  ],
  whyThisMove:
    "Black mirrors White's flank approach, creating a symmetrical position. These games tend to be quiet and positional, with both sides maneuvering for small advantages. Fianchettoed bishops and careful piece play are the order of the day.",
  strategicThemes: [
    'Symmetrical pawn structure',
    'Fianchetto setups for both sides',
    'Positional maneuvering',
  ],
  prosAndCons: {
    pros: [
      'Safe and balanced for Black',
      'Equal chances from the start',
    ],
    cons: [
      'Can be quiet and somewhat drawish',
      'Requires good positional understanding',
    ],
  },
  lines: [line('Main Line', 'c4 c5 Nc3 Nc6 g3 g6')],
  tree: [tree('c4 c5', [tree('Nc3', [tree('Nc6')])])],
});

// ============================================================================
// BLACK RESPONSES TO Nf3
// ============================================================================

const nf3_d5 = createOpening({
  id: 'nf3_d5',
  move: 'd5',
  name: 'Réti Proper',
  boardPgn: 'Nf3 d5',
  intent: [
    'Occupy the center traditionally',
    'Force White to show their hand',
  ],
  principleApplications: [
    principle('center', 'Takes the direct approach — occupies the center with a pawn.'),
    principle('spaceTempo', 'Forces White to reveal their plans and commit to a structure.'),
  ],
  whyThisMove:
    "Against White's non-committal Nf3, Black takes the direct approach and grabs the center with a pawn. This forces White to reveal their plans — will they challenge with c4, fianchetto with g3, or go for something else entirely?",
  strategicThemes: [
    'Central occupation to counter hypermodern play',
    'Forces White to commit to a plan',
    'Can lead to many different pawn structures',
  ],
  prosAndCons: {
    pros: [
      'Direct and principled',
      'Controls the center immediately',
    ],
    cons: [
      'White can choose many different setups',
      'The d5 pawn may become a target after c4',
    ],
  },
  lines: [
    line('With c4', 'Nf3 d5 c4 d4 e3'),
    line('Fianchetto', 'Nf3 d5 g3 Nf6 Bg2'),
  ],
  tree: [tree('Nf3 d5', [tree('c4'), tree('g3')])],
});

const nf3_nf6 = createOpening({
  id: 'nf3_nf6',
  move: 'Nf6',
  name: 'Double Fianchetto',
  boardPgn: 'Nf3 Nf6',
  intent: [
    'Hypermodern mirror',
    'Flexible piece development',
  ],
  principleApplications: [
    principle('development', 'Develops a knight to a strong square, mirroring White\'s approach.'),
    principle('planning', 'Maximum flexibility — neither side reveals their pawn structure yet.'),
  ],
  whyThisMove:
    "Black mirrors White's hypermodern approach — developing a knight without committing to any pawn structure. Both sides keep maximum flexibility, and the game often evolves into dueling fianchetto setups where bishops on the long diagonals battle for control.",
  strategicThemes: [
    'Mutual flexibility — neither side commits early',
    'Fianchetto duels on the long diagonals',
    'Slow, maneuvering middlegames',
  ],
  prosAndCons: {
    pros: [
      'Maximum flexibility for Black',
      'Mirrors White\'s non-committal approach',
    ],
    cons: [
      'No immediate central fight',
      'Can be hard to generate winning chances',
    ],
  },
  lines: [line('Main Line', 'Nf3 Nf6 c4 g6 g3 Bg7')],
  tree: [tree('Nf3 Nf6', [tree('c4'), tree('g3')])],
});

// ============================================================================
// BLACK RESPONSES TO b3
// ============================================================================

const b3_e5 = createOpening({
  id: 'b3_e5',
  move: 'e5',
  name: 'Central Counter',
  boardPgn: 'b3 e5',
  intent: [
    'Seize the center immediately',
    'Challenge the fianchetto setup',
  ],
  principleApplications: [
    principle('center', 'If White won\'t take the center, Black will — e5 grabs space immediately.'),
    principle('spaceTempo', 'Uses the extra tempo of White\'s flank move to establish central dominance.'),
  ],
  whyThisMove:
    "Against Larsen's flank opening, Black grabs the center immediately. The idea is simple: if White isn't going to fight for the center directly, Black will take it! The e5 pawn controls d4 and f4, giving Black a strong presence.",
  strategicThemes: [
    'Central dominance against a flank opening',
    'Active piece development',
    'Use the space advantage while White fianchettoes',
  ],
  prosAndCons: {
    pros: [
      'Strong central presence',
      'Active and natural development',
    ],
    cons: [
      'The Bb2 bishop can pressure e5 from the flank',
      'Must not overextend in the center',
    ],
  },
  lines: [line('Main Line', 'b3 e5 Bb2 Nc6 e3 Nf6')],
  tree: [tree('b3 e5', [tree('Bb2', [tree('Nc6')])])],
});

const b3_d5 = createOpening({
  id: 'b3_d5',
  move: 'd5',
  name: 'Solid Center',
  boardPgn: 'b3 d5',
  intent: [
    'Establish a solid central presence',
    'Develop normally',
  ],
  principleApplications: [
    principle('center', 'Claims central space with the d-pawn — solid and reliable.'),
    principle('pawnStructure', 'Keeps a flexible pawn structure that can expand with ...e5 or ...c5 later.'),
  ],
  whyThisMove:
    "Another direct response to Larsen's opening — Black claims central space with the d-pawn. This is a more restrained approach than e5, keeping the position solid while developing naturally. Black plans to build a classical center and develop pieces harmoniously.",
  strategicThemes: [
    'Solid central control',
    'Normal, harmonious development',
    'Can expand with ...e5 or ...c5 later',
  ],
  prosAndCons: {
    pros: [
      'Solid and straightforward',
      'Good central control',
    ],
    cons: [
      'Less ambitious than e5',
      'White\'s Bb2 can be annoying on the long diagonal',
    ],
  },
  lines: [line('Main Line', 'b3 d5 Bb2 Nf6 Nf3 e6')],
  tree: [tree('b3 d5', [tree('Bb2', [tree('Nf6')])])],
});

// ============================================================================
// EXPORTS
// ============================================================================

export const nodesById: Record<string, OpeningNode> = {
  // White first moves
  e4,
  d4,
  c4,
  nf3,
  b3,
  // Black responses to e4
  e4_c5,
  e4_e5,
  e4_e6,
  e4_c6,
  // Sicilian variations
  e4_c5_nf3,
  e4_c5_nf3_d6,
  e4_c5_nf3_d6_d4,
  e4_c5_nf3_nc6,
  e4_c5_c3,
  e4_c5_nc3,
  // Open Games variations
  e4_e5_nf3,
  e4_e5_nf3_nc6,
  e4_e5_nf3_nc6_bb5,
  e4_e5_nf3_nc6_bc4,
  e4_e5_nf3_nf6,
  e4_e5_f4,
  // French variations
  e4_e6_d4,
  e4_e6_d4_d5,
  e4_e6_d4_d5_nc3,
  e4_e6_d4_d5_nd2,
  e4_e6_d4_d5_e5,
  // Caro-Kann variations
  e4_c6_d4,
  e4_c6_d4_d5,
  e4_c6_d4_d5_nc3,
  e4_c6_d4_d5_e5,
  e4_c6_d4_d5_exd5,
  // Black responses to d4
  d4_d5,
  d4_nf6,
  // Queen's Gambit / Indian variations
  d4_d5_c4,
  d4_d5_c4_e6,
  d4_d5_c4_c6,
  d4_d5_c4_dxc4,
  d4_nf6_c4,
  d4_nf6_c4_g6,
  d4_nf6_c4_g6_nc3,
  d4_nf6_c4_e6,
  // Black responses to c4
  c4_e5,
  c4_c5,
  // Black responses to Nf3
  nf3_d5,
  nf3_nf6,
  // Black responses to b3
  b3_e5,
  b3_d5,
};

// White's first moves shown on home screen
export const startMoves: OpeningNode[] = [e4, d4, c4, nf3, b3];

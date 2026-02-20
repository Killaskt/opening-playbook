import { createOpening, createVariation, response, tree, line, trap, game, arrow, principle } from '../builders';

// ============================================================================
// WHITE'S FIRST MOVE: c4 (English Opening)
// ============================================================================

export const c4 = createOpening({
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

// ============================================================================
// WHITE'S FIRST MOVE: Nf3 (Réti Opening)
// ============================================================================

export const nf3 = createOpening({
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
  famousPlayers: ['Richard Réti', 'Levon Aronian', 'Magnus Carlsen', 'Hikaru Nakamura'],
  famousGames: [
    game(
      'Réti vs Capablanca, 1924',
      'Réti defeats the reigning World Champion with his own opening — one of the great upsets in chess history and a landmark game for hypermodern theory.'
    ),
    game(
      'Aronian vs Anand, 2013 Candidates',
      'Aronian uses the Réti to outmaneuver Anand in a brilliant positional squeeze — a modern masterclass in the opening\'s strategic depth.'
    ),
  ],
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

// ============================================================================
// WHITE'S FIRST MOVE: b3 (Larsen Opening)
// ============================================================================

export const b3 = createOpening({
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
  famousGames: [
    game(
      'Spassky vs Larsen, 1970',
      'Larsen plays his namesake opening and defeats World Champion Boris Spassky — one of the most famous victories by the creative Danish grandmaster.'
    ),
    game(
      'Rapport vs Vidit, 2023',
      'Richard Rapport — the modern standard-bearer for 1.b3 — uses the Larsen to create a completely original strategic masterpiece at the top level.'
    ),
  ],
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
// BLACK RESPONSES TO c4
// ============================================================================

export const c4_e5 = createOpening({
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
  responses: [
    response('c4_e5_nc3', 'Nc3', 'Reversed Sicilian main'),
  ],
  lines: [line('Main Line', 'c4 e5 Nc3 Nf6 Nf3 Nc6')],
  tree: [tree('c4 e5', [tree('Nc3', [tree('Nf6')])])],
});

export const c4_c5 = createOpening({
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

export const nf3_d5 = createOpening({
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
  responses: [
    response('nf3_d5_c4', 'c4', 'Réti with c4'),
    response('nf3_d5_g3', 'g3', 'Réti Fianchetto'),
  ],
  lines: [
    line('With c4', 'Nf3 d5 c4 d4 e3'),
    line('Fianchetto', 'Nf3 d5 g3 Nf6 Bg2'),
  ],
  tree: [tree('Nf3 d5', [tree('c4'), tree('g3')])],
});

export const nf3_nf6 = createOpening({
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

export const b3_e5 = createOpening({
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

export const b3_d5 = createOpening({
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
// ENGLISH OPENING — DEPTH NODES (3rd–5th level)
// ============================================================================

export const c4_e5_nc3 = createVariation({
  id: 'c4_e5_nc3',
  move: 'Nc3',
  name: 'Reversed Sicilian main',
  boardPgn: 'c4 e5 Nc3',
  intent: [
    'The most natural follow-up — White develops the knight and eyes d5',
    'Black typically responds with ...Nf6 (active) or ...Nc6 (solid) — both lead to rich Reversed Sicilian positions',
    'White has the extra tempo of a Sicilian with colors reversed, giving a subtle but real advantage',
    'The structure favors long-term positional maneuvering — piece activity over pawn breaks',
  ],
  responses: [
    response('c4_e5_nc3_nf6', 'Nf6', 'Reversed Sicilian Nf6'),
  ],
});

export const c4_e5_nc3_nf6 = createVariation({
  id: 'c4_e5_nc3_nf6',
  move: 'Nf6',
  name: 'Reversed Sicilian Nf6',
  boardPgn: 'c4 e5 Nc3 Nf6',
  intent: [
    'Black develops the knight actively — attacking c4 and controlling the center',
    'White often plays Nf3 or g3 (preparing Bg2) — the fianchetto setup is very common in English positions',
    'After Nf3 Nc6, both sides have active piece positions with no major weaknesses — a balanced, dynamic middlegame awaits',
    'The Reversed Sicilian is a favorite of Magnus Carlsen — patient maneuvering and small advantages accumulate',
  ],
  responses: [
    response('c4_e5_nc3_nf6_nf3', 'Nf3', 'English Nf3'),
  ],
});

export const c4_e5_nc3_nf6_nf3 = createVariation({
  id: 'c4_e5_nc3_nf6_nf3',
  move: 'Nf3',
  name: 'English Nf3',
  boardPgn: 'c4 e5 Nc3 Nf6 Nf3',
  intent: [
    'White develops the second knight — now both central squares d5 and e4 are controlled by pieces',
    'Black plays ...Nc6, completing the symmetrical development; both sides aim to fianchetto and castle kingside',
    'The resulting positions are strategic and balanced — no immediate tension, but long plans of piece maneuvering',
    'Hikaru Nakamura and Magnus Carlsen are masters of these positions, grinding small advantages over many moves',
  ],
});

// ============================================================================
// RÉTI OPENING — DEPTH NODES (3rd–5th level)
// ============================================================================

export const nf3_d5_c4 = createVariation({
  id: 'nf3_d5_c4',
  move: 'c4',
  name: 'Réti with c4',
  boardPgn: 'Nf3 d5 c4',
  intent: [
    'White finally reveals their plan — c4 challenges Black\'s d5 pawn, transposing toward a Queen\'s Gambit type structure',
    'The key difference from a normal QGD: Black has already committed to ...d5, so White has avoided certain Black setups',
    'Black can hold with ...e6 (solid, QGD-like), exchange with ...dxc4 (active), or push ...d4 (space-grabbing)',
    'The ...d4 push is the most interesting — Black advances to gain space, White attacks the advanced pawn with e3',
  ],
  responses: [
    response('nf3_d5_c4_e6', 'e6', 'Réti QGD-style'),
    response('nf3_d5_c4_d4', 'd4', 'Réti d4 push'),
  ],
});

export const nf3_d5_c4_e6 = createVariation({
  id: 'nf3_d5_c4_e6',
  move: 'e6',
  name: 'Réti QGD-style',
  boardPgn: 'Nf3 d5 c4 e6',
  intent: [
    'Black transposes to a solid QGD structure — supporting d5 and keeping the light-squared bishop temporarily locked',
    'White typically plays g3-Bg2 (fianchetto), keeping the Réti character rather than going into pure QGD theory',
    'The resulting positions are subtle — White\'s bishop on g2 eyes the long diagonal, Black plays for a ...c5 or ...e5 break',
    'These positions favor players with deep positional understanding — both sides maneuver for piece activity',
  ],
});

export const nf3_d5_c4_d4 = createVariation({
  id: 'nf3_d5_c4_d4',
  move: 'd4',
  name: 'Réti d4 push',
  boardPgn: 'Nf3 d5 c4 d4',
  intent: [
    'An ambitious choice — Black grabs space by advancing the d-pawn, creating a passed pawn chain',
    'White typically responds with e3, immediately attacking the advanced pawn and creating queenside tension',
    'After e3 dxe3 fxe3, White has a semi-open f-file and an asymmetrical pawn structure that leads to dynamic play',
    'The Réti d4 push leads to uncharted territory — ideal for players who want to avoid theory and fight for every inch',
  ],
});

// ============================================================================
// RÉTI / ENGLISH — FIANCHETTO DEPTH NODE
// ============================================================================

export const nf3_d5_g3 = createVariation({
  id: 'nf3_d5_g3',
  move: 'g3',
  name: 'Réti Fianchetto',
  boardPgn: 'Nf3 d5 g3',
  intent: [
    'White chooses the pure fianchetto setup — g3 prepares Bg2, putting the bishop on a powerful diagonal',
    'This is the purest Réti — White delays any central pawn commitment to see how Black develops',
    'Black typically plays ...Nf6, ...c6, and ...Bf5, building a solid setup before deciding on ...e5 or ...c5',
    'The Bg2 bishop on the long diagonal a1-h8 is White\'s main long-term asset in this structure',
  ],
  responses: [
    response('nf3_d5_g3_nf6', 'Nf6', 'Réti Fianchetto Nf6'),
  ],
});

export const nf3_d5_g3_nf6 = createVariation({
  id: 'nf3_d5_g3_nf6',
  move: 'Nf6',
  name: 'Réti Fianchetto Nf6',
  boardPgn: 'Nf3 d5 g3 Nf6',
  intent: [
    'Black develops naturally — ...Nf6 is flexible and waits to see White\'s bishop placement',
    'After Bg2, the tension builds — the g2 bishop eyes d5 and the queenside, while Black must reinforce the center',
    'Both sides often castle kingside and enter a long maneuvering battle — Réti mastered these slow squeeze positions',
    'Key plan for Black: play ...c5 to fight for the center before White\'s positional advantage becomes permanent',
  ],
});

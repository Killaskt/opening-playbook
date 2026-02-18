import { OpeningNode, ResponseLink, TreeNode, ExampleLine, TrapInfo, FamousGame, BoardArrow, PrincipleApplication } from '../types';

/**
 * Helper to create a response link
 */
export const response = (id: string, move: string, name: string): ResponseLink => ({
  id,
  move,
  name,
});

/**
 * Helper to create a tree node
 */
export const tree = (text: string, children?: TreeNode[]): TreeNode => ({
  text,
  ...(children && { children }),
});

/**
 * Helper to create an example line
 */
export const line = (label: string, pgn: string): ExampleLine => ({
  label,
  pgn,
});

/**
 * Helper to create a trap info
 */
export const trap = (name: string, description: string, pgn?: string): TrapInfo => ({
  name,
  description,
  ...(pgn && { pgn }),
});

/**
 * Helper to create a famous game
 */
export const game = (players: string, description: string, pgn?: string): FamousGame => ({
  players,
  description,
  ...(pgn && { pgn }),
});

/**
 * Helper to create a board arrow
 */
export const arrow = (from: string, to: string, color?: string): BoardArrow => ({
  from,
  to,
  ...(color && { color }),
});

/**
 * Helper to create a principle application
 */
export const principle = (principleId: string, explanation: string): PrincipleApplication => ({
  principleId,
  explanation,
});

/**
 * Helper to create an opening node with defaults
 */
export const createOpening = (config: {
  id: string;
  move: string;
  name: string;
  boardPgn: string;
  intent: string[];
  responses?: ResponseLink[];
  lines?: ExampleLine[];
  tree?: TreeNode[];
  whyThisMove?: string;
  strategicThemes?: string[];
  threats?: string[];
  traps?: TrapInfo[];
  prosAndCons?: { pros: string[]; cons: string[] };
  famousPlayers?: string[];
  famousGames?: FamousGame[];
  boardArrows?: BoardArrow[];
  principleApplications?: PrincipleApplication[];
}): OpeningNode => ({
  responses: [],
  lines: [],
  tree: [],
  ...config,
});

/**
 * Lightweight node for deeper variations — only id, move, name, boardPgn, intent, responses.
 * Omits whyThisMove, strategicThemes, traps, prosAndCons, famous*, principles, etc. to save space.
 */
export const createVariation = (config: {
  id: string;
  move: string;
  name: string;
  boardPgn: string;
  intent?: string[];
  responses?: ResponseLink[];
}): OpeningNode => ({
  id: config.id,
  move: config.move,
  name: config.name,
  boardPgn: config.boardPgn,
  intent: config.intent ?? [config.name],
  responses: config.responses ?? [],
  lines: [],
  tree: [],
});

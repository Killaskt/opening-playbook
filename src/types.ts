export interface TreeNode {
  text: string;
  children?: TreeNode[];
}

export interface ResponseLink {
  id: string;
  move: string;
  name: string;
}

export interface ExampleLine {
  label: string;
  pgn: string;
  arrows?: BoardArrow[];
}

export interface TrapInfo {
  name: string;
  description: string;
  pgn?: string;
}

export interface FamousGame {
  players: string;
  description: string;
  pgn?: string;
}

export interface LichessStats {
  whiteWinRate?: number;
  drawRate?: number;
  blackWinRate?: number;
  totalGames?: number;
}

export interface BoardArrow {
  from: string;
  to: string;
  color?: string;
}

export interface PrincipleApplication {
  principleId: string;
  explanation: string;
}

export interface OpeningNode {
  id: string;
  move: string;
  name: string;
  intent: string[];
  responses: ResponseLink[];
  lines: ExampleLine[];
  tree: TreeNode[];
  boardPgn: string;
  whyThisMove?: string;
  strategicThemes?: string[];
  threats?: string[];
  traps?: TrapInfo[];
  prosAndCons?: { pros: string[]; cons: string[] };
  famousPlayers?: string[];
  famousGames?: FamousGame[];
  lichessStats?: LichessStats;
  boardArrows?: BoardArrow[];
  principleApplications?: PrincipleApplication[];
}

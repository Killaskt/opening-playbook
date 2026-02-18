import { OpeningNode } from '../../types';

import {
  e4,
  e4_c5, e4_c5_nf3, e4_c5_nf3_d6, e4_c5_nf3_d6_d4, e4_c5_nf3_nc6, e4_c5_c3, e4_c5_nc3,
  e4_e5, e4_e5_nf3, e4_e5_nf3_nc6, e4_e5_nf3_nc6_bb5, e4_e5_nf3_nc6_bc4, e4_e5_nf3_nf6, e4_e5_f4,
  e4_e6, e4_e6_d4, e4_e6_d4_d5, e4_e6_d4_d5_nc3, e4_e6_d4_d5_nd2, e4_e6_d4_d5_e5,
  e4_c6, e4_c6_d4, e4_c6_d4_d5, e4_c6_d4_d5_nc3, e4_c6_d4_d5_e5, e4_c6_d4_d5_exd5,
} from './e4';

import {
  d4,
  d4_d5, d4_d5_c4, d4_d5_c4_e6, d4_d5_c4_c6, d4_d5_c4_dxc4,
  d4_nf6, d4_nf6_c4, d4_nf6_c4_g6, d4_nf6_c4_g6_nc3, d4_nf6_c4_e6,
} from './d4';

import {
  c4, nf3, b3,
  c4_e5, c4_c5,
  nf3_d5, nf3_nf6,
  b3_e5, b3_d5,
} from './other';

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

export const startMoves: OpeningNode[] = [e4, d4, c4, nf3, b3];

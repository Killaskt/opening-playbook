import { OpeningNode } from '../../types';

import {
  e4,
  e4_c5, e4_c5_nf3, e4_c5_nf3_d6, e4_c5_nf3_d6_d4, e4_c5_nf3_nc6, e4_c5_c3, e4_c5_nc3,
  e4_c5_nf3_d6_d4_nf6, e4_c5_nf3_d6_d4_nf6_nc3,
  e4_c5_nf3_d6_d4_nf6_nc3_a6, e4_c5_nf3_d6_d4_nf6_nc3_g6, e4_c5_nf3_d6_d4_nf6_nc3_e6,
  e4_e5, e4_e5_nf3, e4_e5_nf3_nc6, e4_e5_nf3_nc6_bb5, e4_e5_nf3_nc6_bc4, e4_e5_nf3_nf6, e4_e5_f4,
  e4_e5_nf3_nc6_bb5_a6, e4_e5_nf3_nc6_bb5_a6_ba4, e4_e5_nf3_nc6_bb5_a6_ba4_nf6,
  e4_e5_nf3_nc6_bb5_nf6, e4_e5_nf3_nc6_bb5_nf6_oo,
  e4_e5_nf3_nc6_d4, e4_e5_nf3_nc6_d4_exd4, e4_e5_nf3_nc6_d4_exd4_nxd4,
  e4_e5_nf3_nc6_nc3, e4_e5_nf3_nc6_nc3_nf6,
  e4_e5_nc3, e4_e5_nc3_nf6, e4_e5_nc3_nf6_f4, e4_e5_nc3_bc5,
  e4_e6, e4_e6_d4, e4_e6_d4_d5, e4_e6_d4_d5_nc3, e4_e6_d4_d5_nd2, e4_e6_d4_d5_e5,
  e4_c6, e4_c6_d4, e4_c6_d4_d5, e4_c6_d4_d5_nc3, e4_c6_d4_d5_e5, e4_c6_d4_d5_exd5,
  e4_d5, e4_d5_exd5, e4_d5_exd5_qxd5, e4_d5_exd5_nf6,
  e4_nf6, e4_nf6_e5, e4_nf6_e5_nd5,
  e4_d6, e4_d6_d4, e4_d6_d4_nf6, e4_d6_d4_nf6_nc3, e4_d6_d4_nf6_nc3_g6, e4_d6_d4_nf6_nc3_g6_bg7,
} from './e4';

import {
  d4,
  d4_d5, d4_d5_c4, d4_d5_c4_e6, d4_d5_c4_c6, d4_d5_c4_dxc4,
  d4_d5_c4_e6_nc3, d4_d5_c4_e6_nc3_nf6, d4_d5_c4_e6_nc3_nf6_bg5,
  d4_d5_c4_c6_nf3, d4_d5_c4_c6_nf3_nf6,
  d4_d5_bf4, d4_d5_bf4_nf6, d4_d5_bf4_nf6_e3, d4_d5_bf4_nf6_e3_e6,
  d4_nf6, d4_nf6_c4, d4_nf6_c4_g6, d4_nf6_c4_g6_nc3, d4_nf6_c4_e6,
  d4_nf6_c4_g6_nc3_d5,
  d4_nf6_c4_e6_g3, d4_nf6_c4_e6_g3_d5,
  d4_nf6_c4_e6_nf3, d4_nf6_c4_e6_nf3_bb4,
} from './d4';

import {
  c4, nf3, b3,
  c4_e5, c4_c5,
  c4_e5_nc3, c4_e5_nc3_nf6, c4_e5_nc3_nf6_nf3,
  nf3_d5, nf3_nf6,
  nf3_d5_c4, nf3_d5_c4_e6, nf3_d5_c4_d4,
  nf3_d5_g3, nf3_d5_g3_nf6,
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
  // Sicilian sub-variations
  e4_c5_nf3_d6_d4_nf6,
  e4_c5_nf3_d6_d4_nf6_nc3,
  e4_c5_nf3_d6_d4_nf6_nc3_a6,
  e4_c5_nf3_d6_d4_nf6_nc3_g6,
  e4_c5_nf3_d6_d4_nf6_nc3_e6,
  // Open Games variations
  e4_e5_nf3,
  e4_e5_nf3_nc6,
  e4_e5_nf3_nc6_bb5,
  e4_e5_nf3_nc6_bc4,
  e4_e5_nf3_nf6,
  e4_e5_f4,
  // Ruy Lopez depth nodes
  e4_e5_nf3_nc6_bb5_a6,
  e4_e5_nf3_nc6_bb5_a6_ba4,
  e4_e5_nf3_nc6_bb5_a6_ba4_nf6,
  e4_e5_nf3_nc6_bb5_nf6,
  e4_e5_nf3_nc6_bb5_nf6_oo,
  // Scotch Game nodes
  e4_e5_nf3_nc6_d4,
  e4_e5_nf3_nc6_d4_exd4,
  e4_e5_nf3_nc6_d4_exd4_nxd4,
  // Four Knights nodes
  e4_e5_nf3_nc6_nc3,
  e4_e5_nf3_nc6_nc3_nf6,
  // Vienna Game nodes
  e4_e5_nc3,
  e4_e5_nc3_nf6,
  e4_e5_nc3_nf6_f4,
  e4_e5_nc3_bc5,
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
  // Scandinavian Defense
  e4_d5,
  e4_d5_exd5,
  e4_d5_exd5_qxd5,
  e4_d5_exd5_nf6,
  // Alekhine's Defense
  e4_nf6,
  e4_nf6_e5,
  e4_nf6_e5_nd5,
  // Pirc Defense
  e4_d6,
  e4_d6_d4,
  e4_d6_d4_nf6,
  e4_d6_d4_nf6_nc3,
  e4_d6_d4_nf6_nc3_g6,
  e4_d6_d4_nf6_nc3_g6_bg7,
  // Black responses to d4
  d4_d5,
  d4_nf6,
  // Queen's Gambit / Indian variations
  d4_d5_c4,
  d4_d5_c4_e6,
  d4_d5_c4_c6,
  d4_d5_c4_dxc4,
  // QGD depth nodes
  d4_d5_c4_e6_nc3,
  d4_d5_c4_e6_nc3_nf6,
  d4_d5_c4_e6_nc3_nf6_bg5,
  // Slav depth nodes
  d4_d5_c4_c6_nf3,
  d4_d5_c4_c6_nf3_nf6,
  // London System nodes
  d4_d5_bf4,
  d4_d5_bf4_nf6,
  d4_d5_bf4_nf6_e3,
  d4_d5_bf4_nf6_e3_e6,
  d4_nf6_c4,
  // Grünfeld Defense
  d4_nf6_c4_g6_nc3_d5,
  // Catalan Opening
  d4_nf6_c4_e6_g3,
  d4_nf6_c4_e6_g3_d5,
  // Bogo-Indian Defense
  d4_nf6_c4_e6_nf3,
  d4_nf6_c4_e6_nf3_bb4,
  d4_nf6_c4_g6,
  d4_nf6_c4_g6_nc3,
  d4_nf6_c4_e6,
  // Black responses to c4
  c4_e5,
  c4_c5,
  // English depth nodes
  c4_e5_nc3,
  c4_e5_nc3_nf6,
  c4_e5_nc3_nf6_nf3,
  // Black responses to Nf3
  nf3_d5,
  nf3_nf6,
  // Réti depth nodes
  nf3_d5_c4,
  nf3_d5_c4_e6,
  nf3_d5_c4_d4,
  nf3_d5_g3,
  nf3_d5_g3_nf6,
  // Black responses to b3
  b3_e5,
  b3_d5,
};

export const startMoves: OpeningNode[] = [e4, d4, c4, nf3, b3];

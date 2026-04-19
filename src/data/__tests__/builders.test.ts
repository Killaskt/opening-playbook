import { describe, it, expect } from 'vitest';
import { response, tree, line, trap, game, arrow, principle } from '../builders';

describe('response()', () => {
  it('returns a ResponseLink with correct shape', () => {
    const r = response('e4_e5', 'e5', "King's Pawn Game");
    expect(r).toEqual({ id: 'e4_e5', move: 'e5', name: "King's Pawn Game" });
  });
});

describe('tree()', () => {
  it('returns a TreeNode with just text when no children', () => {
    const t = tree('Control the center');
    expect(t).toEqual({ text: 'Control the center' });
    expect(t).not.toHaveProperty('children');
  });

  it('includes children when provided', () => {
    const child = tree('Sub-point');
    const t = tree('Main point', [child]);
    expect(t.children).toHaveLength(1);
    expect(t.children![0].text).toBe('Sub-point');
  });
});

describe('line()', () => {
  it('returns an ExampleLine with correct shape', () => {
    const l = line('Main line', 'e4 e5 Nf3 Nc6');
    expect(l).toEqual({ label: 'Main line', pgn: 'e4 e5 Nf3 Nc6' });
  });
});

describe('trap()', () => {
  it('omits pgn when not provided', () => {
    const t = trap('Scholar\'s Mate', 'Quick checkmate attempt');
    expect(t).not.toHaveProperty('pgn');
    expect(t.name).toBe("Scholar's Mate");
  });

  it('includes pgn when provided', () => {
    const t = trap('Fool\'s Mate', 'Fastest checkmate', 'f3 e5 g4 Qh4#');
    expect(t.pgn).toBe('f3 e5 g4 Qh4#');
  });
});

describe('game()', () => {
  it('creates a FamousGame without pgn', () => {
    const g = game('Kasparov vs Deep Blue', 'Game 6, 1997');
    expect(g.players).toBe('Kasparov vs Deep Blue');
    expect(g).not.toHaveProperty('pgn');
  });

  it('creates a FamousGame with pgn', () => {
    const g = game('Fischer vs Spassky', 'Game 6, 1972', 'c4 e6 Nf3 d5');
    expect(g.pgn).toBe('c4 e6 Nf3 d5');
  });
});

describe('arrow()', () => {
  it('returns a BoardArrow without color by default', () => {
    const a = arrow('e2', 'e4');
    expect(a).toEqual({ from: 'e2', to: 'e4' });
    expect(a).not.toHaveProperty('color');
  });

  it('includes color when provided', () => {
    const a = arrow('d2', 'd4', 'blue');
    expect(a.color).toBe('blue');
  });
});

describe('principle()', () => {
  it('returns a PrincipleApplication with correct shape', () => {
    const p = principle('center-control', 'Controls central squares from move one');
    expect(p).toEqual({ principleId: 'center-control', explanation: 'Controls central squares from move one' });
  });
});

import { describe, it, expect } from 'vitest';
import { nodesById, startMoves } from '../openings/index';

describe('startMoves', () => {
  it('contains exactly 5 root moves', () => {
    expect(startMoves).toHaveLength(5);
  });

  it('root move IDs are the 5 expected openings', () => {
    const ids = startMoves.map((n) => n.id);
    expect(ids).toContain('e4');
    expect(ids).toContain('d4');
    expect(ids).toContain('c4');
    expect(ids).toContain('nf3');
    expect(ids).toContain('b3');
  });
});

describe('nodesById', () => {
  it('is non-empty', () => {
    expect(Object.keys(nodesById).length).toBeGreaterThan(0);
  });

  it('every node has required fields', () => {
    for (const [id, node] of Object.entries(nodesById)) {
      expect(node.id, `Node "${id}" missing id`).toBeTruthy();
      expect(node.move, `Node "${id}" missing move`).toBeTruthy();
      expect(node.name, `Node "${id}" missing name`).toBeTruthy();
      expect(node.boardPgn, `Node "${id}" missing boardPgn`).toBeTruthy();
      expect(Array.isArray(node.intent), `Node "${id}" intent is not an array`).toBe(true);
      expect(Array.isArray(node.responses), `Node "${id}" responses is not an array`).toBe(true);
    }
  });

  it('node key matches node.id', () => {
    for (const [key, node] of Object.entries(nodesById)) {
      expect(node.id, `Key "${key}" does not match node.id "${node.id}"`).toBe(key);
    }
  });

  it('all response IDs reference existing nodes', () => {
    const missingRefs: string[] = [];
    for (const node of Object.values(nodesById)) {
      for (const r of node.responses) {
        if (!nodesById[r.id]) {
          missingRefs.push(`"${node.id}" → response "${r.id}" (${r.name}) not found`);
        }
      }
    }
    expect(missingRefs, `Dangling response IDs:\n${missingRefs.join('\n')}`).toHaveLength(0);
  });

  it('boardPgn is a non-empty string for all nodes', () => {
    for (const [id, node] of Object.entries(nodesById)) {
      expect(typeof node.boardPgn).toBe('string');
      expect(node.boardPgn.trim().length, `Node "${id}" has empty boardPgn`).toBeGreaterThan(0);
    }
  });

  it('all nodes have at least one intent string', () => {
    for (const [id, node] of Object.entries(nodesById)) {
      expect(node.intent.length, `Node "${id}" has empty intent array`).toBeGreaterThan(0);
    }
  });
});

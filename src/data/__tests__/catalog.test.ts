import { describe, it, expect } from 'vitest';
import { openingsCatalog, catalogByNodeId } from '../catalog';

describe('openingsCatalog', () => {
  it('is non-empty', () => {
    expect(openingsCatalog.length).toBeGreaterThan(0);
  });

  it('every entry has required fields', () => {
    for (const entry of openingsCatalog) {
      expect(entry.name, `Missing name`).toBeTruthy();
      expect(entry.pgn, `"${entry.name}" missing pgn`).toBeTruthy();
      expect(entry.category, `"${entry.name}" missing category`).toBeTruthy();
      expect(entry.type, `"${entry.name}" missing type`).toBeTruthy();
      expect(entry.description, `"${entry.name}" missing description`).toBeTruthy();
    }
  });

  it('has no duplicate names', () => {
    const names = openingsCatalog.map((e) => e.name);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });

  it('all type values are valid', () => {
    const validTypes = new Set(['opening', 'defense', 'system', 'gambit']);
    for (const entry of openingsCatalog) {
      expect(validTypes.has(entry.type), `"${entry.name}" has invalid type "${entry.type}"`).toBe(true);
    }
  });

  it('all category values are valid', () => {
    const validCategories = new Set(['e4', 'd4', 'c4', 'nf3', 'other']);
    for (const entry of openingsCatalog) {
      expect(validCategories.has(entry.category), `"${entry.name}" has invalid category "${entry.category}"`).toBe(true);
    }
  });

  it('ECO codes match expected format when present', () => {
    // ECO codes are like A00–E99
    const ecoPattern = /^[A-E]\d{2}$/;
    for (const entry of openingsCatalog) {
      if (entry.eco) {
        expect(ecoPattern.test(entry.eco), `"${entry.name}" has malformed ECO "${entry.eco}"`).toBe(true);
      }
    }
  });

  it('keyIdeas arrays are non-empty when present', () => {
    for (const entry of openingsCatalog) {
      if (entry.keyIdeas !== undefined) {
        expect(entry.keyIdeas.length, `"${entry.name}" has empty keyIdeas array`).toBeGreaterThan(0);
      }
    }
  });
});

describe('catalogByNodeId', () => {
  it('is a Map', () => {
    expect(catalogByNodeId).toBeInstanceOf(Map);
  });

  it('only maps entries that have a nodeId', () => {
    const withNodeId = openingsCatalog.filter((e) => e.nodeId);
    expect(catalogByNodeId.size).toBe(withNodeId.length);
  });

  it('each mapped entry is retrievable by its nodeId', () => {
    for (const entry of openingsCatalog) {
      if (entry.nodeId) {
        const found = catalogByNodeId.get(entry.nodeId);
        expect(found, `nodeId "${entry.nodeId}" not found in map`).toBeDefined();
        expect(found!.name).toBe(entry.name);
      }
    }
  });
});

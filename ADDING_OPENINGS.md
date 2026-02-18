# Adding New Openings

This guide shows you how to add new chess openings to the app.

## Quick Start

All opening data is in: `src/data/openings.ts`

### Example: Adding a New Black Response

Let's add the **Scandinavian Defense** (`1. e4 d5`) as a response to `1. e4`:

```typescript
// 1. Create the opening using the helper
const e4_d5 = createOpening({
  id: 'e4_d5',                    // Unique ID
  move: '... d5',                  // The move in SAN notation
  name: 'Scandinavian Defense',    // Full name
  intent: [
    'Challenge the e4 pawn immediately',
    'Force White to make an early decision',
    'Solid but gives White space advantage',
  ],
  lines: [
    '1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5',
    '1. e4 d5 2. exd5 Nf6 3. d4 Nxd5',
  ],
  tree: [
    tree('1. e4 d5', [
      tree('2. exd5', [
        tree('... Qxd5'),
        tree('... Nf6'),
      ]),
    ]),
  ],
});

// 2. Add it to nodesById
export const nodesById: Record<string, OpeningNode> = {
  // ... existing nodes
  e4_d5,  // Add here
};

// 3. Link it from e4 by adding to responses array
const e4 = createOpening({
  // ... existing fields
  responses: [
    response('e4_c5', '... c5', 'Sicilian Defense'),
    response('e4_e5', '... e5', 'Open Games'),
    response('e4_e6', '... e6', 'French Defense'),
    response('e4_c6', '... c6', 'Caro-Kann Defense'),
    response('e4_d5', '... d5', 'Scandinavian Defense'),  // Add this
  ],
  // ... rest of fields
});
```

That's it! The new opening is now clickable from the e4 detail screen.

## Adding a Deeper Line

Want to add variations within an existing opening? Just create another node and link it.

**Example: Adding the Najdorf variation of the Sicilian**

```typescript
// Create the Najdorf node
const e4_c5_najdorf = createOpening({
  id: 'e4_c5_najdorf',
  move: '5... a6',
  name: 'Sicilian Najdorf',
  intent: [
    'Most ambitious Sicilian variation',
    'Delay piece development for maximum flexibility',
    'Complex tactical battles',
  ],
  lines: [
    '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5',
    '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3',
  ],
  tree: [
    tree('5... a6', [
      tree('6. Bg5 (Najdorf Main)'),
      tree('6. Be3 (English Attack)'),
    ]),
  ],
});

// Add to nodesById
export const nodesById = {
  // ...
  e4_c5_najdorf,
};

// Link from Sicilian
const e4_c5 = createOpening({
  // ...
  responses: [
    response('e4_c5_najdorf', '5... a6', 'Najdorf Variation'),
  ],
  // ...
});
```

## Helper Functions Reference

### `createOpening(config)`
Creates an opening node with defaults.

**Required fields:**
- `id` - Unique identifier (e.g., `"e4"`, `"e4_c5"`)
- `move` - The move notation (e.g., `"1. e4"`, `"... c5"`)
- `name` - Display name (e.g., `"Sicilian Defense"`)
- `intent` - Array of 2-3 bullets explaining the idea

**Optional fields:**
- `responses` - Array of links to other openings (use `response()` helper)
- `lines` - Array of example lines as strings
- `tree` - Visual tree structure (use `tree()` helper)

### `response(id, move, name)`
Creates a clickable link to another opening.

```typescript
response('e4_c5', '... c5', 'Sicilian Defense')
// Links to the opening with id 'e4_c5'
```

### `tree(text, children?)`
Creates a tree node for visual display.

```typescript
tree('1. e4', [
  tree('... c5'),
  tree('... e5', [
    tree('2. Nf3'),
  ]),
])
```

## ID Naming Convention

Use underscores to separate moves in the sequence:
- White first move: `e4`, `d4`, `c4`
- Black response: `e4_c5`, `d4_nf6`
- Further moves: `e4_c5_nf3`, `e4_c5_nf3_d6`

Keep IDs lowercase for consistency.

## Tips

### Keep It Digestible
- **Intent**: 2-3 bullets max
- **Responses**: 2-4 options (most common)
- **Lines**: 2-4 example lines
- **Tree depth**: 2-3 moves deep

### Lines vs Tree
- **Lines**: Show complete game sequences (good for showing transposes)
- **Tree**: Show branching structure (good for exploring options)

Both are optional, use what makes sense for each opening.

### Don't Forget to Export

After creating a node, add it to `nodesById`:

```typescript
export const nodesById: Record<string, OpeningNode> = {
  // White first moves
  e4,
  // ... other moves
  your_new_opening,  // ← Add here
};
```

### Adding a New First Move

If adding a completely new first move (like `1. g3`):

```typescript
const g3 = createOpening({
  id: 'g3',
  move: '1. g3',
  name: 'Benko Opening',
  intent: ['Fianchetto kingside bishop', 'Flexible hypermodern setup'],
  // ... rest of config
});

// Add to nodesById
export const nodesById = {
  // ...
  g3,
};

// Add to startMoves array (this shows on home screen)
export const startMoves: OpeningNode[] = [
  e4, d4, c4, nf3, b3,
  g3,  // ← Add here
];
```

## Testing Your Changes

1. Save the file
2. Expo will hot-reload
3. Navigate to the opening to verify:
   - Intent bullets display
   - Responses are clickable
   - Lines format correctly
   - Tree renders properly

That's it! Start adding your favorite openings. 🎯

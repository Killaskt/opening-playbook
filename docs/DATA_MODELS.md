# Data Models

All types live in `src/types.ts`. Data files import builder helpers from `src/data/builders.ts`.

---

## Core Interfaces

### OpeningNode

The primary data structure. Each opening variation is one node.

```typescript
interface OpeningNode {
  id: string                        // e.g. 'e4_c5_nf3'
  move: string                      // e.g. '2. Nf3'
  name: string                      // e.g. 'Open Sicilian'
  intent: string[]                  // Bullet points explaining the move's purpose
  boardPgn: string                  // Full PGN up to this position (for board rendering)
  responses: ResponseLink[]         // Links to child nodes
  lines: ExampleLine[]              // Example continuations with PGN
  tree: TreeNode[]                  // Recursive move tree for visualization

  // Optional rich content
  whyThisMove?: string
  strategicThemes?: string[]
  threats?: string[]
  traps?: TrapInfo[]
  prosAndCons?: { pros: string[]; cons: string[] }
  famousPlayers?: string[]
  famousGames?: FamousGame[]
  boardArrows?: BoardArrow[]
  principleApplications?: PrincipleApplication[]
}
```

### ResponseLink
```typescript
interface ResponseLink {
  id: string    // Target node ID
  move: string  // e.g. '... c5'
  name: string  // e.g. 'Sicilian Defense'
}
```

### TreeNode
```typescript
interface TreeNode {
  text: string
  children?: TreeNode[]
}
```

### ExampleLine
```typescript
interface ExampleLine {
  label: string
  pgn: string
  arrows?: BoardArrow[]
}
```

### TrapInfo
```typescript
interface TrapInfo {
  name: string
  description: string
  pgn: string
}
```

### FamousGame
```typescript
interface FamousGame {
  players: string
  year: number
  description: string
}
```

### BoardArrow
```typescript
interface BoardArrow {
  from: string   // e.g. 'e2'
  to: string     // e.g. 'e4'
  color?: string
}
```

### PrincipleApplication
```typescript
interface PrincipleApplication {
  principleId: string  // Key into PRINCIPLES record
  explanation: string
}
```

---

## Catalog Types (src/data/catalog.ts)

```typescript
type OpeningStyle = 'sharp' | 'solid' | 'positional' | 'aggressive' | 'flexible' | 'gambit' | 'hypermodern'
type OpeningType = 'opening' | 'defense' | 'system' | 'gambit'

interface CatalogEntry {
  name: string
  pgn: string
  nodeId?: string              // Links to OpeningNode for drill-down
  category: 'e4' | 'd4' | 'c4' | 'nf3' | 'other'
  description: string
  eco: string                  // ECO code (e.g. 'B20')
  style: OpeningStyle[]
  keyIdeas: string[]
  type: OpeningType
  fundamentals: string[]       // Principle IDs
}
```

**Lookup helper:** `catalogByNodeId: Record<string, CatalogEntry>` — maps nodeId → entry.

---

## Fundamentals (src/data/fundamentals.ts)

```typescript
interface FundamentalSection {
  id: string
  title: string
  subtitle: string
  content: string
  keyPoints: string[]
  mistakes?: string[]
  example?: { pgn: string; label: string }
}
```

9 sections: Opening Types, Why Openings Matter, Center Control, Development, Castling, Pawn Structure, Space & Tempo, Planning, Traps & Tactics.

---

## Principles (src/data/principles.ts)

```typescript
interface Principle {
  id: string
  name: string
  icon: string   // Single char: '+', '>', '#', '=', '^', '*'
}
```

6 principles: `center`, `development`, `kingSafety`, `pawnStructure`, `spaceTempo`, `planning`.

---

## Builder Helpers (src/data/builders.ts)

All opening data uses these factory functions:

| Function | Creates | Key Fields |
|----------|---------|------------|
| `createOpening(opts)` | `OpeningNode` | All fields, defaults for optionals |
| `createVariation(opts)` | `OpeningNode` | Lightweight: id, move, name, boardPgn, intent, responses only |
| `response(id, move, name)` | `ResponseLink` | — |
| `tree(text, children?)` | `TreeNode` | — |
| `line(label, pgn, arrows?)` | `ExampleLine` | — |
| `trap(name, desc, pgn)` | `TrapInfo` | — |
| `game(players, year, desc)` | `FamousGame` | — |
| `arrow(from, to, color?)` | `BoardArrow` | — |
| `principle(id, explanation)` | `PrincipleApplication` | — |

---

## Data Organization

```
src/data/openings/e4.ts     → All 1.e4 variations (Sicilian, Ruy Lopez, French, Caro-Kann, etc.)
src/data/openings/d4.ts     → All 1.d4 variations (QGD, Slav, KID, Nimzo, London, etc.)
src/data/openings/other.ts  → c4 (English), Nf3 (Réti), b3 (Larsen)
src/data/openings/index.ts  → Merges all nodes into nodesById: Record<string, OpeningNode>
src/data/catalog.ts         → 100+ CatalogEntry objects for the Library tab
src/data/fundamentals.ts    → FundamentalSection[] for the Learn tab
src/data/principles.ts      → PRINCIPLES: Record<string, Principle>
```

**All data is static** — no API calls, no database, no persistence. Port these files as-is.

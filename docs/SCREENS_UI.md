# Screens & UI Components

## Screens

### Moves Tab (`index.tsx`) — Home Screen

**Purpose:** Browse White's 5 first moves and search openings.

**Data:** Imports `nodesById` from `src/data/openings`. Filters to 5 root nodes: e4, d4, c4, nf3, b3.

**UI:**
- Top: `ScreenHeader` (title, theme toggle, contact link)
- `SearchBar` — filters by move, name, intent, whyThisMove (case-insensitive)
- FlatList of move cards, each showing:
  - Colored square with move notation (e.g. "e4")
  - Opening name + first intent line
  - Horizontal scroll of response pills (clickable → navigate to that node)
- Tap card → navigate to `/move/[id]`

**Performance:** `initialNumToRender: 5`, `maxToRenderPerBatch: 3`, `windowSize: 5`

---

### Library Tab (`openings.tsx`)

**Purpose:** Searchable encyclopedia of all openings.

**Data:** Imports catalog entries from `src/data/catalog.ts`, `nodesById` for linking.

**UI:**
- `ScreenHeader` + `SearchBar`
- Type filter pills: Opening, Defense, System, Gambit (toggle)
- SectionList grouped by category (e4, d4, c4, nf3, other)
- Each entry shows: name, PGN, ECO badge, style tags, description
- `SectionJumper` (floating ↑↓ buttons)
- Tap → if `nodeId` exists → `/move/[nodeId]`, else → `/opening-detail` with params

**Search:** Multi-term across name, description, PGN, ECO, style, keyIdeas, famousPlayers.

---

### Learn Tab (`learn.tsx`)

**Purpose:** Educational content about chess opening principles.

**Data:** Imports `fundamentals` from `src/data/fundamentals.ts`.

**UI:**
- `ScreenHeader`
- List of expandable cards (one per FundamentalSection)
- Each card: title, subtitle, animated chevron
- Expanded: content text, key points (BulletRow), mistakes (BulletRow), example board (AnimatedChessBoard)
- Animated expand/collapse with `LayoutAnimation` + `Animated.Value`

---

### Move Detail (`move/[id].tsx`)

**Purpose:** Full breakdown of a single opening.

**Data:** `nodesById[id]` + `catalogByNodeId[id]` for enrichment.

**UI Structure (top to bottom):**
1. **Hero:** Move notation, name, ECO badge, style tags, intent bullets, `AnimatedChessBoard` with responses
2. **Principle Applications:** Cards showing how fundamentals apply
3. **Why Play This:** Prioritizes node.whyThisMove → catalog.description → intent
4. **Strategic Themes:** Bullet list
5. **At a Glance** (`GlanceSection`): Tabbed — Strengths / Weaknesses / Watch Out For (threats + traps)
6. **Go Deeper** (collapsible):
   - Example lines (up to 2, with animated boards)
   - Hall of Fame (famous players + games)
   - Move tree (`TreeView`)

**Board:** Responsive size, shows response squares as highlighted, tapping a response navigates.

---

### Opening Detail (`opening-detail.tsx`)

**Purpose:** Detail for catalog entries without a dedicated move node.

**Data:** Receives params: name, pgn, eco, style[], keyIdeas[], description, nodeId?.

**UI:** Hero card (PGN, ECO, style tags), moves, description, key ideas, "Explore move-by-move" button if nodeId exists.

---

### Contact (`contact.tsx`)

**Purpose:** Feedback form.

**UI:** Category picker (Feedback/Bug/Suggestion/Other), optional email input, message textarea, submit button.  
**Backend:** POST to `https://formspree.io/f/mlgwwbzd`  
**State:** idle → sending → success/error. 60s cooldown after submit.

---

## Components

### Core Display

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `AnimatedChessBoard` | Board from PGN with move controls | `pgn`, `compact?`, `label?`, `arrows?`, `responses?`, `onResponsePress?` |
| `ChessPieces` | Unicode piece rendering | `renderPiece(type, isWhite, size)` |
| `TreeView` | Recursive indented tree | `nodes: TreeNode[]` |
| `GlanceSection` | Tabbed strengths/weaknesses/threats | `pros`, `cons`, `threats`, `traps` |
| `TrapCard` | Expandable trap with board | `trap: TrapInfo` |
| `BulletRow` | Icon + text row | `text`, `kind` (idea/pro/con/warning) |
| `IdeaIcons` | Icon mapping for bullet types | Unicode symbols by kind |
| `ResponseGrid` | Grid of response cards | `responses`, `onPress` |

### Layout & Navigation

| Component | Purpose | Notes |
|-----------|---------|-------|
| `LiquidTabBar` | Animated tab bar | Spring physics, drag preview. Most complex component — needs full rewrite for web. |
| `ScreenHeader` | Top bar: title, theme toggle, contact | Platform-aware padding |
| `SearchBar` | Text input + clear | Wraps in GlassCard |
| `SectionJumper` | Floating ↑↓ navigation | Bottom-right positioned |

### UI Primitives (`UIPrimitives.tsx`)

| Component | Purpose |
|-----------|---------|
| `GlassCard` | Frosted glass card with border + elevation |
| `SectionCard` | Card with colored left accent border |
| `PillChip` | Badge/label pill |
| `EcoBadge` | Small ECO code display |
| `SectionTitle` | Section heading |

### Other

| Component | Purpose |
|-----------|---------|
| `TabIcons` | Text-based tab icons (P, L, B, M) |
| `AdBanner` | Placeholder, currently empty |

---

## Key Interaction Patterns

- **Board navigation:** Previous / Next / Reset / Jump to End controls on every AnimatedChessBoard
- **Response navigation:** Tap highlighted square or response pill → router.push(`/move/${id}`)
- **Search:** Instant filter, case-insensitive, multi-term (all terms must match)
- **Expand/collapse:** Learn cards + Go Deeper section use animated toggle
- **Theme toggle:** Cycles system → light → dark → system via ScreenHeader button

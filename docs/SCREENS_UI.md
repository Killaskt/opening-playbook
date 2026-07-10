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
| `LiquidTabBar` | **Floating glass island** nav bar | Apple liquid glass: pill-shaped, centered, fixed `24px` above safe-area bottom. `blur(40px) saturate(1.8)`. Spring-animated sliding pill indicator (`cubic-bezier(0.34,1.56,0.64,1)`) slides between active tabs using `useRef`/`useEffect` position measurement. Width is content-driven (not full-width). |
| `ScreenHeader` | Sticky top bar with glass blur | `position: sticky; top: 0`. Glass background (`blur(28px) saturate(1.6)`) + separating bottom border. Theme toggle + mail buttons have `borderRadius: 12` + `blur(12px)`. |
| `SearchBar` | Text input + clear | Wraps in GlassCard. Input is transparent against the glass base. Leading `⌕` search icon at 16px. Input left-padding shifted to 40px. |
| `SectionJumper` | Floating ↑↓ navigation | Bottom-right positioned. Glass blur (`blur(24px) saturate(1.5)`) + specular highlight. `borderRadius: 20`. |

### UI Primitives (`UIPrimitives.tsx`)

| Component | Purpose |
|-----------|---------|
| `GlassCard` | Frosted glass card — `backdrop-filter: blur(28px) saturate(1.6)`, specular inner highlight (`inset 0 1px 0 glassSpecularLight`), `borderRadius: 20`. No elevation spread (provides its own shadow). |
| `SectionCard` | Card with colored left accent border |
| `PillChip` | Badge/label pill |
| `EcoBadge` | Small ECO code display |
| `SectionTitle` | Section heading |

#### Glass token reference (`src/theme/colors.ts`)

| Token | Purpose |
|-------|---------|
| `glassSpecularLight` | Inset top-edge highlight: `rgba(255,255,255,0.80)` — simulates light hitting the top of a glass surface |
| `glassSpecularDark` | Subtle specular for contexts needing a muted highlight: `rgba(255,255,255,0.08)` |
| `glassBlur` | Shared blur CSS value for cards/headers: `'blur(28px) saturate(1.6)'` |

### Other

| Component | Purpose |
|-----------|---------|
| `TabIcons` | Text-based tab icons (P, L, B, M) |
| `AdBanner` | Inline ad card — interleaved in Moves and Library lists; `AdCard` renders house ads, `shouldShowAd()` controls frequency |

---

## Key Interaction Patterns

- **Board navigation:** Previous / Next / Reset / Jump to End controls on every AnimatedChessBoard
- **Response navigation:** Tap highlighted square or response pill → router.push(`/move/${id}`)
- **Search:** Instant filter, case-insensitive, multi-term (all terms must match)
- **Expand/collapse:** Learn cards + Go Deeper section use animated toggle
- **Theme toggle:** Cycles system → light → dark → system via ScreenHeader button

---

## Liquid Glass Design System

The app implements Apple's iOS 26 / visionOS "Liquid Glass" visual language. See [LIQUID_GLASS_DESIGN.md](./LIQUID_GLASS_DESIGN.md) for full documentation including:

- Design philosophy and comparison to flat/material design
- Core property tables (blur values, opacity, specular recipes)
- All new color tokens (`glassSpecularLight`, `glassSpecularDark`, `glassBlur`)
- Component-level specification table
- Dark vs light variant details
- Accessibility guidance for `prefers-reduced-motion`
- How to add new glass surfaces

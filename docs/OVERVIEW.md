# Opening Playbook — App Overview

## What It Is

A mobile app for learning chess openings. Users browse White's first moves (e4, d4, c4, Nf3, b3), drill into variations, and read educational content about opening principles.

**App Name:** Opening Playbook  
**Bundle ID:** `com.killaskt.openingplaybook`

## Core Loop

1. **Browse** — Home tab shows 5 root moves with search
2. **Explore** — Tap a move → see intent, responses, board position, traps, themes
3. **Catalog** — Library tab: searchable encyclopedia of 100+ openings with ECO codes, style tags, filtering
4. **Learn** — Expandable cards teaching chess fundamentals (center control, development, castling, etc.)
5. **Feedback** — Contact form via Formspree

## Tech Stack (Current — Being Replaced)

| Layer | Current | Target |
|-------|---------|--------|
| Framework | React Native 0.83 + Expo 55 | React 19 + Vite + Capacitor |
| Routing | expo-router (file-based) | React Router (or equivalent) |
| Chess engine | chess.js 1.4 | chess.js 1.4 (no change) |
| Animations | RN Animated API | CSS / Framer Motion |
| Styling | RN StyleSheet | CSS (inline or CSS modules) |
| Icons | expo-vector-icons + Unicode | Unicode (or lucide-react) |
| Storage | None (static data) | None (static data) |
| CI/CD | EAS Build (broken) | Codemagic (see CODEMAGIC_SETUP.md) |

## Navigation Structure

```
Root Stack
├─ (tabs)
│  ├─ index      → Moves tab (browse 5 root openings)
│  ├─ openings   → Library tab (searchable catalog)
│  └─ learn      → Learn tab (fundamentals)
├─ move/[id]     → Move detail (full opening breakdown)
├─ opening-detail → Catalog-only detail (no move tree)
└─ contact       → Feedback form
```

## File Map

```
src/types.ts              → All TypeScript interfaces
src/data/builders.ts      → Helper functions for creating opening nodes
src/data/openings/*.ts    → 100+ opening definitions (e4, d4, other)
src/data/openings/index.ts → Central index, exports nodesById lookup
src/data/catalog.ts       → Searchable encyclopedia entries
src/data/fundamentals.ts  → Learn tab educational content
src/data/principles.ts    → Principle definitions (center, development, etc.)
src/theme/*               → Colors, spacing, typography, elevation, context
src/components/*          → All UI components
app/*                     → Screen files (Expo Router)
```

## What Transfers 1:1 to Capacitor

- **All data files** — Pure TS objects, zero platform code
- **chess.js** — NPM package, works anywhere
- **Theme system** — Context + objects, just swap RN shadow → CSS box-shadow
- **Business logic** — Search, filtering, node lookup

## What Needs Rewriting

- **Screens** — RN View/Text/FlatList → HTML div/p/ul (or component library)
- **Animations** — RN Animated → CSS transitions / Framer Motion
- **Navigation** — expo-router → React Router
- **Tab bar** — Custom LiquidTabBar uses RN Animated spring physics
- **Safe area** — react-native-safe-area-context → CSS env(safe-area-inset-*)
- **Platform checks** — Platform.OS → removed or feature detection

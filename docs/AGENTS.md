# AGENTS.md — Opening Playbook Capacitor Migration

## Source of Truth Docs

Before writing any code, read in this order:
1. `AGENTS.md` (this file) — roles, build order, rules
2. `OVERVIEW.md` — what the app does, navigation, file map
3. `DATA_MODELS.md` — all TypeScript interfaces, data organization
4. Then read the specific domain doc for your task (see table below)

| Task | Read |
|---|---|
| Types, data layer, theme | `DATA_MODELS.md`, `THEME_UTILS.md` |
| Screens & components | `SCREENS_UI.md` |
| iOS CI/CD | `CODEMAGIC_SETUP.md` |
| Migration methodology | `RN_TO_CAPACITOR_GUIDE.md` |
| Known issues | `KNOWN_ISSUES.md` (root) |

---

## Project Stack (Target)

- **Vite + React 19 + TypeScript** (strict mode)
- **Capacitor 7** for iOS wrapping
- **CSS Modules** for component styles
- **React Router** for navigation (3 tabs + detail routes)
- **chess.js** for board logic (carry over from RN version)
- **No state management library** — static data, no persistence needed
- **No API calls** — all data is baked in

---

## Source Structure (Target)

```
src/
  types.ts                — all TypeScript interfaces (port as-is from RN)
  data/
    builders.ts           — helper functions (port as-is)
    catalog.ts            — encyclopedia entries (port as-is)
    fundamentals.ts       — learn content (port as-is)
    principles.ts         — principle defs (port as-is)
    openings/             — opening nodes (port as-is)
  theme/
    colors.ts             — light/dark palettes (port, remove RN shadow format)
    spacing.ts            — spacing scale (port as-is)
    typography.ts         — type scale (port as-is)
    elevation.ts          — rewrite: RN shadows → CSS box-shadow
    openingStyles.ts      — style colors (port as-is)
    ThemeContext.tsx       — rewrite: useColorScheme → matchMedia
  components/
    AnimatedChessBoard.tsx — rewrite for web (HTML table/grid + chess.js)
    TreeView.tsx          — minimal rewrite (View→div, Text→span)
    GlanceSection.tsx     — rewrite for web
    TrapCard.tsx          — rewrite for web
    LiquidTabBar.tsx      — full rewrite (RN Animated → CSS/Framer Motion)
    ScreenHeader.tsx      — rewrite for web
    SearchBar.tsx         — rewrite (TextInput → <input>)
    UIPrimitives.tsx      — rewrite (View→div, StyleSheet→CSS)
    *.module.css          — co-located styles
  pages/
    MovesPage.tsx         — home tab (port from app/(tabs)/index.tsx)
    LibraryPage.tsx       — catalog tab (port from app/(tabs)/openings.tsx)
    LearnPage.tsx         — learn tab (port from app/(tabs)/learn.tsx)
    MoveDetailPage.tsx    — opening detail (port from app/move/[id].tsx)
    OpeningDetailPage.tsx — catalog detail (port from app/opening-detail.tsx)
    ContactPage.tsx       — feedback form (port from app/contact.tsx)
  App.tsx                 — router + tab shell
  main.tsx                — entry point
```

---

## Subagent Build Order

### Phase 1 — Foundation (no dependencies between these)

**Can run in parallel:**

| Agent | Task | Reads | Produces |
|-------|------|-------|----------|
| `port-types` | Copy `src/types.ts` as-is | DATA_MODELS.md | `src/types.ts` |
| `port-data` | Copy all `src/data/` files as-is | DATA_MODELS.md | `src/data/**` |
| `port-theme` | Port theme, rewrite elevation + ThemeContext for web | THEME_UTILS.md | `src/theme/**` |

**Validation gate:** `npx tsc --noEmit` must pass before Phase 2.

### Phase 2 — Components (depends on Phase 1)

| Agent | Task | Reads | Produces |
|-------|------|-------|----------|
| `build-board` | Build AnimatedChessBoard for web (chess.js + HTML grid) | SCREENS_UI.md (board section) | `src/components/AnimatedChessBoard.*` |
| `build-components` | Build all other components (TreeView, GlanceSection, UIPrimitives, SearchBar, etc.) | SCREENS_UI.md | `src/components/*` |

**Validation gate:** `npx tsc --noEmit` must pass before Phase 3.

### Phase 3 — Pages (depends on Phase 2)

| Agent | Task | Reads | Produces |
|-------|------|-------|----------|
| `build-pages` | Build all 6 pages + App.tsx router shell | SCREENS_UI.md | `src/pages/*`, `src/App.tsx` |

**Validation gate:** `npm run build` must succeed.

### Phase 4 — iOS + CI/CD (depends on Phase 3)

| Agent | Task | Reads | Produces |
|-------|------|-------|----------|
| `setup-capacitor` | Add Capacitor, configure iOS project | RN_TO_CAPACITOR_GUIDE.md | `capacitor.config.ts`, `ios/` |
| `setup-ci` | Create codemagic.yaml + GitHub Actions workflow | CODEMAGIC_SETUP.md | `codemagic.yaml`, `.github/workflows/*` |

---

## Rules

- All data files (`src/data/*`, `src/types.ts`) port as-is — no modification
- All colors/spacing from `src/theme/` — no hardcoded hex in components
- CSS goes in `.module.css` files co-located with the component
- No `any` types
- `chess.js` is the only chess dependency — no other board libraries
- No unnecessary packages — keep deps minimal

---

## Git & CI Rules

1. **Never push directly to `main`.** All changes go through a PR branch.
2. **Never merge without user approval.**
3. **Before every push:** `npm run typecheck && npm run build` must pass.
4. **Branch naming:** `feature/`, `fix/`, `chore/` prefixes.
5. **One concern per PR.**
# AGENTS.md — HabitOS-cap Build Guide

## Source of Truth Docs

Before writing any code, read:
1. `AGENTS.md` (this file) — roles, handoff protocol, rules
2. `CODEBASE.md` — current state of the codebase (what exists, file paths, exports)
3. `KNOWN_ISSUES.md` — bugs already solved (check before debugging anything)
4. Then read the specific domain doc for your task (see table below)

**Do NOT read the full product spec unless you need product context. It wastes tokens.**

Domain docs have been removed (conversion complete). For product context, read `CODEBASE.md` or the source code directly.

| Task | Read |
|---|---|
| Conversion methodology for future projects | `RN_TO_CAPACITOR_GUIDE.md` |
| Known issues + solutions | `KNOWN_ISSUES.md` |
| Architecture decisions | `DECISIONS.md` |
| Change requests from owner | `CHANGE_REQUESTS.md` |

---

## Project Stack

- **Vite + React 19 + TypeScript** (strict mode)
- **Capacitor 7** for iOS/Android wrapping
- **CSS Modules** for component styles (no external CSS framework)
- **No routing library** — tab state managed in App.tsx with simple state
- **Storage:** `@capacitor/preferences` (wraps localStorage on web, native KV on iOS)
- **AI:** Direct fetch to Anthropic API (same as original)
- **No Redux / Zustand** — useReducer + Context (same architecture as original)

---

## Source Structure (target)

```
src/
  types/index.ts          — all TypeScript interfaces (port from RN)
  storage/store.ts        — Capacitor Preferences persistence layer
  api/claude.ts           — AI brain-dump parsing (port from RN)
  utils/helpers.ts        — date helpers, ID generation (port from RN)
  theme/index.ts          — design tokens (port from RN)
  context/AppContext.tsx  — global state reducer + context
  components/             — TaskCard, HabitCard, GoalCard, ParsePreview, JournalModal
    *.tsx
    *.module.css
  screens/                — Today, Week, Capture, Goals, Review, Settings
    *.tsx
    *.module.css
  App.tsx                 — tab navigation shell
  main.tsx                — entry point
```

---

## Agent Roles

### Agent: port-foundation
**Task:** Port `types/`, `storage/`, `api/`, `utils/`, `theme/`  
**Reads:** `DATA_MODELS.md`, `AI_PARSING.md`, `THEME_UTILS.md`  
**Produces:** All files in those src folders, type-checks clean

### Agent: port-state
**Task:** Port `context/AppContext.tsx`  
**Reads:** `STATE_MANAGEMENT.md`, `CODEBASE.md` (to see existing types)  
**Produces:** Working context provider + all action functions

### Agent: build-components
**Task:** Build shared UI components (TaskCard, HabitCard, GoalCard, ParsePreview, JournalModal)  
**Reads:** `SCREENS_UI.md` (components section), `CODEBASE.md`, `KNOWN_ISSUES.md`  
**Produces:** All files in `src/components/`

### Agent: build-screens-today-week
**Task:** Build TodayScreen and WeekScreen  
**Reads:** `SCREENS_UI.md` (Today + Week sections), `CODEBASE.md`, `KNOWN_ISSUES.md`  
**Produces:** `src/screens/TodayScreen.tsx` + CSS module

### Agent: build-screens-capture
**Task:** Build CaptureScreen + ParsePreview wiring  
**Reads:** `SCREENS_UI.md` (Capture section), `AI_PARSING.md`, `CODEBASE.md`, `KNOWN_ISSUES.md`  
**Produces:** `src/screens/CaptureScreen.tsx` + CSS module

### Agent: build-screens-goals-review-settings
**Task:** Build GoalsScreen, ReviewScreen, SettingsScreen  
**Reads:** `SCREENS_UI.md` (Goals, Review, Settings sections), `CODEBASE.md`, `KNOWN_ISSUES.md`  
**Produces:** Three screen files + CSS modules

### Agent: build-navigation
**Task:** Build App.tsx navigation shell (tab bar)  
**Reads:** `SCREENS_UI.md` (Navigation section), `CODEBASE.md`  
**Produces:** Updated `App.tsx` with working tab navigation

---

## Handoff Protocol

After completing your task:
1. Update `CODEBASE.md` — add any new files/exports you created
2. Add any bugs you hit + fixes to `KNOWN_ISSUES.md`
3. Add any non-obvious decisions to `DECISIONS.md`
4. Run `npm run typecheck` — must pass before handing off
5. Note what the next agent needs to know

---

## Rules

- Never install packages not already in `package.json` without noting it in `DECISIONS.md`
- CSS goes in `.module.css` files co-located with the component
- All colors/spacing from `src/theme/index.ts` — no hardcoded hex values in components
- API key is never logged or committed
- No `any` types — use proper interfaces from `src/types/index.ts`
- Capacitor Preferences is async — all storage calls must be awaited

---

## Git & CI Rules — NON-NEGOTIABLE

1. **Never push directly to `main`.** All changes go through a PR branch.
2. **Never merge a PR without explicit user approval.** You may open PRs, but merging requires the user to say "merge it".
3. **Before every `git push`, run the validation gate:**
   ```bash
   npm run typecheck && npm run test
   ```
   If either fails, fix the errors before pushing. Do not push broken code.
4. **Branch naming:** `feature/`, `fix/`, `chore/` prefixes. No generic names like `patch` or `update`.
5. **One concern per PR.** Don't bundle unrelated fixes.

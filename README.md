# Chess Openings Learning App

A simple, clean React Native app to learn chess openings by exploring White's first moves and Black's responses.

## Features

- 📱 **Native mobile app** (iOS + Android)
- 🎯 **Simple navigation**: Tap to explore openings
- 🔍 **Search**: Filter by move, name, or concept
- 💡 **Learning-focused**: Intent, responses, example lines, and visual trees
- 📦 **All local data**: No backend, no account needed

## Quick Start

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npx expo start

# Then press:
# - 'w' for web
# - 'a' for Android emulator
# - 'i' for iOS simulator
# - Scan QR code with Expo Go app on your phone
```

## Project Structure

```
chess-openings-app/
├── app/                      # Expo Router screens
│   ├── _layout.tsx           # Root navigation
│   ├── index.tsx             # Home screen (list of openings)
│   └── move/[id].tsx         # Detail screen
├── src/
│   ├── components/
│   │   └── TreeView.tsx      # Recursive tree component
│   ├── data/
│   │   ├── builders.ts       # Helper functions for creating openings
│   │   └── openings.ts       # All opening data (EDIT THIS to add content)
│   └── types.ts              # TypeScript interfaces
├── ADDING_OPENINGS.md        # Guide for adding new openings
└── README.md                 # This file
```

## Adding New Openings

See **[ADDING_OPENINGS.md](./ADDING_OPENINGS.md)** for detailed instructions.

**Quick example:**

```typescript
// In src/data/openings.ts

const e4_d5 = createOpening({
  id: 'e4_d5',
  move: '... d5',
  name: 'Scandinavian Defense',
  intent: [
    'Challenge the e4 pawn immediately',
    'Force White to make an early decision',
  ],
  lines: ['1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5'],
  tree: [tree('1. e4 d5', [tree('2. exd5')])],
});
```

## Current Content

### White's First Moves
- **1. e4** - King's Pawn Opening
- **1. d4** - Queen's Pawn Opening
- **1. c4** - English Opening
- **1. Nf3** - Réti Opening
- **1. b3** - Larsen Opening

### Black's Responses
- To 1. e4: Sicilian, Open Games, French, Caro-Kann
- To 1. d4: Closed Games, Indian Defenses
- To 1. c4: Reversed Sicilian, Symmetrical English
- To 1. Nf3: Réti Proper, Double Fianchetto
- To 1. b3: Central Counter, Solid Center

**Total: 22 opening nodes** covering the most common first moves and responses.

## Tech Stack

- **Expo** - React Native framework
- **expo-router** - File-based navigation
- **TypeScript** - Type safety
- **React Native** - Mobile UI

## Design Philosophy

### Simple & Focused
- No accounts, no backend, no analytics
- Local data only
- Fast and offline-ready

### Learner-Friendly
- Show the "why" (intent) not just the "what" (moves)
- Keep content digestible (2-3 bullets, 2-4 lines)
- Visual tree to understand branching

### Easy to Extend
- Helper functions reduce boilerplate
- Clear structure for adding openings
- Well-documented with examples

## Future Ideas

- [ ] Bookmark/save favorite openings
- [ ] Recently viewed history
- [ ] Interactive chessboard display
- [ ] Spaced repetition quiz mode
- [ ] Import/export custom opening sets

## Contributing

Want to add more openings? See [ADDING_OPENINGS.md](./ADDING_OPENINGS.md)!

## License

MIT - Feel free to use and extend this for your own learning or apps.

---

Built with ♟️ by chess enthusiasts, for chess enthusiasts.

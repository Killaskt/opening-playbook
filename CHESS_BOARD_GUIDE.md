# Interactive Chess Board Guide

## Overview

The app now features an **animated interactive chess board** that visualizes opening lines move-by-move. The board automatically parses PGN (Portable Game Notation) and displays each move with smooth animations.

## Features

### 🎯 What It Does

- **Reads PGN notation**: Accepts standard chess notation like `1. e4 c5 2. Nf3 d6 3. d4`
- **Smooth animations**: Pieces animate when moving between squares
- **Step-through controls**: Navigate through moves with Previous/Next buttons
- **Move counter**: Shows current move number and notation
- **Visual feedback**: Disabled buttons when at start/end of sequence

### 🎮 Controls

- **Reset (⏮)**: Return to starting position
- **Prev (◀)**: Go back one move
- **Next (▶)**: Advance one move
- **End (⏭)**: Jump to final position

### 📱 Usage

The chess board appears on each opening's detail page, showing the first example line. Click through the moves to see how the position develops.

## Technical Details

### Libraries Used

1. **chess.js** (latest)
   - Chess logic and move validation
   - PGN parsing
   - Board state management

2. **Custom React Native Components**
   - No external chess board library needed
   - Uses only basic React Native components (View, Text, Pressable)
   - Unicode chess piece symbols (♔♕♖♗♘♙)
   - Zero native dependencies - works perfectly with Expo

### Component: AnimatedChessBoard

**Location**: `src/components/AnimatedChessBoard.tsx`

**Props**:
- `pgn` (string): The PGN notation to visualize

**Example**:
```tsx
<AnimatedChessBoard pgn="1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4" />
```

**Features**:
- 8x8 chess board with alternating light/dark squares
- Unicode chess pieces (♔♕♖♗♘♙ for white, ♚♛♜♝♞♟ for black)
- Coordinate labels (a-h, 1-8) on the edges
- Square highlighting when moves are made (green highlight for 800ms)
- Responsive controls with proper disabled states

### How It Works

1. **PGN Parsing**: Cleans and tokenizes the PGN string, removing move numbers
2. **Move Validation**: Uses chess.js to validate each move
3. **State Management**: Tracks current position, move index, and board state
4. **Board Rendering**: Renders 64 squares using React Native View components
5. **Visual Feedback**: Highlights the from/to squares when a move is made
6. **Piece Display**: Uses Unicode chess symbols rendered as Text components

## Adding New Features

### Multiple Line Selection

Add a picker to let users choose which example line to visualize:

```tsx
const [selectedLineIndex, setSelectedLineIndex] = useState(0);

<AnimatedChessBoard pgn={opening.lines[selectedLineIndex]} />
```

### Custom Board Colors

Edit the square styles in `AnimatedChessBoard.tsx`:

```tsx
lightSquare: {
  backgroundColor: '#f0d9b5',  // Light squares
},
darkSquare: {
  backgroundColor: '#b58863',  // Dark squares
},
```

### Adjust Board Size

Change the `SQUARE_SIZE` constant (default is 42):

```tsx
const SQUARE_SIZE = 45; // Makes the board larger
```

## Performance Notes

- **Lightweight**: Uses only basic React Native components
- **No Native Dependencies**: Works perfectly with Expo, no need for prebuild
- **Efficient Rendering**: Only re-renders when board state changes
- **Move Validation**: Happens once during PGN parsing
- **Small Bundle**: Unicode pieces mean no image assets needed
- **Board Size**: 336px (8 × 42px squares) - perfect for mobile screens

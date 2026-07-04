# Theme & Utilities

## Theme System

All theme files live in `src/theme/`. The entire app is wrapped in `ThemeProvider` which exposes colors, spacing, typography, elevation, and mode via React context.

### ThemeContext (`ThemeContext.tsx`)

```typescript
// Usage in any component:
const { colors, spacing, typography, elevation, mode, isDark } = useTheme()
```

- **Mode cycling:** system → light → dark → system (via `cycleMode()`)
- **System detection:** Uses `useColorScheme()` (RN hook — replace with `prefers-color-scheme` media query)
- **Memoized:** Context value is memoized to prevent unnecessary re-renders

---

### Colors (`colors.ts`)

Two complete palettes: `lightColors` and `darkColors`, both implementing `ThemeColors`.

**Key color groups:**

| Group | Keys |
|-------|------|
| Backgrounds | `bg`, `card`, `cardGlass`, `cardGlassStrong`, `cardPressed` |
| Text | `text`, `textSecondary`, `textTertiary`, `textMuted`, `textInverse` |
| Borders | `border`, `borderLight`, `glassBorder` |
| Status | `green`, `teal`, `purple`, `orange`, `red`, `yellow` (each with `…Bg` variant) |
| Semantic | `accent` (#2e78b7 light), `accentBg`, `highlight`, `highlightBorder`, `highlightBg`, `highlightFrost` |
| Inputs | `inputBg`, `inputBorder`, `chipBg` |
| Navigation | `tabBarBg`, `tabBarBorder`, `tabBarActive`, `tabBarInactive`, `headerBg` |
| Buttons | `buttonBg`, `buttonDisabledBg` |
| Chess | `lightSquare`, `darkSquare`, `boardBorder`, `moveCounterBg`, `arrowMove`, `arrowAnnotation`, `squareHighlightLight`, `squareHighlightDark` |
| Effects | `shadow` |

**Light base:** off-white `#faf8f5`, text `#222`, accent blue `#2e78b7`  
**Dark base:** dark equivalent palette

---

### Spacing (`spacing.ts`)

```typescript
const spacing = {
  xxs: 2, xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32, huge: 40
}
```

---

### Typography (`typography.ts`)

```typescript
const typography = {
  titleXL:  { fontSize: 27, fontWeight: '800' },
  titleLG:  { fontSize: 22, fontWeight: '700' },
  titleMD:  { fontSize: 19, fontWeight: '600' },
  titleSM:  { fontSize: 17, fontWeight: '600' },
  bodyLG:   { fontSize: 15 },
  bodyMD:   { fontSize: 14 },
  bodySM:   { fontSize: 13 },
  label:    { fontSize: 13, fontWeight: '600' },
  labelSM:  { fontSize: 11, fontWeight: '600' },
  mono:     { fontFamily: 'monospace' },
}
```

---

### Elevation (`elevation.ts`)

Platform-aware shadows. Replace with CSS `box-shadow` for web.

```typescript
const elevation = {
  none: { /* no shadow */ },
  sm:   { shadowOffset: {w:0,h:1}, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 },
  md:   { shadowOffset: {w:0,h:2}, shadowOpacity: 0.12, shadowRadius: 6, elevation: 4 },
  lg:   { shadowOffset: {w:0,h:4}, shadowOpacity: 0.16, shadowRadius: 12, elevation: 8 },
}
```

**Web equivalent:**
```css
--elevation-sm: 0 1px 3px rgba(0,0,0,0.08);
--elevation-md: 0 2px 6px rgba(0,0,0,0.12);
--elevation-lg: 0 4px 12px rgba(0,0,0,0.16);
```

---

### Opening Style Colors (`openingStyles.ts`)

Maps opening styles to color pairs for badges/tags:

```typescript
openingStyleColors: Record<OpeningStyle, { bg, darkBg, text, darkText }>
// sharp → red tones, solid → blue-gray, positional → teal, aggressive → orange, etc.

openingTypeColors: Record<OpeningType, { light, dark }>
// opening → blue, defense → green, system → purple, gambit → orange
```

---

## Migration Notes for Capacitor

| RN Concept | Web Replacement |
|------------|----------------|
| `StyleSheet.create()` | CSS modules, inline styles, or Tailwind |
| `Animated.Value` / `Animated.spring` | CSS transitions, Framer Motion, or Web Animations API |
| `Platform.OS === 'ios'` | Remove or use feature detection |
| `elevation` (Android) | CSS `box-shadow` |
| `useColorScheme()` | `window.matchMedia('(prefers-color-scheme: dark)')` |
| `SafeAreaView` | CSS `env(safe-area-inset-*)` |
| `StatusBar` | `<meta name="theme-color">` or Capacitor StatusBar plugin |

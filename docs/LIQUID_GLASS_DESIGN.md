# Liquid Glass Design System

## Design Philosophy

Liquid Glass is Apple's visual language introduced in iOS 26 / visionOS, built around the idea that UI surfaces behave like translucent glass panels floating in physical space. Instead of flat opaque layers, every card, header, and nav bar is a semi-transparent pane that refracts the content behind it through blur and chromatic saturation.

Key differences from flat or material design:

- **Vibrancy over opacity**: Surfaces use `backdrop-filter: blur() saturate()` rather than a single opaque color, so content behind them contributes to the perceived hue and brightness.
- **Specular highlights**: A thin inset top highlight (`inset 0 1px 0 rgba(255,255,255,N)`) simulates light hitting the top edge of a glass surface.
- **Depth shadows**: External drop-shadows differentiate floating elements (nav island, jumper) from content.
- **Spring physics for motion**: Interactive state changes use `cubic-bezier(0.34, 1.56, 0.64, 1)` — this is the UIKit spring easing, which overshoots briefly before settling, giving interactions a tactile, physical feel.
- **Dark / light duality**: Dark mode uses dark-tinted translucent glass (near-black base + low-opacity white specular); light mode uses white frosted glass (near-white base + high-opacity white specular).

---

## Core Properties Table

| Surface | `backdrop-filter` | Background opacity | Specular highlight | External shadow |
|---------|-------------------|--------------------|--------------------|-----------------|
| Floating nav island | `blur(40px) saturate(1.8)` | dark: 0.72 / light: 0.62 | dark: `rgba(255,255,255,0.06)` / light: `rgba(255,255,255,0.90)` | `0 8px 32px rgba(0,0,0,0.45)` dark / `0 8px 32px rgba(0,0,0,0.12)` light |
| Sticky header | `blur(28px) saturate(1.6)` | dark: 0.88 / light: 0.84 | via `glassSpecularLight` token | border-bottom only |
| Cards (GlassCard, MoveCard, EntryCard) | `blur(20–28px) saturate(1.4–1.6)` | dark: 0.72 / light: 0.68 | `inset 0 1px 0 glassSpecularLight` | `0 2px 8–12px rgba(0,0,0,0.06–0.07)` |
| Section jumper | `blur(24px) saturate(1.5)` | dark: 0.88 / light: 0.84 | `inset 0 1px 0 glassSpecularLight` | `0 4px 16px rgba(0,0,0,0.14)` |

### Spring easing

```
cubic-bezier(0.34, 1.56, 0.64, 1)
```

Used for the nav pill indicator slide, tab scale, and icon translate-Y. Produces a 6% overshoot that settles quickly — matching UIKit's spring feel.

---

## Color Token Reference

New tokens added to `ThemeColors` in `src/theme/colors.ts`:

| Token | Light value | Dark value | Purpose |
|-------|-------------|------------|---------|
| `glassSpecularLight` | `rgba(255,255,255,0.80)` | `rgba(255,255,255,0.80)` | Inset top-edge highlight on glass surfaces (both themes use same value, because the surrounding glass base adjusts the perceived brightness) |
| `glassSpecularDark` | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.08)` | Reserved for contexts where a subtle specular is needed; currently available for custom use |
| `glassBlur` | `'blur(28px) saturate(1.6)'` | `'blur(28px) saturate(1.6)'` | Shared blur string for cards and headers; avoids hard-coding in each component |

Updated existing glass tokens:

| Token | Old light | New light | Old dark | New dark |
|-------|-----------|-----------|----------|----------|
| `cardGlass` | `rgba(255,255,255,0.78)` | `rgba(255,255,255,0.68)` | `rgba(36,36,44,0.82)` | `rgba(30,30,40,0.72)` |
| `cardGlassStrong` | `rgba(255,255,255,0.90)` | `rgba(255,255,255,0.84)` | `rgba(36,36,44,0.95)` | `rgba(28,28,36,0.88)` |
| `glassBorder` | `rgba(255,255,255,0.60)` | `rgba(255,255,255,0.65)` | `rgba(255,255,255,0.10)` | `rgba(255,255,255,0.12)` |

Reducing card opacity ensures sufficient content is visible through the blur; the lower value is intentional.

---

## Component-Level Specs

| Component | Glass properties | Blur | Border | Specular |
|-----------|-----------------|------|--------|----------|
| `LiquidTabBar` | Floating pill island | `blur(40px) saturate(1.8)` | 1px solid, dark=10% white / light=80% white | inset 0 1px 0: dark=6% white / light=90% white |
| `LiquidTabBar` — pill indicator | Active tab background | none | same as card | `inset 0 1px 0 rgba(255,255,255,0.08/0.90)` |
| `ScreenHeader` | Sticky; separating bottom border | `blur(28px) saturate(1.6)` | `1px solid glassBorder` (bottom) | via `cardGlassStrong` bg |
| `GlassCard` | All cards using GlassCard wrapper | `blur(28px) saturate(1.6)` | 1px solid `glassBorder` | `inset 0 1px 0 glassSpecularLight` |
| `SearchBar` | Transparent input over GlassCard base | inherited from GlassCard | none on input | inherited from GlassCard |
| `SectionJumper` | Floating jumper pill | `blur(24px) saturate(1.5)` | 1px solid `glassBorder` | `inset 0 1px 0 glassSpecularLight` |
| `MoveCard` | Card in MovesPage | `blur(20px) saturate(1.4)` | 1px solid `glassBorder` | `inset 0 1px 0 glassSpecularLight` |
| `EntryCard` | Card in LibraryPage | `blur(20px) saturate(1.4)` | 1px solid `glassBorder` | `inset 0 1px 0 glassSpecularLight` |

---

## Dark vs Light Variants

**Light mode** ("white frosted glass"):
- Base color: high-opacity white (`rgba(255,255,255,0.62–0.84)`)
- Border: near-opaque white (`rgba(255,255,255,0.65–0.80)`)
- Specular: strong white ring (`rgba(255,255,255,0.80–0.90)`)
- Shadows: subtle (`rgba(0,0,0,0.06–0.12)`)
- The blur reveals the warm off-white background (`#faf8f5`) through the glass

**Dark mode** ("dark tinted glass"):
- Base color: near-black with low opacity (`rgba(28–30,28–30,36–40,0.72–0.88)`)
- Border: faint white (`rgba(255,255,255,0.10–0.12)`)
- Specular: very subtle white ring (`rgba(255,255,255,0.06–0.08)`)
- Shadows: strong (`rgba(0,0,0,0.14–0.45)`)
- The blur reveals the dark background (`#111113`) creating a layered depth effect

The `isDark` flag from `useTheme()` is used in `LiquidTabBar` to branch between these sets of values directly. All other components use `colors.*` tokens which already resolve to the correct variant.

---

## Accessibility Note

Heavy use of `backdrop-filter` can be taxing for users who have enabled "Reduce Motion" or "Reduce Transparency" in their OS accessibility settings. Components in this design system apply blur unconditionally, which is acceptable for a web app where GPU compositing is expected. However, if adding a native iOS wrapper via Capacitor, the OS will automatically reduce transparency at the system level.

For a fully accessible web fallback, add this media query to your global CSS or `index.css`:

```css
@media (prefers-reduced-motion: reduce), (prefers-contrast: more) {
  /* Fallback: remove blur, use opaque backgrounds */
  * {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
}
```

For individual components in TypeScript, you can detect this preference:

```typescript
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const backdropFilter = reduceMotion ? 'none' : 'blur(28px) saturate(1.6)';
const backgroundColor = reduceMotion ? colors.card : colors.cardGlass;
```

---

## Future Extensibility

### Adding a new glass surface

1. Add a `backgroundColor` using one of: `colors.cardGlass`, `colors.cardGlassStrong`, or a custom `rgba()` value at your desired opacity level.
2. Add `backdropFilter` and `WebkitBackdropFilter` using `colors.glassBlur` (for cards) or `'blur(40px) saturate(1.8)'` (for prominent nav elements).
3. Add border: `1px solid ${colors.glassBorder}`.
4. Add specular highlight: `boxShadow: \`inset 0 1px 0 ${colors.glassSpecularLight}, ...\``.
5. For floating elements, add an external shadow for depth.

### Adding new glass tokens

Add the token to `ThemeColors` interface in `src/theme/colors.ts`, then add a value to both `lightColors` and `darkColors`. The TypeScript compiler will enforce that both palettes satisfy the interface before any build can succeed.

### Token inheritance pattern

Components never hard-code rgba values. All glass properties flow from `colors.*` tokens. When you need to introduce a new level of glass intensity (e.g., a modal overlay), add a new token pair (`modalGlass` / `modalGlassStrong`) rather than inlining rgba values in the component.

---

*See also: [SCREENS_UI.md](./SCREENS_UI.md) for the component inventory including updated glass surface notes.*

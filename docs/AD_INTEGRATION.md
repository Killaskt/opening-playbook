# Ad Integration

## Strategy

Ads are interleaved as native-looking glass cards within the Moves and Library list views. The system uses static house-ad content — no third-party SDK is required, making it easy to replace with a real ad network later.

---

## Placement

| View | Frequency | Guard |
|------|-----------|-------|
| **MovesPage** | Every `AD_FREQUENCY_MOVES` (5) items | Skipped entirely when `moves.length <= 2` |
| **LibraryPage** (per section) | Every `AD_FREQUENCY_LIBRARY` (7) items | Skipped for sections with `<= 4` entries |

Ads are inserted *after* the Nth item using the `shouldShowAd(index, frequency)` helper:

```ts
// Returns true when an ad should follow the item at `index`
export function shouldShowAd(index: number, frequency: number): boolean {
  return index > 0 && index % frequency === 0;
}
```

---

## Design

- **Glass card**: `borderRadius: 16`, `backgroundColor: colors.cardGlass`, `backdropFilter: blur(16px)` — visually consistent with content cards but using the glass-tinted background variant.
- **Sponsored badge**: Small italic label (`"Sponsored"`) in top-right corner using `colors.textMuted` — clearly labeled without being intrusive.
- **Non-interactive card body**: `cursor: default` on the outer card. Only the CTA button is interactive.
- **CTA button**: Accent-colored pill button; fires `onPress` callback if provided.

---

## House Ads

The `HOUSE_ADS` array in `src/components/AdBanner.tsx` contains the static ad content:

```ts
interface HouseAd {
  icon: string;       // emoji
  headline: string;
  tagline: string;
  cta: string;        // call-to-action button label
}

const HOUSE_ADS: HouseAd[] = [
  { icon: '♟', headline: 'Master Your Openings', tagline: '...', cta: 'Try Premium' },
  { icon: '♜', headline: 'Play Live Chess',       tagline: '...', cta: 'Play Now'    },
  { icon: '♛', headline: 'Opening Trainer',       tagline: '...', cta: 'Start Training' },
];
```

Ads rotate by index: `HOUSE_ADS[adIndex % HOUSE_ADS.length]`. Add or edit entries freely.

---

## Replacing with a Real Ad Network

### Option A — AdMob via Capacitor (iOS / Android)

1. Install the plugin:
   ```bash
   npm install @capacitor-community/admob
   npx cap sync
   ```
2. Add your Ad Unit ID to `.env`:
   ```
   VITE_AD_UNIT_ID=ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY
   ```
3. Replace the `AdCard` JSX render with the AdMob interstitial or banner call from the plugin.
4. Remove `HOUSE_ADS` and `shouldShowAd` if the SDK manages its own placement logic.

### Option B — Google AdSense (web)

1. Add the AdSense script to `index.html`.
2. Replace `<AdCard>` with:
   ```html
   <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="YYYYYYYYYY"
        data-ad-format="auto">
   </ins>
   ```
3. Call `(adsbygoogle = window.adsbygoogle || []).push({})` after mounting.

---

## Frequency Tuning

Change the constants in `src/components/AdBanner.tsx`:

```ts
export const AD_FREQUENCY_MOVES = 5;    // ad every 5 moves
export const AD_FREQUENCY_LIBRARY = 7;  // ad every 7 entries per section
```

---

## Disabling Ads

Two options:

1. **Set frequency to a large number** (quick toggle):
   ```ts
   export const AD_FREQUENCY_MOVES = 9999;
   export const AD_FREQUENCY_LIBRARY = 9999;
   ```

2. **Feature flag** (cleaner for env-based control):
   ```ts
   const SHOW_ADS = import.meta.env.VITE_SHOW_ADS !== 'false';

   export function shouldShowAd(index: number, frequency: number): boolean {
     return SHOW_ADS && index > 0 && index % frequency === 0;
   }
   ```
   Then set `VITE_SHOW_ADS=false` in `.env.development` to suppress ads locally.

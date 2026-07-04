# Google AdMob

Banner ads via [`@capacitor-community/admob`](https://github.com/capacitor-community/admob)
(the Capacitor-7 line, `^7.2.0`).

## Current state — off by default

`ADS_ENABLED` in `src/lib/ads.ts` is `false`, so **nothing shows and nothing
initializes**. Every ads function is a no-op until you flip it on. This keeps the
integration safe to merge without changing the app.

## How it's wired

- `src/lib/ads.ts` — the master switch, test unit IDs, `initializeAds()` (SDK +
  iOS App Tracking Transparency), `showBanner()` / `hideBanner()`.
- `src/components/AdBanner.tsx` — a render-nothing component that shows/hides the
  native banner via the plugin; rendered once in `App.tsx`.
- `src/main.tsx` — calls `initializeAds()` on launch.
- `codemagic.yaml` → **Configure AdMob** step injects the required `Info.plist`
  keys (`GADApplicationIdentifier`, `GADIsAdManagerApp`,
  `NSUserTrackingUsageDescription`) because `npx cap add ios` regenerates the
  native project each build.

## Ads are NOT OTA-updatable

AdMob is a native SDK, so adding/enabling it requires a full Codemagic build +
App Store submission — it can't ship through the OTA channel.

## Going live (real ads)

1. Create an [AdMob](https://admob.google.com) account, register the iOS app, and
   create a **banner ad unit**. Note the **App ID** (`ca-app-pub-…~…`) and the
   **ad unit ID** (`ca-app-pub-…/…`).
2. In Codemagic, add `ADMOB_APP_ID` to the `chess` variable group with your real
   App ID (the CI step falls back to Google's test App ID otherwise).
3. In `src/lib/ads.ts`: replace the test `BANNER_AD_ID` values with your real ad
   unit IDs, set `isTesting: false`, and set `ADS_ENABLED = true`.
4. Verify banner **placement on a device** — the banner is a native overlay at
   `TOP_CENTER`; confirm it doesn't cover the page headers or the floating tab
   bar, and adjust `position` / add layout padding (`AD_BANNER_HEIGHT`) as needed.
5. Complete Apple's App Privacy questionnaire (AdMob collects identifiers/tracks)
   and, recommended, add `SKAdNetworkItems` to `Info.plist` for attribution.

> Keep `isTesting: true` and the test IDs while developing — live ads on a
> non-approved app can get the AdMob account flagged for invalid activity.

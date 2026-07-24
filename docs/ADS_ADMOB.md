# Google AdMob

Banner ads via [`@capacitor-community/admob`](https://github.com/capacitor-community/admob)
(the Capacitor-7 line, `^7.2.0`).

## Current state — off by default

`ADS_ENABLED` in `src/lib/ads.ts` is `true`. Ads are live.

## How it's wired

- `src/lib/ads.ts` — the master switch, real unit IDs, `initializeAds()` (SDK +
  iOS App Tracking Transparency), `showInterstitial()` / `prepareInterstitial()`.
- `src/components/AdBanner.tsx` — a render-nothing component that calls `prepareInterstitial()`
  to quietly buffer the ad.
- `src/pages/OpeningDetailPage.tsx` — tracks clicks using `sessionStorage` and triggers
  `showInterstitial()` every 7th view.
- `src/main.tsx` — calls `initializeAds()` on launch.
- `codemagic.yaml` → **Configure AdMob** step injects the required `Info.plist`
  keys (`GADApplicationIdentifier`, `GADIsAdManagerApp`,
  `NSUserTrackingUsageDescription`) because `npx cap add ios` regenerates the
  native project each build.

## In-feed "sponsored card" slots

`src/components/SponsoredCard.tsx` renders an ad slot styled to match the app's
cards, placed inline in the Library scroll (after the first section) and at the
bottom of the Moves list. Like everything else here it's gated by `ADS_ENABLED`.

**These are card-styled placeholders, not live Google ads.** Google AdMob's
Capacitor plugin supports only banner / interstitial / rewarded formats — **not
native (custom-rendered) ads** — and banner ads are fixed native overlays that
cannot be inlined into a scrolling list. To actually fill these slots with Google
ads you need a native-ad-capable plugin (custom native iOS/Android work) or a
different ad provider. The `SponsoredCard` layout is ready for that data.

To preview the slots during development, set `ADS_ENABLED = true` in
`src/lib/ads.ts` — the placeholder cards will appear in-feed (this does not serve
real ads).

## Ads are NOT OTA-updatable

AdMob is a native SDK, so adding/enabling it requires a full Codemagic build +
App Store submission — it can't ship through the OTA channel.

## Going live (real ads)

1. Keep `ADMOB_APP_ID` in the Codemagic `chess` variable group with the real App ID.
2. Complete Apple's App Privacy questionnaire (AdMob collects identifiers/tracks)
   and, recommended, add `SKAdNetworkItems` to `Info.plist` for attribution.

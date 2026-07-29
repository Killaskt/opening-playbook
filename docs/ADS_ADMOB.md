# Google AdMob

Interstitial (full-screen) ads via
[`@capacitor-community/admob`](https://github.com/capacitor-community/admob)
(the Capacitor-7 line).

## Format: interstitial only

There are **no banner ads and no in-feed "sponsored" cards**. The app shows a
single full-screen interstitial on a frequency trigger. (House-ad placeholder
cards were removed — there is no premium plan to promote.)

## Test vs. real ads — one switch

`USE_TEST_ADS` in `src/lib/ads.ts` controls which ads serve:

| Value | Serves | Use for |
|-------|--------|---------|
| `true` (current) | Google's public **test** interstitial — always fills, safe to tap, **earns nothing** | On-device QA / verifying the integration |
| `false` | Your **real** interstitial unit | Production / App Store build |

`ADS_ENABLED` is the higher-level master switch (must be `true` for any ad code
to run). Both live in `src/lib/ads.ts`.

## How it's wired

- `src/lib/ads.ts` — `ADS_ENABLED`, `USE_TEST_ADS`, the test + real unit IDs,
  `initializeAds()` (SDK + iOS App Tracking Transparency),
  `prepareInterstitial()` / `showInterstitial()`.
- `src/components/AdBanner.tsx` — renders nothing; calls `prepareInterstitial()`
  on mount to buffer the first ad.
- `src/pages/OpeningDetailPage.tsx` — counts opening-detail views in
  `sessionStorage` and calls `showInterstitial()` **every 7th view** (resets on
  app restart). Note: only the `/opening-detail` route counts, not move pages —
  so to see a test ad you must open 7 library entries that route there.
- `src/main.tsx` — calls `initializeAds()` on launch.
- `codemagic.yaml` → **Configure AdMob** step injects the required `Info.plist`
  keys (`GADApplicationIdentifier`, `GADIsAdManagerApp`,
  `NSUserTrackingUsageDescription`) because `npx cap add ios` regenerates the
  native project each build.

## Codemagic: set your real AdMob App ID

The **Configure AdMob** step reads `ADMOB_APP_ID` and defaults to Google's public
**test** app id when it's unset. For a real build you must set your own:

1. In Codemagic → your app → **Environment variables**.
2. Add a variable to the **`chess`** group:
   - **Name:** `ADMOB_APP_ID`
   - **Value:** your AdMob app id, format `ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY`
     (from AdMob console → Apps → your app → App settings). Note the `~`
     separator — the app id is **not** the same as an ad-unit id, which uses `/`.
   - Leave it **unsecured** (it's not a secret) so the build log is readable.
3. Re-run the build. The step will stamp your real app id into `Info.plist`.

## Going live (real ads) — checklist

1. Put your real interstitial unit id in `REAL_INTERSTITIAL_AD_ID.ios` in
   `src/lib/ads.ts` (and Android if/when you ship Android).
2. Set `USE_TEST_ADS = false` in `src/lib/ads.ts`.
3. Set `ADMOB_APP_ID` in the Codemagic `chess` group (above).
4. Complete Apple's App Privacy questionnaire (AdMob collects identifiers /
   tracks) and, recommended, add `SKAdNetworkItems` to `Info.plist` for
   attribution.

> New AdMob accounts/units often return "no fill" for hours to a couple of days
> after creation, and can't serve until the account is approved. Expect real ads
> to be intermittent at first even after step 2.

## Ads are NOT OTA-updatable

AdMob is a native SDK, so adding/enabling it requires a full Codemagic build +
App Store submission — it can't ship through the Capgo OTA channel. Toggling
`USE_TEST_ADS` / `ADS_ENABLED` is a code change and also needs a native build.

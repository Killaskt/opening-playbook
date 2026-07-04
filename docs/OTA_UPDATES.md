# Over-the-Air (OTA) Updates

Ship web-layer changes (React/TS, CSS, HTML — anything that compiles into `dist`)
to installed apps **without an App Store review**, using
[Capgo](https://capgo.app) (`@capgo/capacitor-updater`).

## What can and cannot ship OTA

| Change | OTA? |
|---|---|
| UI, styling, copy, routing, business logic — anything in `src/` | ✅ Yes |
| Adding/updating a Capacitor **plugin** (native code) | ❌ Full build + store submission |
| Changes to `capacitor.config.ts`, native projects, app icons/splash | ❌ Full build |
| Bumping the native app version / build number | ❌ Full build |

Apple permits JS/asset OTA updates as long as they don't change the app's
primary purpose. Keep native and OTA changes in separate releases.

## How it's wired

- `@capgo/capacitor-updater` is a dependency; `npx cap sync ios` links it natively.
- `src/lib/liveUpdates.ts` calls `notifyAppReady()` on launch (native only). This
  confirms the running bundle is healthy so the plugin won't roll it back.
- `capacitor.config.ts` sets `CapacitorUpdater.autoUpdate: false` by default, so
  **until you complete the setup below, nothing changes** — the app runs its
  built-in bundle.

## One-time setup (required before OTA does anything)

1. Create a Capgo account and register the app:
   ```bash
   npx @capgo/cli@latest login <YOUR_CAPGO_API_KEY>
   npx @capgo/cli@latest app add com.killaskt.openingplaybook
   ```
2. Add your Capgo API key to CI as a secret named `CAPGO_TOKEN` (Codemagic
   variable group `chess`, and/or GitHub Actions secrets).
3. Enable auto-updates: set `CapacitorUpdater.autoUpdate` to `true` in
   `capacitor.config.ts` and ship one **full** build so the plugin ships inside
   the native app. (Auto-update only takes effect from that build onward.)

## Shipping an OTA update

After the one-time setup, for any web-only change:

```bash
npm run build                              # produces dist/
npm run ota:deploy -- --channel production # uploads the bundle to Capgo
```

Installed apps pick up the new bundle on their next launch (or per Capgo's
channel settings). No rebuild, no store review.

> Self-hosting instead of Capgo cloud is supported — set `updateUrl` /
> `statsUrl` / `channelUrl` under `CapacitorUpdater` in `capacitor.config.ts`
> and point them at your server. See the plugin docs.

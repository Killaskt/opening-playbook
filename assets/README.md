# App assets

`assets/icon.png` is the **source** app icon. Codemagic's **Generate app icon**
step runs `npx @capacitor/assets generate --ios` on every build to bake it into
the regenerated `ios/` project (the native folder is not committed).

## Icon requirements — or App Store Connect rejects the build

- **1024 × 1024 px**, PNG
- **Opaque** — no alpha / transparency channel
- **Full-bleed square** — the background must fill the entire canvas, with
  **no rounded corners** (iOS applies the rounded mask itself)

To change the app icon, replace `assets/icon.png` with a file meeting the above.

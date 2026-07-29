import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.killaskt.openingplaybook',
  appName: 'Opening Playbook',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      style: 'DEFAULT',
      overlaysWebView: false,
    },
    // Over-the-air updates via Capgo (see docs/OTA_UPDATES.md). autoUpdate is on:
    // on each launch the app checks the `production` channel for a newer bundle
    // and applies it. This must ship inside a native build to take effect — it
    // can't be enabled OTA later.
    CapacitorUpdater: {
      autoUpdate: true,
      defaultChannel: 'production',
    },
  },
}

export default config

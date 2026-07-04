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
    // Over-the-air updates via Capgo. autoUpdate stays false until a Capgo
    // account (or self-hosted update server) is configured — see
    // docs/OTA_UPDATES.md. When false the app simply runs its built-in bundle.
    CapacitorUpdater: {
      autoUpdate: false,
    },
  },
}

export default config

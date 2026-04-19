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
  },
}

export default config

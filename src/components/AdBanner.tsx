import { AD_BANNER_HEIGHT } from '../lib/ads';

export { AD_BANNER_HEIGHT };

// Renders nothing. The first interstitial is pre-loaded inside initializeAds()
// once the SDK is ready (see src/lib/ads.ts) to avoid an init/prepare race, so
// this component no longer needs to trigger the preload itself.
export function AdBanner() {
  return null;
}

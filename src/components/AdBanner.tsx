import { useEffect } from 'react';
import { prepareInterstitial, AD_BANNER_HEIGHT } from '../lib/ads';

export { AD_BANNER_HEIGHT };

// ─── Native AdMob interstitial pre-loader ────────────────────────────────────
// Renders nothing in the DOM. Pre-loads the first interstitial on mount so it's
// ready to show immediately when triggered by navigation.
export function AdBanner() {
  useEffect(() => {
    void prepareInterstitial();
  }, []);
  return null;
}

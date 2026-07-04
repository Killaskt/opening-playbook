import { useEffect } from 'react';
import { showBanner, hideBanner } from '../lib/ads';

export { AD_BANNER_HEIGHT } from '../lib/ads';

/**
 * Drives the native AdMob banner. Renders nothing in the DOM — the banner is a
 * native overlay shown/hidden through the plugin. No-op on web or when ads are
 * disabled (see ADS_ENABLED in ../lib/ads).
 */
export function AdBanner() {
  useEffect(() => {
    void showBanner();
    return () => {
      void hideBanner();
    };
  }, []);

  return null;
}

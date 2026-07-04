import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  BannerAdSize,
  BannerAdPosition,
  type BannerAdOptions,
} from '@capacitor-community/admob';

/**
 * Master switch for ads. Stays false until real AdMob unit IDs are set and the
 * banner placement has been verified on a device (see docs/ADS_ADMOB.md). While
 * false, every function here is a no-op, so merging changes nothing at runtime.
 */
export const ADS_ENABLED = false;

/**
 * Google's official AdMob **test** unit IDs — safe to use during development
 * and never generate real revenue or invalid-traffic flags. Swap for your real
 * unit IDs (or wire them via a build-time env) before shipping ads for real.
 */
const BANNER_AD_ID = {
  ios: 'ca-app-pub-3940256099942544/2934735716',
  android: 'ca-app-pub-3940256099942544/6300978111',
};

/** Height (px) the layout should reserve for the banner; 0 when ads are off. */
export const AD_BANNER_HEIGHT = ADS_ENABLED ? 50 : 0;

function bannerAdId(): string {
  return Capacitor.getPlatform() === 'ios' ? BANNER_AD_ID.ios : BANNER_AD_ID.android;
}

/** Initialize the AdMob SDK and handle iOS App Tracking Transparency. */
export async function initializeAds(): Promise<void> {
  if (!ADS_ENABLED || !Capacitor.isNativePlatform()) return;
  try {
    await AdMob.initialize();
    const { status } = await AdMob.trackingAuthorizationStatus();
    if (status === 'notDetermined') {
      await AdMob.requestTrackingAuthorization();
    }
  } catch (err) {
    console.warn('[ads] initialize failed', err);
  }
}

export async function showBanner(): Promise<void> {
  if (!ADS_ENABLED || !Capacitor.isNativePlatform()) return;
  const options: BannerAdOptions = {
    adId: bannerAdId(),
    adSize: BannerAdSize.ADAPTIVE_BANNER,
    position: BannerAdPosition.TOP_CENTER,
    // Serve test ads regardless of ID; set false once real unit IDs are in.
    isTesting: true,
  };
  try {
    await AdMob.showBanner(options);
  } catch (err) {
    console.warn('[ads] showBanner failed', err);
  }
}

export async function hideBanner(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await AdMob.removeBanner();
  } catch {
    /* nothing to hide */
  }
}

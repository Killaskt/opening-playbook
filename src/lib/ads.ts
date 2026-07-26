import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  type AdOptions,
} from '@capacitor-community/admob';

/**
 * Master switch for ads. Set to true once real AdMob unit IDs are in place.
 * While false, every function here is a no-op.
 */
export const ADS_ENABLED = true;

/**
 * Ad mode switch. While true we serve Google's TEST ads — they always fill, are
 * safe to tap, and earn nothing — so ads can be verified on-device. Flip to
 * false for the production / App Store build to serve the real units below.
 *
 * Before flipping to false:
 *   1. Put your own AdMob interstitial unit in REAL_INTERSTITIAL_AD_ID.ios.
 *   2. Set ADMOB_APP_ID in Codemagic's `chess` variable group to your real
 *      AdMob app id (see docs/ADS_ADMOB.md).
 */
export const USE_TEST_ADS = true;

/** Google's public TEST interstitial unit IDs — guaranteed to return an ad. */
const TEST_INTERSTITIAL_AD_ID = {
  ios: 'ca-app-pub-3940256099942544/4411468910',
  android: 'ca-app-pub-3940256099942544/1033173712',
};

/** Real interstitial unit IDs — used only when USE_TEST_ADS is false. */
const REAL_INTERSTITIAL_AD_ID = {
  ios: 'ca-app-pub-4145314521757592/3123932958',
  android: 'ca-app-pub-3940256099942544/1033173712', // TODO: replace with a real Android unit
};

/** No banner unit — kept at 0 so layout padding is unchanged. */
export const AD_BANNER_HEIGHT = 0;

function interstitialAdId(): string {
  const ids = USE_TEST_ADS ? TEST_INTERSTITIAL_AD_ID : REAL_INTERSTITIAL_AD_ID;
  return Capacitor.getPlatform() === 'ios' ? ids.ios : ids.android;
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

/** Pre-load the interstitial so it's ready to show immediately when needed. */
export async function prepareInterstitial(): Promise<void> {
  if (!ADS_ENABLED || !Capacitor.isNativePlatform()) return;
  const options: AdOptions = {
    adId: interstitialAdId(),
    isTesting: USE_TEST_ADS,
  };
  try {
    await AdMob.prepareInterstitial(options);
  } catch (err) {
    console.warn('[ads] prepareInterstitial failed', err);
  }
}

/** Show a prepared interstitial, then pre-load the next one. */
export async function showInterstitial(): Promise<void> {
  if (!ADS_ENABLED || !Capacitor.isNativePlatform()) return;
  try {
    await AdMob.showInterstitial();
  } catch (err) {
    console.warn('[ads] showInterstitial failed', err);
  }
  // Pre-load next ad so it's ready for the following trigger.
  void prepareInterstitial();
}

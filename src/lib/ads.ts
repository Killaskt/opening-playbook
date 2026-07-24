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

/** Real interstitial ad unit IDs. Android falls back to Google's test ID. */
const INTERSTITIAL_AD_ID = {
  ios: 'ca-app-pub-4145314521757592/3123932958',
  android: 'ca-app-pub-3940256099942544/1033173712',
};

/** No banner unit — kept at 0 so layout padding is unchanged. */
export const AD_BANNER_HEIGHT = 0;

function interstitialAdId(): string {
  return Capacitor.getPlatform() === 'ios' ? INTERSTITIAL_AD_ID.ios : INTERSTITIAL_AD_ID.android;
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
    isTesting: false,
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

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const PROD_BANNER_ID = 'ca-app-pub-4145314521757592/7831199265';
const AD_UNIT_ID = __DEV__ ? TestIds.BANNER : PROD_BANNER_ID;

export const AD_BANNER_HEIGHT = 52;

export function AdBanner() {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={[styles.container, loaded && styles.visible]}>
      <BannerAd
        unitId={AD_UNIT_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={() => setLoaded(true)}
        onAdFailedToLoad={() => setLoaded(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    height: 0,
    overflow: 'hidden',
  },
  visible: {
    height: AD_BANNER_HEIGHT,
  },
});

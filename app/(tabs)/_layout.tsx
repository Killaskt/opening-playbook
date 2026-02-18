import React from 'react';
import { Tabs } from 'expo-router';
import { LiquidTabBar } from '../../src/components/LiquidTabBar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { display: 'none' },
      }}
      tabBar={(props) => <LiquidTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Moves' }} />
      <Tabs.Screen name="openings" options={{ title: 'Library' }} />
      <Tabs.Screen name="learn" options={{ title: 'Learn' }} />
    </Tabs>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { Tabs } from 'expo-router';
import { Animated, Platform, StyleSheet, Text, View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../../src/theme/ThemeContext';

function PawnIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="6.5" r="3" stroke={color} strokeWidth="1.8" />
      <Path d="M9.5 9.5C8 11.5 7.5 13 8 15h8c.5-2-.0-3.5-1.5-5.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M7 15c-.5 1.5-.5 3 0 4h10c.5-1 .5-2.5 0-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6 21h12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

function LibraryIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 19V5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Path d="M8 19V5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Path d="M12 19V5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Path d="M16 5l4 14" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

function BulbIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 21h6M12 3a6 6 0 014 10.5V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-3.5A6 6 0 0112 3z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

function getTabLabel(routeName: string): string {
  if (routeName === 'index') return 'Moves';
  if (routeName === 'openings') return 'Library';
  if (routeName === 'learn') return 'Learn';
  return routeName;
}

function getTabIcon(routeName: string) {
  if (routeName === 'index') return PawnIcon;
  if (routeName === 'openings') return LibraryIcon;
  return BulbIcon;
}

function LiquidTabBar({ state, navigation }: BottomTabBarProps) {
  const { colors, spacing, typography, isDark } = useTheme();
  const isIOS = Platform.OS === 'ios';
  const [barWidth, setBarWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const highlightX = useRef(new Animated.Value(0)).current;
  const barRef = useRef<View | null>(null);
  const barPageXRef = useRef(0);
  const horizontalPadding = 10;
  const itemGap = 8;
  const itemHeight = 44;
  const barHeight = isIOS ? 72 : 64;
  const barPadTop = spacing.sm;
  const barPadBottom = isIOS ? spacing.sm : spacing.xs;
  const highlightTop = barPadTop + (barHeight - barPadTop - barPadBottom - itemHeight) / 2;

  const visualIndex = isDragging && previewIndex !== null ? previewIndex : state.index;
  const routeCount = Math.max(state.routes.length, 1);
  const itemWidth =
    barWidth > 0
      ? (barWidth - horizontalPadding * 2 - itemGap * Math.max(routeCount - 1, 0)) / routeCount
      : 0;
  const slotX = (index: number) => horizontalPadding + index * (itemWidth + itemGap);

  const updateBarWindowX = () => {
    barRef.current?.measureInWindow((x) => {
      barPageXRef.current = x;
    });
  };

  const getNearestIndexFromPageX = (pageX: number) => {
    if (barWidth <= 0 || itemWidth <= 0) return state.index;
    const localX = pageX - barPageXRef.current;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (let i = 0; i < state.routes.length; i++) {
      const center =
        horizontalPadding + i * (itemWidth + itemGap) + itemWidth / 2;
      const distance = Math.abs(localX - center);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = i;
      }
    }
    return clamp(nearestIndex, 0, state.routes.length - 1);
  };

  const updatePreviewFromPageX = (pageX: number) => {
    const next = getNearestIndexFromPageX(pageX);
    setPreviewIndex(next);
  };

  useEffect(() => {
    if (itemWidth <= 0) return;
    Animated.spring(highlightX, {
      toValue: slotX(visualIndex),
      speed: 20,
      bounciness: 7,
      useNativeDriver: true,
    }).start();
  }, [highlightX, itemWidth, visualIndex]);

  const commitNavigation = (targetIndex: number) => {
    const route = state.routes[targetIndex];
    const navEvent = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });
    if (!navEvent.defaultPrevented) {
      navigation.navigate(route.name);
    }
    setIsDragging(false);
    setPreviewIndex(null);
  };

  const handlers = {
    onStartShouldSetResponder: () => true,
    onMoveShouldSetResponder: () => true,
    onResponderGrant: (event: any) => {
      updateBarWindowX();
      setIsDragging(true);
      updatePreviewFromPageX(event.nativeEvent.pageX);
    },
    onResponderMove: (event: any) => {
      updatePreviewFromPageX(event.nativeEvent.pageX);
    },
    onResponderRelease: (event: any) => {
      const targetIndex = getNearestIndexFromPageX(event.nativeEvent.pageX);
      setPreviewIndex(targetIndex);
      if (itemWidth > 0) {
        Animated.timing(highlightX, {
          toValue: slotX(targetIndex),
          duration: 120,
          useNativeDriver: true,
        }).start(() => commitNavigation(targetIndex));
      } else {
        commitNavigation(targetIndex);
      }
    },
    onResponderTerminate: () => {
      setIsDragging(false);
      setPreviewIndex(null);
    },
  } as const;

  return (
    <View
      ref={(node) => {
        barRef.current = node;
      }}
      onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}
      style={[
        styles.bar,
        {
          backgroundColor: colors.cardGlassStrong,
          borderTopColor: colors.glassBorder,
          height: barHeight,
          paddingBottom: barPadBottom,
          paddingTop: barPadTop,
          borderRadius: isIOS ? 50 : 25,
          marginHorizontal: spacing.xxl,
          marginBottom: isIOS ? spacing.lg : spacing.md,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: isIOS ? 0.12 : 0.08,
          shadowRadius: 12,
          elevation: 8,
        },
      ]}
      {...handlers}
    >
      {itemWidth > 0 && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.highlight,
            {
              width: itemWidth,
              top: highlightTop,
              transform: [{ translateX: highlightX }],
              backgroundColor: isDark ? 'rgba(147, 197, 253, 0.10)' : 'rgba(147, 197, 253, 0.13)',
              borderColor: isDark ? 'rgba(147, 197, 253, 0.20)' : 'rgba(147, 197, 253, 0.26)',
            },
          ]}
        >
          <BlurView
            intensity={isDark ? 26 : 38}
            tint={isDark ? 'dark' : 'light'}
            style={StyleSheet.absoluteFillObject}
          />
          <View
            style={[
              styles.highlightFrost,
              {
                backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.18)',
              },
            ]}
          />
        </Animated.View>
      )}
      {state.routes.map((route, index) => {
        const focused = index === visualIndex;
        const Icon = getTabIcon(route.name);
        const tint = focused ? colors.tabBarActive : colors.textSecondary;

        return (
          <View
            key={route.key}
            style={[
              styles.item,
              {
                width: itemWidth > 0 ? itemWidth : undefined,
                flex: itemWidth > 0 ? 0 : 1,
              },
            ]}
          >
            <Icon color={tint} size={21} />
            <Text style={[styles.itemLabel, typography.label, { color: tint }]}>{getTabLabel(route.name)}</Text>
          </View>
        );
      })}
    </View>
  );
}

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
      <Tabs.Screen
        name="index"
        options={{
          title: 'Moves',
        }}
      />
      <Tabs.Screen
        name="openings"
        options={{
          title: 'Library',
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 8,
  },
  item: {
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  itemLabel: {
    fontWeight: '700',
  },
  highlight: {
    position: 'absolute',
    left: 0,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#93c5fd',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  highlightFrost: {
    position: 'absolute',
    top: 2,
    left: 8,
    right: 8,
    height: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
});

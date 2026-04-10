import React, { useEffect, useRef, useState } from 'react';
import { Animated, GestureResponderEvent, Platform, StyleSheet, Text, View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme/ThemeContext';
import { PawnIcon, LibraryIcon, BulbIcon } from './TabIcons';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const TAB_BAR_CONFIG = {
  horizontalPadding: 10,
  itemGap: 8,
  itemHeight: 44,
  barHeightIOS: 72,
  barHeightAndroid: 64,
  highlightBorderRadius: 22,
  iconSize: 21,
} as const;

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

export function LiquidTabBar({ state, navigation }: BottomTabBarProps) {
  const { colors, spacing, typography, isDark } = useTheme();
  const isIOS = Platform.OS === 'ios';
  const [barWidth, setBarWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const highlightX = useRef(new Animated.Value(0)).current;
  const barRef = useRef<View | null>(null);
  const barPageXRef = useRef(0);
  const { horizontalPadding, itemGap, itemHeight } = TAB_BAR_CONFIG;
  const barHeight = isIOS ? TAB_BAR_CONFIG.barHeightIOS : TAB_BAR_CONFIG.barHeightAndroid;
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
    onResponderGrant: (event: GestureResponderEvent) => {
      updateBarWindowX();
      setIsDragging(true);
      updatePreviewFromPageX(event.nativeEvent.pageX);
    },
    onResponderMove: (event: GestureResponderEvent) => {
      updatePreviewFromPageX(event.nativeEvent.pageX);
    },
    onResponderRelease: (event: GestureResponderEvent) => {
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
              backgroundColor: colors.highlightBg,
              borderColor: isDark ? colors.accent + '30' : colors.highlightBg,
            },
          ]}
        >
          {!isDark && (
            <View
              style={[
                styles.highlightFrost,
                { backgroundColor: colors.highlightFrost },
              ]}
            />
          )}
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

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: TAB_BAR_CONFIG.horizontalPadding,
    gap: TAB_BAR_CONFIG.itemGap,
  },
  item: {
    height: TAB_BAR_CONFIG.itemHeight,
    borderRadius: TAB_BAR_CONFIG.highlightBorderRadius,
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
    height: TAB_BAR_CONFIG.itemHeight,
    borderRadius: TAB_BAR_CONFIG.highlightBorderRadius,
    borderWidth: 1,
    overflow: 'hidden',
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
  },
});

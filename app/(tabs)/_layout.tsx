import React, { useEffect, useRef } from 'react';
import { Tabs } from 'expo-router';
import { Animated, Platform } from 'react-native';
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

function AnimatedTabIcon({
  focused,
  color,
  size,
  Icon,
}: {
  focused: boolean;
  color: string;
  size: number;
  Icon: ({ color, size }: { color: string; size: number }) => React.ReactElement;
}) {
  const anim = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: focused ? 1 : 0,
      speed: 20,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
  }, [anim, focused]);

  return (
    <Animated.View
      style={{
        transform: [
          { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [1.5, -1.5] }) },
          { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1.06] }) },
        ],
        opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }),
      }}
    >
      <Icon color={color} size={size} />
    </Animated.View>
  );
}

export default function TabLayout() {
  const { colors, spacing, typography } = useTheme();
  const isIOS = Platform.OS === 'ios';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: colors.cardGlassStrong,
          borderTopColor: colors.glassBorder,
          borderTopWidth: 1,
          height: isIOS ? 72 : 64,
          paddingBottom: isIOS ? spacing.sm : spacing.xs,
          paddingTop: spacing.sm,
          borderRadius: isIOS ? 50 : 25,
          marginHorizontal: spacing.xxl,
          marginBottom: isIOS ? spacing.lg : spacing.md,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: isIOS ? 0.12 : 0.08,
          shadowRadius: 12,
          elevation: 8,
        },
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarActiveBackgroundColor: 'rgba(147, 197, 253, 0.15)',
        tabBarInactiveBackgroundColor: 'transparent',
        tabBarItemStyle: {
          borderRadius: 25,
          marginHorizontal: 10,
          marginVertical: 0,
          overflow: 'hidden',
          justifyContent: 'center',
        },
        tabBarIconStyle: {
          marginTop: 1,
        },
        tabBarLabelStyle: {
          ...typography.label,
          fontWeight: '700',
          marginTop: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Moves',
          tabBarIcon: ({ focused, color, size }) => (
            <AnimatedTabIcon focused={focused} color={color} size={size + 1} Icon={PawnIcon} />
          ),
        }}
      />
      <Tabs.Screen
        name="openings"
        options={{
          title: 'Openings',
          tabBarIcon: ({ focused, color, size }) => (
            <AnimatedTabIcon focused={focused} color={color} size={size + 1} Icon={LibraryIcon} />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ focused, color, size }) => (
            <AnimatedTabIcon focused={focused} color={color} size={size + 1} Icon={BulbIcon} />
          ),
        }}
      />
    </Tabs>
  );
}

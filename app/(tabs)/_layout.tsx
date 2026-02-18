import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
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

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBarBg,
          borderTopColor: colors.tabBarBorder,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: Platform.OS === 'ios' ? 16 : 8,
        },
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Moves',
          tabBarIcon: ({ color, size }) => (
            <PawnIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="openings"
        options={{
          title: 'Openings',
          tabBarIcon: ({ color, size }) => (
            <LibraryIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, size }) => (
            <BulbIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

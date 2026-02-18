import { Tabs } from 'expo-router';
import { Text, Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e8e4df',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#2e78b7',
        tabBarInactiveTintColor: '#aaa',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color, marginBottom: -2 }}>&#9816;</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="openings"
        options={{
          title: 'Openings',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color, marginBottom: -2 }}>&#9878;</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color, marginBottom: -2 }}>&#9733;</Text>
          ),
        }}
      />
    </Tabs>
  );
}

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f5f0eb',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Chess Openings',
          }}
        />
        <Stack.Screen
          name="move/[id]"
          options={{
            title: 'Opening Details',
          }}
        />
      </Stack>
    </>
  );
}

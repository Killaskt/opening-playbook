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
          name="(tabs)"
          options={{ headerShown: false, headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="move/[id]"
          options={{ title: 'Opening Details', headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="opening-detail"
          options={{ title: 'Opening', headerBackTitle: 'Back' }}
        />
      </Stack>
    </>
  );
}

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text } from 'react-native';
import { ThemeProvider, useTheme } from '../src/theme/ThemeContext';

function AppStack() {
  const { colors, isDark } = useTheme();
  const renderBackButton = (onPress: () => void) => (
    <Pressable
      onPress={onPress}
      hitSlop={12}
      style={({ pressed }) => ({
        minWidth: 92,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 10,
        justifyContent: 'center',
        opacity: pressed ? 0.75 : 1,
      })}
    >
      <Text style={{ color: colors.text, fontSize: 16, fontWeight: '600' }}>{'\u2039 Back'}</Text>
    </Pressable>
  );

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: colors.bg,
          },
          headerStyle: {
            backgroundColor: colors.headerBg,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerBackButtonMenuEnabled: false,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="move/[id]"
          options={({ navigation }) => ({
            title: 'Opening Details',
            headerBackVisible: false,
            headerLeft: () => renderBackButton(() => navigation.goBack()),
          })}
        />
        <Stack.Screen
          name="opening-detail"
          options={({ navigation }) => ({
            title: 'Opening',
            headerBackVisible: false,
            headerLeft: () => renderBackButton(() => navigation.goBack()),
          })}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppStack />
    </ThemeProvider>
  );
}

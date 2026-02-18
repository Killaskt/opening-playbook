import React from 'react';
import { View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../src/theme/ThemeContext';
import { GlassCard } from '../src/components/UIPrimitives';

const DEVELOPER_EMAIL = 'feedback@example.com';
const MAIL_SUBJECT = 'Chess Openings App – feedback or suggestion';

export default function ContactScreen() {
  const { colors, spacing, typography } = useTheme();

  const handleContact = () => {
    const url = `mailto:${DEVELOPER_EMAIL}?subject=${encodeURIComponent(MAIL_SUBJECT)}`;
    Linking.openURL(url);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Contact' }} />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]} edges={['bottom']}>
        <View style={[styles.content, { paddingHorizontal: spacing.xl }]}>
          <GlassCard style={[styles.card, { padding: spacing.xxl }]}>
            <Text style={[styles.message, typography.bodyLG, { color: colors.textSecondary }]}>
              Have a change recommendation or feedback? We’d love to hear from you. Tap the button below to send a message to the developer.
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                {
                  backgroundColor: colors.accentBg,
                  borderColor: colors.accent + '45',
                  marginTop: spacing.xl,
                },
                pressed && { opacity: 0.9 },
              ]}
              onPress={handleContact}
            >
              <Text style={[styles.buttonText, { color: colors.accent }]}>Contact developer</Text>
            </Pressable>
          </GlassCard>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 24,
  },
  card: {
    borderRadius: 16,
  },
  message: {
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});

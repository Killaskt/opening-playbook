import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../src/theme/ThemeContext';
import { GlassCard } from '../src/components/UIPrimitives';

const FORMSPREE_URL = 'https://formspree.io/f/mlgwwbzd';

const CATEGORIES = ['Feedback', 'Bug', 'Suggestion', 'Other'] as const;
type Category = (typeof CATEGORIES)[number];

export default function ContactScreen() {
  const { colors, spacing, typography } = useTheme();

  const [category, setCategory] = useState<Category>('Feedback');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const canSubmit = message.trim().length > 0 && status !== 'sending' && cooldown === 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const body: Record<string, string> = {
        category,
        message: message.trim(),
      };
      if (email.trim()) body.email = email.trim();

      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setStatus('success');
        setMessage('');
        setEmail('');
        setCategory('Feedback');
        setCooldown(60);
        cooldownRef.current = setInterval(() => {
          setCooldown((s) => {
            if (s <= 1) {
              clearInterval(cooldownRef.current!);
              return 0;
            }
            return s - 1;
          });
        }, 1000);
      } else {
        const data = await res.json().catch(() => ({}));
        // Formspree returns { errors: [{ field, message }] } for validation failures
        const detail = Array.isArray(data?.errors)
          ? data.errors.map((e: { field?: string; message?: string }) =>
              e.field ? `${e.field}: ${e.message}` : e.message
            ).join('\n')
          : null;
        setErrorMsg(detail ?? data?.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('No internet connection. Please try again.');
      setStatus('error');
    }
  };

  const inputStyle = [
    styles.input,
    typography.bodyMD,
    {
      color: colors.text,
      backgroundColor: colors.inputBg,
      borderColor: colors.glassBorder,
    },
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Contact' }} />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]} edges={['bottom']}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={[styles.content, { paddingHorizontal: spacing.xl }]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {status === 'success' ? (
              <GlassCard style={[styles.card, styles.successCard, { padding: spacing.xxl }]}>
                <Text style={styles.successIcon}>✓</Text>
                <Text style={[styles.successTitle, typography.titleMD, { color: colors.text }]}>
                  Message sent
                </Text>
                <Text style={[styles.successBody, typography.bodyMD, { color: colors.textSecondary }]}>
                  Thanks for reaching out. I read every message.
                </Text>
                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: colors.accentBg, borderColor: colors.accent + '45', marginTop: spacing.xl },
                    pressed && { opacity: 0.8 },
                  ]}
                  onPress={() => setStatus('idle')}
                >
                  <Text style={[styles.buttonText, { color: colors.accent }]}>Send another</Text>
                </Pressable>
              </GlassCard>
            ) : (
              <GlassCard style={[styles.card, { padding: spacing.xl }]}>
                <Text style={[styles.label, typography.label, { color: colors.textTertiary }]}>
                  CATEGORY
                </Text>
                <View style={styles.categoryRow}>
                  {CATEGORIES.map((cat) => (
                    <Pressable
                      key={cat}
                      onPress={() => setCategory(cat)}
                      style={({ pressed }) => [
                        styles.categoryChip,
                        {
                          backgroundColor: category === cat ? colors.accent : colors.chipBg,
                          borderColor: category === cat ? colors.accent : colors.glassBorder,
                        },
                        pressed && { opacity: 0.8 },
                      ]}
                    >
                      <Text
                        style={[
                          styles.categoryText,
                          { color: category === cat ? colors.textInverse : colors.textTertiary },
                        ]}
                      >
                        {cat}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Text style={[styles.label, typography.label, { color: colors.textTertiary, marginTop: spacing.lg }]}>
                  MESSAGE <Text style={{ color: colors.accent }}>*</Text>
                </Text>
                <TextInput
                  style={[inputStyle, styles.messageInput]}
                  placeholder="What's on your mind?"
                  placeholderTextColor={colors.textMuted}
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  textAlignVertical="top"
                  maxLength={1000}
                />
                <Text style={[styles.charCount, { color: colors.textMuted }]}>
                  {message.length}/1000
                </Text>

                <Text style={[styles.label, typography.label, { color: colors.textTertiary, marginTop: spacing.lg }]}>
                  EMAIL{' '}
                  <Text style={[styles.optional, { color: colors.textMuted }]}>
                    (optional — only if you want a reply)
                  </Text>
                </Text>
                <TextInput
                  style={inputStyle}
                  placeholder="you@example.com"
                  placeholderTextColor={colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                {status === 'error' && (
                  <Text style={[styles.errorText, { color: colors.red ?? '#ef4444' }]}>
                    {errorMsg}
                  </Text>
                )}

                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    {
                      backgroundColor: canSubmit ? colors.accent : colors.chipBg,
                      borderColor: canSubmit ? colors.accent : colors.glassBorder,
                      marginTop: spacing.xl,
                    },
                    pressed && canSubmit && { opacity: 0.85 },
                  ]}
                  onPress={handleSubmit}
                  disabled={!canSubmit}
                >
                  {status === 'sending' ? (
                    <ActivityIndicator color={colors.textInverse} size="small" />
                  ) : (
                    <Text
                      style={[
                        styles.buttonText,
                        { color: canSubmit ? colors.textInverse : colors.textMuted },
                      ]}
                    >
                      {cooldown > 0 ? `Wait ${cooldown}s` : 'Send message'}
                    </Text>
                  )}
                </Pressable>
              </GlassCard>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
  },
  label: {
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  optional: {
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 0,
    textTransform: 'none',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  messageInput: {
    minHeight: 120,
    paddingTop: 12,
  },
  charCount: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
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
  errorText: {
    fontSize: 13,
    marginTop: 10,
    lineHeight: 20,
  },
  successCard: {
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  successTitle: {
    marginBottom: 8,
  },
  successBody: {
    textAlign: 'center',
    lineHeight: 22,
  },
});

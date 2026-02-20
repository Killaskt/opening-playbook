import React from 'react';
import { Keyboard, StyleSheet, TextInput, View, Pressable, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { GlassCard } from './UIPrimitives';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

export function SearchBar({ value, onChangeText, placeholder }: SearchBarProps) {
  const { colors, spacing, typography } = useTheme();
  const showClear = value.length > 0;

  return (
    <GlassCard style={[styles.wrapper, { padding: spacing.md, marginHorizontal: spacing.lg }]}>
      <View style={styles.inputRow}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.inputBg,
              borderColor: colors.glassBorder,
              color: colors.text,
              ...typography.bodyLG,
              paddingRight: showClear ? 44 : 16,
            },
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.textMuted}
          returnKeyType="search"
          onSubmitEditing={Keyboard.dismiss}
        />
        {showClear && (
          <Pressable
            style={({ pressed }) => [styles.clearBtn, { opacity: pressed ? 0.7 : 1 }]}
            onPress={() => onChangeText('')}
            hitSlop={8}
            accessibilityLabel="Clear search"
          >
            <Text style={[styles.clearText, { color: colors.textMuted }]}>×</Text>
          </Pressable>
        )}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 8,
    marginBottom: 15,
    borderRadius: 16,
  },
  inputRow: {
    position: 'relative',
  },
  input: {
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  clearBtn: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  clearText: {
    fontSize: 22,
    lineHeight: 24,
    fontWeight: '300',
  },
});

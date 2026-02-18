import React from 'react';
import { Keyboard, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { GlassCard } from './UIPrimitives';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

export function SearchBar({ value, onChangeText, placeholder }: SearchBarProps) {
  const { colors, spacing, typography } = useTheme();

  return (
    <GlassCard style={[styles.wrapper, { padding: spacing.md, marginHorizontal: spacing.lg }]}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBg,
            borderColor: colors.glassBorder,
            color: colors.text,
            ...typography.bodyLG,
          },
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.textMuted}
        returnKeyType="search"
        onSubmitEditing={Keyboard.dismiss}
      />
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 8,
    marginBottom: 15,
    borderRadius: 16,
  },
  input: {
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
});

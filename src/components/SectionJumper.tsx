import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface SectionJumperProps {
  canGoUp: boolean;
  canGoDown: boolean;
  onUp: () => void;
  onDown: () => void;
  bottom: number;
}

export function SectionJumper({ canGoUp, canGoDown, onUp, onDown, bottom }: SectionJumperProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.wrap,
        {
          bottom,
          backgroundColor: colors.cardGlassStrong,
          borderColor: colors.glassBorder,
        },
      ]}
    >
      <Pressable
        onPress={onUp}
        disabled={!canGoUp}
        style={[
          styles.btn,
          {
            borderBottomColor: colors.glassBorder,
            opacity: canGoUp ? 1 : 0.35,
          },
        ]}
      >
        <Text style={[styles.text, { color: colors.text }]}>▲</Text>
      </Pressable>
      <Pressable
        onPress={onDown}
        disabled={!canGoDown}
        style={[
          styles.btn,
          {
            borderBottomWidth: 0,
            opacity: canGoDown ? 1 : 0.35,
          },
        ]}
      >
        <Text style={[styles.text, { color: colors.text }]}>▼</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: 12,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  btn: {
    width: 38,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 13,
    fontWeight: '700',
  },
});

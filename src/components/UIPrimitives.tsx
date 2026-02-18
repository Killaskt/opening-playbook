import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  pressable?: boolean;
  onPress?: () => void;
}

export function GlassCard({ children, style, pressable = false, onPress }: GlassCardProps) {
  const { colors, elevation } = useTheme();

  const baseStyle = [
    styles.card,
    elevation.md,
    {
      backgroundColor: colors.cardGlass,
      borderColor: colors.glassBorder,
    },
    style,
  ];

  if (pressable) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          baseStyle,
          pressed && { backgroundColor: colors.cardPressed, transform: [{ scale: 0.988 }] },
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={baseStyle}>{children}</View>;
}

interface SectionCardProps {
  children: React.ReactNode;
  accentColor?: string;
  style?: ViewStyle | ViewStyle[];
}

export function SectionCard({ children, accentColor, style }: SectionCardProps) {
  const { colors, spacing } = useTheme();
  return (
    <View
      style={[
        styles.sectionCard,
        {
          padding: spacing.xl,
          backgroundColor: colors.cardGlass,
          borderColor: colors.glassBorder,
          borderTopColor: accentColor || colors.accent,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

interface PillChipProps {
  label: string;
  backgroundColor: string;
  textColor: string;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

export function PillChip({ label, backgroundColor, textColor, style, textStyle }: PillChipProps) {
  const { spacing, typography } = useTheme();
  return (
    <View
      style={[
        styles.pill,
        {
          backgroundColor,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
        },
        style,
      ]}
    >
      <Text style={[styles.pillText, typography.label, { color: textColor }, textStyle]}>{label}</Text>
    </View>
  );
}

interface EcoBadgeProps {
  code: string;
  style?: ViewStyle | ViewStyle[];
}

export function EcoBadge({ code, style }: EcoBadgeProps) {
  const { colors, spacing, typography } = useTheme();
  return (
    <View
      style={[
        styles.eco,
        {
          backgroundColor: colors.chipBg,
          borderColor: colors.border,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.xs,
        },
        style,
      ]}
    >
      <Text style={[styles.ecoText, typography.labelSM, { color: colors.textMuted }]}>{code}</Text>
    </View>
  );
}

interface SectionTitleProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

export function SectionTitle({ children, style }: SectionTitleProps) {
  const { colors, typography } = useTheme();
  return <Text style={[typography.titleMD, styles.sectionTitle, { color: colors.text }, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
  },
  sectionCard: {
    borderWidth: 1,
    borderTopWidth: 2,
    borderRadius: 14,
  },
  pill: {
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 28,
  },
  pillText: {
    includeFontPadding: false,
  },
  eco: {
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  ecoText: {
    letterSpacing: 0.3,
  },
  sectionTitle: {
    marginBottom: 12,
  },
});

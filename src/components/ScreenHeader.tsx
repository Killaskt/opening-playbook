import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { useTheme, ThemeMode } from '../theme/ThemeContext';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
}

const MODE_ICON: Record<ThemeMode, string> = {
  light: '\u2600',   // sun
  dark: '\u263D',     // moon
  system: '\u25D1',   // half circle
};

const MODE_LABEL: Record<ThemeMode, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'Auto',
};

export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  const { colors, mode, cycleMode } = useTheme();

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === 'ios' ? 100 : 76 }]}>
      <View style={styles.row}>
        <View style={styles.titles}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: colors.textTertiary }]}>{subtitle}</Text>
          )}
        </View>
        <Pressable
          style={[styles.themeBtn, { backgroundColor: colors.chipBg }]}
          onPress={cycleMode}
          hitSlop={8}
        >
          <Text style={[styles.themeIcon, { color: colors.textSecondary }]}>
            {MODE_ICON[mode]}
          </Text>
          <Text style={[styles.themeLabel, { color: colors.textTertiary }]}>
            {MODE_LABEL[mode]}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titles: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  themeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 4,
    gap: 4,
  },
  themeIcon: {
    fontSize: 16,
  },
  themeLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});

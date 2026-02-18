import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { IdeaIcon, IdeaIconKind } from './IdeaIcons';

interface BulletRowProps {
  icon: IdeaIconKind;
  iconColor: string;
  text: string;
  iconSize?: number;
}

export function BulletRow({ icon, iconColor, text, iconSize = 14 }: BulletRowProps) {
  const { colors, typography } = useTheme();

  return (
    <View style={styles.row}>
      <View style={styles.iconWrap}>
        <IdeaIcon kind={icon} color={iconColor} size={iconSize} />
      </View>
      <Text style={[styles.text, typography.bodyMD, { color: colors.textSecondary }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  iconWrap: {
    width: 20,
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
  text: {
    flex: 1,
  },
});

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface ResponseGridProps {
  responses: { id: string; move: string; name: string }[];
  onPress: (id: string) => void;
}

export function ResponseGrid({ responses, onPress }: ResponseGridProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.responsesGrid}>
      {responses.map((resp) => (
        <Pressable
          key={resp.id}
          style={({ pressed }) => [
            styles.responseCard,
            {
              backgroundColor: colors.cardGlassStrong,
              borderColor: colors.glassBorder,
            },
            pressed && { backgroundColor: colors.accentBg },
          ]}
          onPress={() => onPress(resp.id)}
        >
          <View
            style={[
              styles.responseMoveCircle,
              { backgroundColor: colors.accentBg, borderColor: colors.accent + '40' },
            ]}
          >
            <Text style={[styles.responseMove, { color: colors.accent }]}>{resp.move}</Text>
          </View>
          <Text style={[styles.responseName, { color: colors.text }]} numberOfLines={2}>{resp.name}</Text>
          <Text style={[styles.responseArrow, { color: colors.accent }]}>{'\u203A'}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  responsesGrid: {
    gap: 10,
  },
  responseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  responseMoveCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  responseMove: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  responseName: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  responseArrow: {
    fontSize: 24,
    fontWeight: '600',
  },
});

import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { AnimatedChessBoard } from './AnimatedChessBoard';
import { TrapInfo } from '../types';
import { useTheme } from '../theme/ThemeContext';

export function TrapCard({ trap }: { trap: TrapInfo }) {
  const [expanded, setExpanded] = useState(false);
  const { colors } = useTheme();

  return (
    <Pressable
      style={[styles.trapCard, { backgroundColor: colors.yellowBg, borderColor: colors.yellow + '40' }]}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.trapHeader}>
        <Text style={[styles.trapName, { color: colors.yellow }]}>{trap.name}</Text>
        <Text style={[styles.trapToggle, { color: colors.yellow }]}>{expanded ? '\u2212' : '+'}</Text>
      </View>
      {expanded && (
        <View style={styles.trapBody}>
          <Text style={[styles.trapDesc, { color: colors.textSecondary }]}>{trap.description}</Text>
          {trap.pgn && (
            <View style={{ marginTop: 12 }}>
              <AnimatedChessBoard pgn={trap.pgn} compact />
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  trapCard: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  trapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  trapName: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  trapToggle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  trapBody: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  trapDesc: {
    fontSize: 14,
    lineHeight: 21,
  },
});

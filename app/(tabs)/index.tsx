import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { startMoves } from '../../src/data/openings';
import { useTheme } from '../../src/theme/ThemeContext';
import { ScreenHeader } from '../../src/components/ScreenHeader';

export default function ExploreScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMoves = startMoves.filter((move) => {
    const query = searchQuery.toLowerCase();
    return (
      move.move.toLowerCase().includes(query) ||
      move.name.toLowerCase().includes(query) ||
      move.intent[0]?.toLowerCase().includes(query) ||
      (move.whyThisMove?.toLowerCase().includes(query) ?? false)
    );
  });

  const renderItem = ({ item }: { item: typeof startMoves[0] }) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
        pressed && { backgroundColor: colors.cardPressed, borderColor: colors.accent + '40' },
      ]}
      onPress={() => router.push(`/move/${item.id}`)}
    >
      <View style={styles.cardRow}>
        <View style={[styles.moveBadge, { backgroundColor: colors.accentBg }]}>
          <Text style={[styles.moveNotation, { color: colors.accent }]}>{item.move}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={[styles.moveName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.moveHint, { color: colors.textTertiary }]} numberOfLines={2}>
            {item.whyThisMove
              ? item.whyThisMove.split('.')[0] + '.'
              : item.intent[0]}
          </Text>
          {item.responses.length > 0 && (
            <View style={styles.chipsRow}>
              {item.responses.slice(0, 3).map((resp) => (
                <View key={resp.id} style={[styles.chip, { backgroundColor: colors.chipBg }]}>
                  <Text style={[styles.chipText, { color: colors.textSecondary }]}>{resp.name}</Text>
                </View>
              ))}
              {item.responses.length > 3 && (
                <Text style={[styles.moreText, { color: colors.textMuted }]}>
                  +{item.responses.length - 3}
                </Text>
              )}
            </View>
          )}
        </View>
        <Text style={[styles.arrow, { color: colors.textMuted }]}>{'>'}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScreenHeader title="Explore" subtitle="Step through openings move by move" />

      <View style={styles.searchBar}>
        <TextInput
          style={[styles.searchInput, {
            backgroundColor: colors.inputBg,
            borderColor: colors.inputBorder,
            color: colors.text,
          }]}
          placeholder="Search moves, names, concepts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <FlatList
        data={filteredMoves}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={[styles.listHeader, { color: colors.textMuted }]}>White's first move</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No openings found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  searchInput: {
    borderRadius: 10,
    padding: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  listHeader: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 4,
  },
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moveBadge: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  moveNotation: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  cardContent: {
    flex: 1,
  },
  moveName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3,
  },
  moveHint: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 5,
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  moreText: {
    fontSize: 11,
    fontWeight: '600',
  },
  arrow: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});

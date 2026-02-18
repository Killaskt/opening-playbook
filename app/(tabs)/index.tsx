import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { startMoves } from '../../src/data/openings';

export default function ExploreScreen() {
  const router = useRouter();
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
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => router.push(`/move/${item.id}`)}
    >
      <View style={styles.cardRow}>
        <View style={styles.moveBadge}>
          <Text style={styles.moveNotation}>{item.move}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.moveName}>{item.name}</Text>
          <Text style={styles.moveHint} numberOfLines={2}>
            {item.whyThisMove
              ? item.whyThisMove.split('.')[0] + '.'
              : item.intent[0]}
          </Text>
          {item.responses.length > 0 && (
            <View style={styles.chipsRow}>
              {item.responses.slice(0, 3).map((resp) => (
                <View key={resp.id} style={styles.chip}>
                  <Text style={styles.chipText}>{resp.name}</Text>
                </View>
              ))}
              {item.responses.length > 3 && (
                <Text style={styles.moreText}>+{item.responses.length - 3}</Text>
              )}
            </View>
          )}
        </View>
        <Text style={styles.arrow}>{'>'}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.screenTitle}>Explore</Text>
        <Text style={styles.screenSubtitle}>Step through openings move by move</Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search moves, names, concepts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#aaa"
        />
      </View>

      <FlatList
        data={filteredMoves}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.listHeader}>White's first move</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No openings found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8f5',
  },
  titleArea: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 24,
    paddingBottom: 4,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#222',
  },
  screenSubtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  searchBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#faf8f5',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e0dcd7',
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  listHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e8e4df',
  },
  cardPressed: {
    backgroundColor: '#f0f6fb',
    borderColor: '#c0d8ee',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moveBadge: {
    backgroundColor: '#eef5fb',
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
    color: '#2e78b7',
    fontFamily: 'monospace',
  },
  cardContent: {
    flex: 1,
  },
  moveName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 3,
  },
  moveHint: {
    fontSize: 13,
    color: '#777',
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
    backgroundColor: '#f0edea',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  chipText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
  },
  moreText: {
    fontSize: 11,
    color: '#aaa',
    fontWeight: '600',
  },
  arrow: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

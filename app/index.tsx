import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { startMoves } from '../src/data/openings';

export default function HomeScreen() {
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
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={() => router.push(`/move/${item.id}`)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.moveNotation}>{item.move}</Text>
        <Text style={styles.moveName}>{item.name}</Text>
      </View>
      <Text style={styles.moveHint} numberOfLines={2}>
        {item.whyThisMove
          ? item.whyThisMove.split('.')[0] + '.'
          : item.intent[0]}
      </Text>
      {item.responses.length > 0 && (
        <View style={styles.chipsContainer}>
          {item.responses.slice(0, 3).map((response) => (
            <View key={response.id} style={styles.chip}>
              <Text style={styles.chipText}>{response.name}</Text>
            </View>
          ))}
          {item.responses.length > 3 && (
            <View style={styles.chip}>
              <Text style={styles.chipText}>+{item.responses.length - 3} more</Text>
            </View>
          )}
        </View>
      )}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Learn Chess Openings</Text>
        <Text style={styles.subtitle}>Select a first move to explore</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by move, name, or concept..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <FlatList
        data={filteredMoves}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No openings found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8f5',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#f5f0eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#f5f0eb',
  },
  searchInput: {
    backgroundColor: '#faf8f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#faf8f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardPressed: {
    backgroundColor: '#f8f8f8',
    borderColor: '#2e78b7',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  moveNotation: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e78b7',
    fontFamily: 'monospace',
    marginRight: 12,
  },
  moveName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  moveHint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  chipText: {
    fontSize: 12,
    color: '#1976d2',
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

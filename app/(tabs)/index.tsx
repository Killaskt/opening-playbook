import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Keyboard,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { startMoves } from '../../src/data/openings';
import { useTheme } from '../../src/theme/ThemeContext';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { GlassCard, PillChip } from '../../src/components/UIPrimitives';

export default function ExploreScreen() {
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();
  const { colors, spacing, typography } = useTheme();
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
        styles.cardTouch,
        pressed && { opacity: 0.95 },
      ]}
      onPress={() => router.push(`/move/${item.id}`)}
    >
      <GlassCard style={styles.card}>
      <View style={styles.cardRow}>
        <View style={[styles.movePane, { backgroundColor: colors.accentBg }]}>
          <Text style={[styles.moveNotation, typography.mono, { color: colors.accent }]}>{item.move}</Text>
        </View>
        <View style={[styles.cardContent, { paddingHorizontal: spacing.lg, paddingVertical: spacing.md }]}>
          <Text style={[styles.moveName, typography.titleSM, { color: colors.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={[styles.moveHint, typography.bodySM, { color: colors.textTertiary }]} numberOfLines={2}>
            {item.whyThisMove
              ? item.whyThisMove.split('.')[0] + '.'
              : item.intent[0]}
          </Text>
          {item.responses.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsScrollContent}
              style={styles.chipsScroller}
            >
              {item.responses.map((resp) => (
                <PillChip
                  key={resp.id}
                  label={resp.name}
                  backgroundColor={colors.chipBg}
                  textColor={colors.textSecondary}
                  style={styles.chip}
                  textStyle={styles.chipText}
                />
              ))}
            </ScrollView>
          )}
        </View>
        <Text style={[styles.arrow, { color: colors.textMuted }]}>{'>'}</Text>
      </View>
      </GlassCard>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScreenHeader title="Moves" subtitle="Step through openings move by move" />

      <GlassCard style={[styles.searchBar, { padding: spacing.md, marginHorizontal: spacing.lg }]}>
        <TextInput
          style={[styles.searchInput, {
            backgroundColor: colors.inputBg,
            borderColor: colors.glassBorder,
            color: colors.text,
            ...typography.bodyLG,
          }]}
          placeholder="Search moves, names, concepts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textMuted}
          returnKeyType="search"
          onSubmitEditing={Keyboard.dismiss}
        />
      </GlassCard>

      <FlatList
        data={filteredMoves}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { paddingBottom: tabBarHeight + 20 }]}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
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
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 16,
  },
  searchInput: {
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  cardTouch: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: 94,
  },
  movePane: {
    width: 78,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    alignSelf: 'stretch',
  },
  moveNotation: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  moveName: {
    marginBottom: 8,
  },
  moveHint: {
    marginBottom: 10,
  },
  chipsScroller: {
    maxHeight: 30,
  },
  chipsScrollContent: {
    alignItems: 'center',
    gap: 6,
    paddingRight: 6,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    minHeight: 22,
  },
  chipText: {
    fontSize: 11,
  },
  moreText: {
    fontSize: 11,
  },
  arrow: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
    marginRight: 10,
    alignSelf: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});

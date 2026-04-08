import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { startMoves } from '../../src/data/openings';
import { useTheme } from '../../src/theme/ThemeContext';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { SearchBar } from '../../src/components/SearchBar';
import { GlassCard, PillChip } from '../../src/components/UIPrimitives';
import { AdBanner, AD_BANNER_HEIGHT } from '../../src/components/AdBanner';

export default function ExploreScreen() {
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();
  const { colors, spacing, typography } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMoves = useMemo(() => startMoves.filter((move) => {
    const query = searchQuery.toLowerCase();
    return (
      move.move.toLowerCase().includes(query) ||
      move.name.toLowerCase().includes(query) ||
      move.intent[0]?.toLowerCase().includes(query) ||
      (move.whyThisMove?.toLowerCase().includes(query) ?? false)
    );
  }), [searchQuery]);

  const renderItem = useCallback(({ item }: { item: typeof startMoves[0] }) => (
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
  ), [colors, spacing, typography, router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScreenHeader title="Moves" subtitle="Step through openings move by move" />

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search moves, names, concepts..."
      />

      <View style={[styles.adWrapper, { bottom: tabBarHeight }]}>
        <AdBanner />
      </View>

      <FlatList
        data={filteredMoves}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { paddingBottom: tabBarHeight + AD_BANNER_HEIGHT + 30 }]}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={true}
        initialNumToRender={8}
        maxToRenderPerBatch={6}
        windowSize={7}
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
  adWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
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

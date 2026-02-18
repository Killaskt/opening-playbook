import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  SectionList,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { openingsCatalog, catalogCategories, CatalogEntry, OpeningStyle, OpeningType } from '../../src/data/catalog';
import { nodesById } from '../../src/data/openings';
import { useTheme } from '../../src/theme/ThemeContext';
import { ScreenHeader } from '../../src/components/ScreenHeader';

const STYLE_COLORS: Record<OpeningStyle, { bg: string; darkBg: string; text: string; darkText: string }> = {
  sharp:       { bg: '#fde8e8', darkBg: '#3a1a1a', text: '#c62828', darkText: '#ef5350' },
  solid:       { bg: '#e3eefc', darkBg: '#1a2a3a', text: '#1565c0', darkText: '#64b5f6' },
  positional:  { bg: '#e4f5e6', darkBg: '#1a2e1a', text: '#2e7d32', darkText: '#66bb6a' },
  aggressive:  { bg: '#fff3e0', darkBg: '#2e1e0e', text: '#e65100', darkText: '#ff8a50' },
  flexible:    { bg: '#f0e4f6', darkBg: '#2a1a30', text: '#7b1fa2', darkText: '#ba68c8' },
  gambit:      { bg: '#fce4ec', darkBg: '#301020', text: '#ad1457', darkText: '#f06292' },
  hypermodern: { bg: '#dff0ee', darkBg: '#1a2e2a', text: '#00695c', darkText: '#4db6ac' },
};

const TYPE_LABELS: Record<OpeningType, { label: string; color: string; darkColor: string }> = {
  opening: { label: 'Opening', color: '#2e78b7', darkColor: '#5b9fd6' },
  defense: { label: 'Defense', color: '#7b1fa2', darkColor: '#ba68c8' },
  system:  { label: 'System',  color: '#00695c', darkColor: '#4db6ac' },
  gambit:  { label: 'Gambit',  color: '#c62828', darkColor: '#ef5350' },
};

const TYPE_ORDER: OpeningType[] = ['opening', 'gambit', 'defense', 'system'];

function sectionTitle(catLabel: string, type: OpeningType): string {
  const suffix = TYPE_LABELS[type].label + 's';
  return `${catLabel} \u2014 ${suffix}`;
}

export default function OpeningsScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const sections = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const filtered = openingsCatalog.filter((entry) => {
      const matchesSearch =
        !query ||
        entry.name.toLowerCase().includes(query) ||
        entry.description.toLowerCase().includes(query) ||
        entry.pgn.toLowerCase().includes(query) ||
        (entry.eco?.toLowerCase().includes(query) ?? false) ||
        (entry.style?.some(s => s.toLowerCase().includes(query)) ?? false);

      const matchesCategory = !activeCategory || entry.category === activeCategory;

      return matchesSearch && matchesCategory;
    });

    const result: { title: string; key: string; data: CatalogEntry[] }[] = [];

    for (const cat of catalogCategories) {
      const catEntries = filtered.filter((e) => e.category === cat.key);
      if (catEntries.length === 0) continue;

      for (const type of TYPE_ORDER) {
        const group = catEntries.filter((e) => e.type === type);
        if (group.length === 0) continue;
        result.push({
          title: sectionTitle(cat.label, type),
          key: `${cat.key}-${type}`,
          data: group,
        });
      }
    }

    return result;
  }, [searchQuery, activeCategory]);

  const handlePress = (entry: CatalogEntry) => {
    if (entry.nodeId && nodesById[entry.nodeId]) {
      router.push(`/move/${entry.nodeId}`);
    } else {
      router.push({
        pathname: '/opening-detail',
        params: {
          pgn: entry.pgn,
          name: entry.name,
          desc: entry.description,
          eco: entry.eco ?? '',
          style: entry.style?.join(',') ?? '',
          keyIdeas: entry.keyIdeas?.join('||') ?? '',
          type: entry.type,
        },
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScreenHeader title="Openings" subtitle="Browse named openings and defenses" />

      <View style={styles.searchBar}>
        <TextInput
          style={[styles.searchInput, {
            backgroundColor: colors.inputBg,
            borderColor: colors.inputBorder,
            color: colors.text,
          }]}
          placeholder="Search openings, styles..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
        <Pressable
          style={[styles.filterChip, { backgroundColor: !activeCategory ? colors.accent : colors.chipBg }]}
          onPress={() => setActiveCategory(null)}
        >
          <Text style={[styles.filterText, { color: !activeCategory ? '#fff' : colors.textTertiary }]}>All</Text>
        </Pressable>
        {catalogCategories.map((cat) => (
          <Pressable
            key={cat.key}
            style={[styles.filterChip, { backgroundColor: activeCategory === cat.key ? colors.accent : colors.chipBg }]}
            onPress={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
          >
            <Text style={[styles.filterText, { color: activeCategory === cat.key ? '#fff' : colors.textTertiary }]}>
              {cat.label}
            </Text>
          </Pressable>
        ))}
        </ScrollView>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.name + index}
        renderSectionHeader={({ section }) => (
          <View style={[styles.sectionHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.sectionHeaderText, { color: colors.textTertiary }]}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => {
          const tl = TYPE_LABELS[item.type];
          const typeColor = isDark ? tl.darkColor : tl.color;

          return (
            <Pressable
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
                pressed && { backgroundColor: colors.cardPressed, borderColor: colors.accent + '40' },
              ]}
              onPress={() => handlePress(item)}
            >
              <View style={styles.cardTop}>
                <View style={styles.cardTopLeft}>
                  <Text style={[styles.openingName, { color: colors.text }]}>{item.name}</Text>
                  <View style={[styles.typeBadge, { backgroundColor: typeColor + '20' }]}>
                    <Text style={[styles.typeBadgeText, { color: typeColor }]}>
                      {tl.label}
                    </Text>
                  </View>
                </View>
                {item.eco && (
                  <Text style={[styles.ecoLabel, { color: colors.textMuted, backgroundColor: colors.chipBg }]}>
                    {item.eco}
                  </Text>
                )}
              </View>

              <Text style={[styles.pgnText, { color: colors.accent }]}>{item.pgn}</Text>

              {item.style && item.style.length > 0 && (
                <View style={styles.styleRow}>
                  {item.style.map((s) => {
                    const sc = STYLE_COLORS[s];
                    return (
                      <View key={s} style={[styles.styleTag, { backgroundColor: isDark ? sc.darkBg : sc.bg }]}>
                        <Text style={[styles.styleTagText, { color: isDark ? sc.darkText : sc.text }]}>{s}</Text>
                      </View>
                    );
                  })}
                </View>
              )}

              <Text style={[styles.descText, { color: colors.textSecondary }]}>{item.description}</Text>

              {item.keyIdeas && item.keyIdeas.length > 0 && (
                <View style={styles.ideasSection}>
                  {item.keyIdeas.map((idea, i) => (
                    <View key={i} style={styles.ideaRow}>
                      <Text style={[styles.ideaDot, { color: colors.green }]}>+</Text>
                      <Text style={[styles.ideaText, { color: colors.textTertiary }]}>{idea}</Text>
                    </View>
                  ))}
                </View>
              )}

              {item.nodeId && nodesById[item.nodeId] && (
                <View style={[styles.linkHint, { borderTopColor: colors.borderLight }]}>
                  <Text style={[styles.linkHintText, { color: colors.accent }]}>Explore move-by-move</Text>
                  <Text style={[styles.linkArrow, { color: colors.accent }]}>{'>'}</Text>
                </View>
              )}
            </Pressable>
          );
        }}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No openings match your search</Text>
          </View>
        }
        stickySectionHeadersEnabled={false}
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
    paddingBottom: 10,
  },
  searchInput: {
    borderRadius: 10,
    padding: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
  },
  filterWrapper: {
    height: 56,
    marginBottom: 4,
  },
  filterRow: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 8,
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    includeFontPadding: false,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  sectionHeader: {
    marginTop: 14,
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  cardTopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
    gap: 8,
  },
  openingName: {
    fontSize: 16,
    fontWeight: '700',
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minHeight: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
    includeFontPadding: false,
  },
  ecoLabel: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
    overflow: 'hidden',
  },
  pgnText: {
    fontSize: 14,
    fontFamily: 'monospace',
    marginBottom: 10,
  },
  styleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  styleTag: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 12,
    minHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleTagText: {
    fontSize: 14,
    fontWeight: '700',
    includeFontPadding: false,
  },
  descText: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 6,
  },
  ideasSection: {
    marginTop: 6,
    gap: 5,
  },
  ideaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  ideaDot: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 18,
    marginTop: 1,
  },
  ideaText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 19,
  },
  linkHint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  linkHintText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  linkArrow: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});

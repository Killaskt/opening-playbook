import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  SectionList,
  Pressable,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { openingsCatalog, catalogCategories, CatalogEntry, OpeningStyle, OpeningType } from '../../src/data/catalog';
import { nodesById } from '../../src/data/openings';

const STYLE_COLORS: Record<OpeningStyle, { bg: string; text: string }> = {
  sharp: { bg: '#fde8e8', text: '#c62828' },
  solid: { bg: '#e8f0fe', text: '#1565c0' },
  positional: { bg: '#e8f5e9', text: '#2e7d32' },
  aggressive: { bg: '#fff3e0', text: '#e65100' },
  flexible: { bg: '#f3e5f5', text: '#7b1fa2' },
  gambit: { bg: '#fce4ec', text: '#ad1457' },
  hypermodern: { bg: '#e0f2f1', text: '#00695c' },
};

const TYPE_LABELS: Record<OpeningType, { label: string; color: string }> = {
  opening: { label: 'Opening', color: '#2e78b7' },
  defense: { label: 'Defense', color: '#7b1fa2' },
  system: { label: 'System', color: '#00695c' },
  gambit: { label: 'Gambit', color: '#c62828' },
};

const TYPE_ORDER: OpeningType[] = ['opening', 'gambit', 'defense', 'system'];

function sectionTitle(catLabel: string, type: OpeningType): string {
  const suffix = TYPE_LABELS[type].label + 's';
  return `${catLabel} — ${suffix}`;
}

export default function OpeningsScreen() {
  const router = useRouter();
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
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.screenTitle}>Openings</Text>
        <Text style={styles.screenSubtitle}>Browse named openings and defenses</Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search openings, styles..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#aaa"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        <Pressable
          style={[styles.filterChip, !activeCategory && styles.filterChipActive]}
          onPress={() => setActiveCategory(null)}
        >
          <Text style={[styles.filterText, !activeCategory && styles.filterTextActive]}>All</Text>
        </Pressable>
        {catalogCategories.map((cat) => (
          <Pressable
            key={cat.key}
            style={[styles.filterChip, activeCategory === cat.key && styles.filterChipActive]}
            onPress={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
          >
            <Text style={[styles.filterText, activeCategory === cat.key && styles.filterTextActive]}>
              {cat.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.name + index}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => {
          const typeInfo = TYPE_LABELS[item.type];

          return (
            <Pressable
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              onPress={() => handlePress(item)}
            >
              <View style={styles.cardTop}>
                <View style={styles.cardTopLeft}>
                  <Text style={styles.openingName}>{item.name}</Text>
                  <View style={[styles.typeBadge, { backgroundColor: typeInfo.color + '18' }]}>
                    <Text style={[styles.typeBadgeText, { color: typeInfo.color }]}>
                      {typeInfo.label}
                    </Text>
                  </View>
                </View>
                {item.eco && <Text style={styles.ecoLabel}>{item.eco}</Text>}
              </View>

              <Text style={styles.pgnText}>{item.pgn}</Text>

              {item.style && item.style.length > 0 && (
                <View style={styles.styleRow}>
                  {item.style.map((s) => (
                    <View key={s} style={[styles.styleTag, { backgroundColor: STYLE_COLORS[s].bg }]}>
                      <Text style={[styles.styleTagText, { color: STYLE_COLORS[s].text }]}>{s}</Text>
                    </View>
                  ))}
                </View>
              )}

              <Text style={styles.descText}>{item.description}</Text>

              {item.keyIdeas && item.keyIdeas.length > 0 && (
                <View style={styles.ideasSection}>
                  {item.keyIdeas.map((idea, i) => (
                    <View key={i} style={styles.ideaRow}>
                      <Text style={styles.ideaDot}>+</Text>
                      <Text style={styles.ideaText}>{idea}</Text>
                    </View>
                  ))}
                </View>
              )}

              {item.nodeId && nodesById[item.nodeId] && (
                <View style={styles.linkHint}>
                  <Text style={styles.linkHintText}>Explore move-by-move</Text>
                  <Text style={styles.linkArrow}>{'>'}</Text>
                </View>
              )}
            </Pressable>
          );
        }}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No openings match your search</Text>
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
    paddingBottom: 10,
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
  filterRow: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#f0edea',
  },
  filterChipActive: {
    backgroundColor: '#2e78b7',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#777',
  },
  filterTextActive: {
    color: '#fff',
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
    borderBottomColor: '#e8e4df',
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 0.3,
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
    color: '#333',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  ecoLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#aaa',
    backgroundColor: '#f5f3f0',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
    overflow: 'hidden',
  },
  pgnText: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#2e78b7',
    marginBottom: 10,
  },
  styleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  styleTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  styleTagText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  descText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 21,
    marginBottom: 6,
  },
  ideasSection: {
    marginTop: 6,
    gap: 4,
  },
  ideaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  ideaDot: {
    fontSize: 13,
    color: '#43a047',
    fontWeight: 'bold',
    width: 16,
    marginTop: 1,
  },
  ideaText: {
    fontSize: 13,
    color: '#666',
    flex: 1,
    lineHeight: 19,
  },
  linkHint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0edea',
  },
  linkHintText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2e78b7',
    flex: 1,
  },
  linkArrow: {
    fontSize: 14,
    color: '#2e78b7',
    fontWeight: '600',
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

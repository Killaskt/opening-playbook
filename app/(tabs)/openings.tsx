import React, { useState, useMemo } from 'react';
import {
  LayoutAnimation,
  Platform,
  View,
  Text,
  TextInput,
  SectionList,
  Pressable,
  StyleSheet,
  ScrollView,
  UIManager,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { openingsCatalog, catalogCategories, CatalogEntry, OpeningType } from '../../src/data/catalog';
import { nodesById } from '../../src/data/openings';
import { useTheme } from '../../src/theme/ThemeContext';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { openingStyleColors } from '../../src/theme/openingStyles';
import { EcoBadge, GlassCard, PillChip } from '../../src/components/UIPrimitives';
import { IdeaIcon } from '../../src/components/IdeaIcons';

const TYPE_ORDER: OpeningType[] = ['opening', 'gambit', 'defense', 'system'];

const TYPE_SECTION_LABEL: Record<OpeningType, string> = {
  opening: 'Openings',
  defense: 'Defenses',
  system: 'Systems',
  gambit: 'Gambits',
};
const TYPE_FILTERS: { key: OpeningType | null; label: string }[] = [
  { key: null, label: 'All types' },
  { key: 'opening', label: 'Main lines' },
  { key: 'defense', label: 'Defenses' },
  { key: 'gambit', label: 'Gambits' },
  { key: 'system', label: 'Systems' },
];

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function sectionTitle(catLabel: string, type: OpeningType): string {
  return `${catLabel} \u2014 ${TYPE_SECTION_LABEL[type]}`;
}

export default function OpeningsScreen() {
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();
  const { colors, isDark, spacing, typography } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<OpeningType | null>(null);

  const handleTypeFilterChange = (type: OpeningType | null) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveType(type);
  };

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

      const matchesType = !activeType || entry.type === activeType;

      return matchesSearch && matchesType;
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
  }, [searchQuery, activeType]);

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
      <ScreenHeader title="Library" subtitle="Browse opening encyclopedia entries" />

      <GlassCard style={[styles.searchBar, { marginHorizontal: spacing.lg, padding: spacing.md }]}>
        <TextInput
          style={[styles.searchInput, {
            backgroundColor: colors.inputBg,
            borderColor: colors.glassBorder,
            color: colors.text,
            ...typography.bodyLG,
          }]}
          placeholder="Search openings, styles..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textMuted}
          returnKeyType="search"
          onSubmitEditing={Keyboard.dismiss}
        />
      </GlassCard>

      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
          keyboardShouldPersistTaps="handled"
        >
          {TYPE_FILTERS.map((typeFilter) => (
            <Pressable
              key={typeFilter.label}
              onPress={() => handleTypeFilterChange(typeFilter.key)}
            >
              <PillChip
                label={typeFilter.label}
                backgroundColor={activeType === typeFilter.key ? colors.accent : colors.chipBg}
                textColor={activeType === typeFilter.key ? colors.textInverse : colors.textTertiary}
                style={styles.filterChip}
                textStyle={styles.filterText}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.name + index}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        renderSectionHeader={({ section }) => (
          <View style={[styles.sectionHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.sectionHeaderText, { color: colors.textTertiary }]}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={({ pressed }) => [
                styles.cardTouch,
                pressed && { opacity: 0.95 },
              ]}
              onPress={() => handlePress(item)}
            >
              <GlassCard style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={[styles.openingName, typography.titleSM, { color: colors.text }]}>{item.name}</Text>
                {item.eco && (
                  <EcoBadge code={item.eco} style={styles.ecoLabel} />
                )}
              </View>

              <Text style={[styles.pgnText, typography.mono, { color: colors.accent }]}>{item.pgn}</Text>

              {item.style && item.style.length > 0 && (
                <View style={styles.styleRow}>
                  {item.style.map((s) => {
                    const sc = openingStyleColors[s];
                    return (
                      <PillChip
                        key={s}
                        label={s}
                        backgroundColor={isDark ? sc.darkBg : sc.bg}
                        textColor={isDark ? sc.darkText : sc.text}
                        style={styles.styleTag}
                        textStyle={styles.styleTagText}
                      />
                    );
                  })}
                </View>
              )}

              <Text style={[styles.descText, typography.bodyMD, { color: colors.textSecondary }]}>{item.description}</Text>

              {item.keyIdeas && item.keyIdeas.length > 0 && (
                <View style={styles.ideasSection}>
                  {item.keyIdeas.map((idea, i) => (
                    <View key={i} style={styles.ideaRow}>
                      <View style={styles.ideaIconWrap}>
                        <IdeaIcon kind="idea" color={colors.green} size={14} />
                      </View>
                      <Text style={[styles.ideaText, typography.bodySM, { color: colors.textTertiary }]}>{idea}</Text>
                    </View>
                  ))}
                </View>
              )}

              {item.nodeId && nodesById[item.nodeId] && (
                <View style={[styles.linkHint, { borderTopColor: colors.borderLight, backgroundColor: colors.accentBg }]}>
                  <Text style={[styles.linkHintText, typography.label, { color: colors.accent }]}>Explore move-by-move</Text>
                  <Text style={[styles.linkArrow, { color: colors.accent }]}>{'>'}</Text>
                </View>
              )}
              </GlassCard>
            </Pressable>
          );
        }}
        contentContainerStyle={[styles.listContent, { paddingBottom: tabBarHeight + 30 }]}
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
  filterWrapper: {
    marginBottom: 10,
  },
  filterRow: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 10,
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    minHeight: 32,
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
    marginTop: 8,
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  cardTouch: {
    marginBottom: 10,
  },
  card: {
    borderRadius: 14,
    padding: 16,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  openingName: {
    flex: 1,
  },
  ecoLabel: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginLeft: 8,
  },
  pgnText: {
    fontSize: 14,
    marginBottom: 10,
  },
  styleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  styleTag: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    minHeight: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleTagText: {
    fontSize: 14,
    fontWeight: '700',
    includeFontPadding: false,
  },
  descText: {
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
  ideaIconWrap: {
    width: 18,
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
  ideaText: {
    flex: 1,
  },
  linkHint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginHorizontal: -16,
    marginBottom: -16,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
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

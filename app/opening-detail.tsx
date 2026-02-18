import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { AnimatedChessBoard } from '../src/components/AnimatedChessBoard';
import { nodesById } from '../src/data/openings';
import { openingsCatalog, OpeningStyle } from '../src/data/catalog';
import { useTheme } from '../src/theme/ThemeContext';

const STYLE_COLORS: Record<OpeningStyle, { bg: string; darkBg: string; text: string; darkText: string }> = {
  sharp:       { bg: '#fde8e8', darkBg: '#3a1a1a', text: '#c62828', darkText: '#ef5350' },
  solid:       { bg: '#e3eefc', darkBg: '#1a2a3a', text: '#1565c0', darkText: '#64b5f6' },
  positional:  { bg: '#e4f5e6', darkBg: '#1a2e1a', text: '#2e7d32', darkText: '#66bb6a' },
  aggressive:  { bg: '#fff3e0', darkBg: '#2e1e0e', text: '#e65100', darkText: '#ff8a50' },
  flexible:    { bg: '#f0e4f6', darkBg: '#2a1a30', text: '#7b1fa2', darkText: '#ba68c8' },
  gambit:      { bg: '#fce4ec', darkBg: '#301020', text: '#ad1457', darkText: '#f06292' },
  hypermodern: { bg: '#dff0ee', darkBg: '#1a2e2a', text: '#00695c', darkText: '#4db6ac' },
};

const TYPE_COLORS: Record<string, { light: string; dark: string }> = {
  opening: { light: '#2e78b7', dark: '#5b9fd6' },
  defense: { light: '#7b1fa2', dark: '#ba68c8' },
  system:  { light: '#00695c', dark: '#4db6ac' },
  gambit:  { light: '#c62828', dark: '#ef5350' },
};

export default function OpeningDetailScreen() {
  const { colors, isDark } = useTheme();
  const params = useLocalSearchParams<{
    pgn: string;
    name: string;
    desc: string;
    eco: string;
    style: string;
    keyIdeas: string;
    type: string;
  }>();
  const router = useRouter();

  const { pgn, name, desc } = params;
  const eco = params.eco || undefined;
  const styleList = params.style ? params.style.split(',').filter(Boolean) as OpeningStyle[] : [];
  const keyIdeas = params.keyIdeas ? params.keyIdeas.split('||').filter(Boolean) : [];
  const type = params.type || undefined;

  const catalogEntry = openingsCatalog.find(
    (e) => e.pgn === pgn && e.name === name
  );
  const linkedNode = catalogEntry?.nodeId ? nodesById[catalogEntry.nodeId] : undefined;

  const typeColor = type ? (isDark ? TYPE_COLORS[type]?.dark : TYPE_COLORS[type]?.light) || colors.textMuted : colors.textMuted;

  return (
    <>
      <Stack.Screen options={{ title: name || 'Opening' }} />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={[styles.heroCard, { backgroundColor: colors.card }]}>
            <View style={styles.heroTopRow}>
              <Text style={[styles.heroName, { color: colors.text }]}>{name}</Text>
              {type && (
                <View style={[styles.typeBadge, { backgroundColor: typeColor + '20' }]}>
                  <Text style={[styles.typeBadgeText, { color: typeColor }]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </View>
              )}
            </View>
            {eco && (
              <Text style={[styles.ecoLabel, { color: colors.textMuted, backgroundColor: colors.chipBg }]}>{eco}</Text>
            )}
            <View style={styles.boardWrapper}>
              <AnimatedChessBoard pgn={pgn || ''} />
            </View>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.card, borderLeftColor: colors.accent }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Moves</Text>
            <Text style={[styles.pgnText, { color: colors.accent }]}>{pgn}</Text>
          </View>

          {styleList.length > 0 && (
            <View style={[styles.infoCard, { backgroundColor: colors.card, borderLeftColor: colors.purple }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Style</Text>
              <View style={styles.styleRow}>
                {styleList.map((s) => {
                  const sc = STYLE_COLORS[s];
                  return (
                    <View key={s} style={[styles.styleTag, { backgroundColor: isDark ? sc.darkBg : sc.bg }]}>
                      <Text style={[styles.styleTagText, { color: isDark ? sc.darkText : sc.text }]}>{s}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {desc && (
            <View style={[styles.infoCard, { backgroundColor: colors.card, borderLeftColor: colors.green }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>About this opening</Text>
              <Text style={[styles.descText, { color: colors.textSecondary }]}>{desc}</Text>
            </View>
          )}

          {keyIdeas.length > 0 && (
            <View style={[styles.infoCard, { backgroundColor: colors.card, borderLeftColor: colors.orange }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Key ideas</Text>
              {keyIdeas.map((idea, i) => (
                <View key={i} style={styles.ideaRow}>
                  <Text style={[styles.ideaDot, { color: colors.green }]}>+</Text>
                  <Text style={[styles.ideaText, { color: colors.textSecondary }]}>{idea}</Text>
                </View>
              ))}
            </View>
          )}

          {linkedNode && (
            <Pressable
              style={({ pressed }) => [styles.exploreBtn, { backgroundColor: colors.accent }, pressed && { opacity: 0.85 }]}
              onPress={() => router.push(`/move/${linkedNode.id}`)}
            >
              <Text style={styles.exploreBtnText}>Explore move-by-move</Text>
              <Text style={styles.exploreBtnArrow}>{'>'}</Text>
            </Pressable>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  heroCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  heroName: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    minHeight: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  ecoLabel: {
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 16,
    overflow: 'hidden',
  },
  boardWrapper: {
    marginTop: 4,
  },
  infoCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
  },
  pgnText: {
    fontSize: 16,
    fontFamily: 'monospace',
    lineHeight: 24,
  },
  styleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  styleTag: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleTagText: {
    fontSize: 14,
    fontWeight: '700',
    includeFontPadding: false,
  },
  descText: {
    fontSize: 15,
    lineHeight: 24,
  },
  ideaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  ideaDot: {
    fontSize: 15,
    fontWeight: 'bold',
    width: 20,
    marginTop: 1,
  },
  ideaText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 21,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 12,
    marginTop: 8,
  },
  exploreBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
  },
  exploreBtnArrow: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
});

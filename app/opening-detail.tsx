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

const STYLE_COLORS: Record<OpeningStyle, { bg: string; text: string }> = {
  sharp: { bg: '#fde8e8', text: '#c62828' },
  solid: { bg: '#e8f0fe', text: '#1565c0' },
  positional: { bg: '#e8f5e9', text: '#2e7d32' },
  aggressive: { bg: '#fff3e0', text: '#e65100' },
  flexible: { bg: '#f3e5f5', text: '#7b1fa2' },
  gambit: { bg: '#fce4ec', text: '#ad1457' },
  hypermodern: { bg: '#e0f2f1', text: '#00695c' },
};

const TYPE_COLORS: Record<string, string> = {
  opening: '#2e78b7',
  defense: '#7b1fa2',
  system: '#00695c',
  gambit: '#c62828',
};

export default function OpeningDetailScreen() {
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

  return (
    <>
      <Stack.Screen options={{ title: name || 'Opening' }} />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.heroCard}>
            <View style={styles.heroTopRow}>
              <Text style={styles.heroName}>{name}</Text>
              {type && (
                <View style={[styles.typeBadge, { backgroundColor: (TYPE_COLORS[type] || '#888') + '18' }]}>
                  <Text style={[styles.typeBadgeText, { color: TYPE_COLORS[type] || '#888' }]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </View>
              )}
            </View>
            {eco && (
              <Text style={styles.ecoLabel}>{eco}</Text>
            )}
            <View style={styles.boardWrapper}>
              <AnimatedChessBoard pgn={pgn || ''} />
            </View>
          </View>

          <View style={styles.pgnSection}>
            <Text style={styles.sectionTitle}>Moves</Text>
            <Text style={styles.pgnText}>{pgn}</Text>
          </View>

          {styleList.length > 0 && (
            <View style={styles.styleSection}>
              <Text style={styles.sectionTitle}>Style</Text>
              <View style={styles.styleRow}>
                {styleList.map((s) => (
                  <View key={s} style={[styles.styleTag, { backgroundColor: STYLE_COLORS[s]?.bg || '#eee' }]}>
                    <Text style={[styles.styleTagText, { color: STYLE_COLORS[s]?.text || '#666' }]}>{s}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {desc && (
            <View style={styles.descSection}>
              <Text style={styles.sectionTitle}>About this opening</Text>
              <Text style={styles.descText}>{desc}</Text>
            </View>
          )}

          {keyIdeas.length > 0 && (
            <View style={styles.ideasSection}>
              <Text style={styles.sectionTitle}>Key ideas</Text>
              {keyIdeas.map((idea, i) => (
                <View key={i} style={styles.ideaRow}>
                  <Text style={styles.ideaDot}>+</Text>
                  <Text style={styles.ideaText}>{idea}</Text>
                </View>
              ))}
            </View>
          )}

          {linkedNode && (
            <Pressable
              style={({ pressed }) => [styles.exploreBtn, pressed && styles.exploreBtnPressed]}
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
    backgroundColor: '#faf8f5',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: '#fff',
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
    color: '#333',
    textAlign: 'center',
  },
  typeBadge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  ecoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    backgroundColor: '#f0edea',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 16,
    overflow: 'hidden',
  },
  boardWrapper: {
    marginTop: 4,
  },
  pgnSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2e78b7',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#444',
    marginBottom: 10,
  },
  pgnText: {
    fontSize: 16,
    fontFamily: 'monospace',
    color: '#2e78b7',
    lineHeight: 24,
  },
  styleSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#7b1fa2',
  },
  styleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  styleTag: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  styleTagText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  descSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#43a047',
  },
  descText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
  },
  ideasSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
    gap: 6,
  },
  ideaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  ideaDot: {
    fontSize: 15,
    color: '#43a047',
    fontWeight: 'bold',
    width: 20,
    marginTop: 1,
  },
  ideaText: {
    fontSize: 14,
    color: '#444',
    flex: 1,
    lineHeight: 21,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e78b7',
    padding: 18,
    borderRadius: 12,
    marginTop: 8,
  },
  exploreBtnPressed: {
    backgroundColor: '#1a5f9a',
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

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
import { openingStyleColors } from '../src/theme/openingStyles';
import { EcoBadge, GlassCard, PillChip, SectionCard, SectionTitle } from '../src/components/UIPrimitives';

const TYPE_COLORS: Record<string, { light: string; dark: string }> = {
  opening: { light: '#2e78b7', dark: '#5b9fd6' },
  defense: { light: '#7b1fa2', dark: '#ba68c8' },
  system:  { light: '#00695c', dark: '#4db6ac' },
  gambit:  { light: '#c62828', dark: '#ef5350' },
};

export default function OpeningDetailScreen() {
  const { colors, isDark, typography, spacing } = useTheme();
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
          <GlassCard style={[styles.heroCard, { padding: spacing.xxl }]}>
            <View style={styles.heroTopRow}>
              <Text style={[styles.heroName, typography.titleLG, { color: colors.text }]}>{name}</Text>
              {type && (
                <PillChip label={type.charAt(0).toUpperCase() + type.slice(1)} backgroundColor={typeColor + '20'} textColor={typeColor} style={styles.typeBadge} textStyle={styles.typeBadgeText} />
              )}
            </View>
            {eco && (
              <EcoBadge code={eco} style={styles.ecoLabel} />
            )}
            <View style={styles.boardWrapper}>
              <AnimatedChessBoard pgn={pgn || ''} />
            </View>
          </GlassCard>

          <SectionCard accentColor={colors.accent} style={styles.infoCard}>
            <SectionTitle>Moves</SectionTitle>
            <Text style={[styles.pgnText, typography.mono, { color: colors.accent }]}>{pgn}</Text>
          </SectionCard>

          {styleList.length > 0 && (
            <SectionCard accentColor={colors.purple} style={styles.infoCard}>
              <SectionTitle>Style</SectionTitle>
              <View style={styles.styleRow}>
                {styleList.map((s) => {
                  const sc = openingStyleColors[s];
                  return (
                    <PillChip key={s} label={s} backgroundColor={isDark ? sc.darkBg : sc.bg} textColor={isDark ? sc.darkText : sc.text} style={styles.styleTag} textStyle={styles.styleTagText} />
                  );
                })}
              </View>
            </SectionCard>
          )}

          {desc && (
            <SectionCard accentColor={colors.green} style={styles.infoCard}>
              <SectionTitle>About this opening</SectionTitle>
              <Text style={[styles.descText, typography.bodyLG, { color: colors.textSecondary }]}>{desc}</Text>
            </SectionCard>
          )}

          {keyIdeas.length > 0 && (
            <SectionCard accentColor={colors.orange} style={styles.infoCard}>
              <SectionTitle>Key ideas</SectionTitle>
              {keyIdeas.map((idea, i) => (
                <View key={i} style={styles.ideaRow}>
                  <Text style={[styles.ideaDot, { color: colors.green }]}>+</Text>
                  <Text style={[styles.ideaText, typography.bodyMD, { color: colors.textSecondary }]}>{idea}</Text>
                </View>
              ))}
            </SectionCard>
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
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  heroName: { textAlign: 'center' },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    minHeight: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBadgeText: {
    fontSize: 12,
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
  pgnText: {
    fontSize: 16,
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
    lineHeight: 23,
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
    flex: 1,
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

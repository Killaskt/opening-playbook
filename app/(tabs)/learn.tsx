import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { fundamentals, FundamentalSection } from '../../src/data/fundamentals';
import { AnimatedChessBoard } from '../../src/components/AnimatedChessBoard';
import { useTheme } from '../../src/theme/ThemeContext';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { GlassCard } from '../../src/components/UIPrimitives';

function SectionCard({ section }: { section: FundamentalSection }) {
  const [expanded, setExpanded] = useState(false);
  const { colors, typography } = useTheme();

  return (
    <Pressable
      style={[
        styles.card,
        { backgroundColor: colors.cardGlass, borderColor: expanded ? colors.accent + '40' : colors.glassBorder },
      ]}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleGroup}>
          <Text style={[styles.cardTitle, typography.titleSM, { color: colors.text }]}>{section.title}</Text>
          <Text style={[styles.cardSubtitle, typography.bodySM, { color: colors.textTertiary }]}>{section.subtitle}</Text>
        </View>
        <Text style={[styles.expandIcon, { color: colors.textMuted }]}>{expanded ? '\u2212' : '+'}</Text>
      </View>

      {expanded && (
        <View style={styles.cardBody}>
          <Text style={[styles.contentText, typography.bodyLG, { color: colors.textSecondary }]}>{section.content}</Text>

          <View style={styles.pointsSection}>
              <Text style={[styles.pointsLabel, typography.label, { color: colors.green }]}>Key ideas</Text>
            {section.keyPoints.map((point, i) => (
              <View key={i} style={styles.pointRow}>
                <Text style={[styles.pointDot, { color: colors.green }]}>+</Text>
                <Text style={[styles.pointText, typography.bodyMD, { color: colors.textSecondary }]}>{point}</Text>
              </View>
            ))}
          </View>

          {section.mistakes && section.mistakes.length > 0 && (
            <View style={styles.mistakesSection}>
              <Text style={[styles.mistakesLabel, typography.label, { color: colors.orange }]}>Common mistakes</Text>
              {section.mistakes.map((mistake, i) => (
                <View key={i} style={styles.pointRow}>
                  <Text style={[styles.mistakeDot, { color: colors.orange }]}>-</Text>
                  <Text style={[styles.pointText, typography.bodyMD, { color: colors.textSecondary }]}>{mistake}</Text>
                </View>
              ))}
            </View>
          )}

          {section.example && (
            <View style={[styles.exampleSection, { backgroundColor: colors.chipBg }]}>
              <Text style={[styles.exampleLabel, typography.bodySM, { color: colors.textTertiary }]}>{section.example.label}</Text>
              <AnimatedChessBoard pgn={section.example.pgn} compact />
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
}

export default function LearnScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: tabBarHeight + 24 }]}>
        <ScreenHeader title="Learn" subtitle="Understand the why behind the moves" />

        <GlassCard style={[styles.intro, { marginHorizontal: spacing.lg, padding: spacing.lg }]}>
          <Text style={[styles.introText, typography.bodyLG, { color: colors.textSecondary }]}>
            Before memorizing moves, understand why they're played. These
            principles are the foundation every strong player builds on.
          </Text>
        </GlassCard>

        {fundamentals.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 40,
  },
  intro: {
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 16,
  },
  introText: {
  },
  card: {
    borderRadius: 14,
    marginBottom: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },
  cardTitleGroup: {
    flex: 1,
  },
  cardTitle: {
    marginBottom: 2,
  },
  cardSubtitle: {
  },
  expandIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  cardBody: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  contentText: {
    marginBottom: 18,
  },
  pointsSection: {
    marginBottom: 16,
  },
  pointsLabel: {
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  pointDot: {
    fontSize: 15,
    fontWeight: 'bold',
    width: 20,
    marginTop: 1,
  },
  pointText: {
    flex: 1,
  },
  mistakesSection: {
    marginBottom: 16,
  },
  mistakesLabel: {
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mistakeDot: {
    fontSize: 15,
    fontWeight: 'bold',
    width: 20,
    marginTop: 1,
  },
  exampleSection: {
    borderRadius: 10,
    padding: 14,
    marginTop: 4,
  },
  exampleLabel: {
    marginBottom: 10,
    fontStyle: 'italic',
  },
});

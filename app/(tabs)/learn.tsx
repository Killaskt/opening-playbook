import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { fundamentals, FundamentalSection } from '../../src/data/fundamentals';
import { AnimatedChessBoard } from '../../src/components/AnimatedChessBoard';
import { useTheme } from '../../src/theme/ThemeContext';
import { ScreenHeader } from '../../src/components/ScreenHeader';

function SectionCard({ section }: { section: FundamentalSection }) {
  const [expanded, setExpanded] = useState(false);
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: expanded ? colors.accent + '40' : colors.border },
      ]}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleGroup}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>{section.title}</Text>
          <Text style={[styles.cardSubtitle, { color: colors.textTertiary }]}>{section.subtitle}</Text>
        </View>
        <Text style={[styles.expandIcon, { color: colors.textMuted }]}>{expanded ? '\u2212' : '+'}</Text>
      </View>

      {expanded && (
        <View style={styles.cardBody}>
          <Text style={[styles.contentText, { color: colors.textSecondary }]}>{section.content}</Text>

          <View style={styles.pointsSection}>
            <Text style={[styles.pointsLabel, { color: colors.green }]}>Key ideas</Text>
            {section.keyPoints.map((point, i) => (
              <View key={i} style={styles.pointRow}>
                <Text style={[styles.pointDot, { color: colors.green }]}>+</Text>
                <Text style={[styles.pointText, { color: colors.textSecondary }]}>{point}</Text>
              </View>
            ))}
          </View>

          {section.mistakes && section.mistakes.length > 0 && (
            <View style={styles.mistakesSection}>
              <Text style={[styles.mistakesLabel, { color: colors.orange }]}>Common mistakes</Text>
              {section.mistakes.map((mistake, i) => (
                <View key={i} style={styles.pointRow}>
                  <Text style={[styles.mistakeDot, { color: colors.orange }]}>-</Text>
                  <Text style={[styles.pointText, { color: colors.textSecondary }]}>{mistake}</Text>
                </View>
              ))}
            </View>
          )}

          {section.example && (
            <View style={[styles.exampleSection, { backgroundColor: colors.chipBg }]}>
              <Text style={[styles.exampleLabel, { color: colors.textTertiary }]}>{section.example.label}</Text>
              <AnimatedChessBoard pgn={section.example.pgn} compact />
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
}

export default function LearnScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ScreenHeader title="Learn" subtitle="Understand the why behind the moves" />

        <View style={styles.intro}>
          <Text style={[styles.introText, { color: colors.textSecondary }]}>
            Before memorizing moves, understand why they're played. These
            principles are the foundation every strong player builds on.
          </Text>
        </View>

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
    paddingHorizontal: 20,
    paddingTop: 8,
    marginBottom: 20,
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
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
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
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
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 18,
  },
  pointsSection: {
    marginBottom: 16,
  },
  pointsLabel: {
    fontSize: 14,
    fontWeight: '700',
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
    fontSize: 14,
    flex: 1,
    lineHeight: 21,
  },
  mistakesSection: {
    marginBottom: 16,
  },
  mistakesLabel: {
    fontSize: 14,
    fontWeight: '700',
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
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
    fontStyle: 'italic',
  },
});

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

function SectionCard({ section }: { section: FundamentalSection }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      style={[styles.card, expanded && styles.cardExpanded]}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleGroup}>
          <Text style={styles.cardTitle}>{section.title}</Text>
          <Text style={styles.cardSubtitle}>{section.subtitle}</Text>
        </View>
        <Text style={styles.expandIcon}>{expanded ? '−' : '+'}</Text>
      </View>

      {expanded && (
        <View style={styles.cardBody}>
          <Text style={styles.contentText}>{section.content}</Text>

          <View style={styles.pointsSection}>
            <Text style={styles.pointsLabel}>Key ideas</Text>
            {section.keyPoints.map((point, i) => (
              <View key={i} style={styles.pointRow}>
                <Text style={styles.pointDot}>+</Text>
                <Text style={styles.pointText}>{point}</Text>
              </View>
            ))}
          </View>

          {section.mistakes && section.mistakes.length > 0 && (
            <View style={styles.mistakesSection}>
              <Text style={styles.mistakesLabel}>Common mistakes</Text>
              {section.mistakes.map((mistake, i) => (
                <View key={i} style={styles.pointRow}>
                  <Text style={styles.mistakeDot}>-</Text>
                  <Text style={styles.pointText}>{mistake}</Text>
                </View>
              ))}
            </View>
          )}

          {section.example && (
            <View style={styles.exampleSection}>
              <Text style={styles.exampleLabel}>{section.example.label}</Text>
              <AnimatedChessBoard pgn={section.example.pgn} compact />
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
}

export default function LearnScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.intro}>
          <Text style={styles.introTitle}>Opening Fundamentals</Text>
          <Text style={styles.introText}>
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
    backgroundColor: '#faf8f5',
  },
  scrollContent: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 24,
    paddingBottom: 40,
  },

  intro: {
    paddingHorizontal: 4,
    paddingTop: 0,
    marginBottom: 20,
  },
  introTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#222',
    marginBottom: 4,
  },
  introText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8e4df',
    overflow: 'hidden',
  },
  cardExpanded: {
    borderColor: '#c8dce8',
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
    color: '#333',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#888',
  },
  expandIcon: {
    fontSize: 22,
    color: '#aaa',
    fontWeight: 'bold',
    paddingLeft: 12,
  },

  cardBody: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  contentText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    marginBottom: 18,
  },

  pointsSection: {
    marginBottom: 16,
  },
  pointsLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#43a047',
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
    color: '#43a047',
    fontWeight: 'bold',
    width: 20,
    marginTop: 1,
  },
  pointText: {
    fontSize: 14,
    color: '#444',
    flex: 1,
    lineHeight: 21,
  },

  mistakesSection: {
    marginBottom: 16,
  },
  mistakesLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#d4750b',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mistakeDot: {
    fontSize: 15,
    color: '#d4750b',
    fontWeight: 'bold',
    width: 20,
    marginTop: 1,
  },

  exampleSection: {
    backgroundColor: '#f8f6f3',
    borderRadius: 10,
    padding: 14,
    marginTop: 4,
  },
  exampleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
});

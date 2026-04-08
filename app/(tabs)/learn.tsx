import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { fundamentals, openingTypeGuideSection, FundamentalSection } from '../../src/data/fundamentals';
import { AnimatedChessBoard } from '../../src/components/AnimatedChessBoard';
import { useTheme } from '../../src/theme/ThemeContext';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { GlassCard } from '../../src/components/UIPrimitives';
import { AdBanner, AD_BANNER_HEIGHT } from '../../src/components/AdBanner';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function SectionCard({
  section,
  onExpandRequest,
}: {
  section: FundamentalSection;
  onExpandRequest?: (cardY: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [cardY, setCardY] = useState(0);
  const { colors, typography } = useTheme();
  const expandAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(expandAnim, {
      toValue: expanded ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [expandAnim, expanded]);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => {
      const next = !prev;
      if (next) {
        requestAnimationFrame(() => onExpandRequest?.(cardY - 50));
      }
      return next;
    });
  };

  return (
    <Pressable
      style={[
        styles.card,
        { backgroundColor: colors.cardGlass, borderColor: expanded ? colors.accent + '40' : colors.glassBorder },
      ]}
      onPress={toggleExpanded}
      onLayout={(event) => setCardY(event.nativeEvent.layout.y)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleGroup}>
          <Text style={[styles.cardTitle, typography.titleSM, { color: colors.text }]}>{section.title}</Text>
          <Text style={[styles.cardSubtitle, typography.bodySM, { color: colors.textTertiary }]}>{section.subtitle}</Text>
        </View>
        <Animated.Text
          style={[
            styles.expandIcon,
            {
              color: colors.textMuted,
              transform: [
                {
                  rotate: expandAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            },
          ]}
        >
          {'\u2304'}
        </Animated.Text>
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
  const learnSections: FundamentalSection[] = [openingTypeGuideSection, ...fundamentals];
  const scrollRef = useRef<ScrollView | null>(null);

  const handleCardExpandRequest = (cardY: number) => {
    scrollRef.current?.scrollTo({
      y: Math.max(cardY - 12, 0),
      animated: true,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.adWrapper, { bottom: tabBarHeight }]}>
        <AdBanner />
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: tabBarHeight + AD_BANNER_HEIGHT + 24 }]}
      >
        <ScreenHeader title="Learn" subtitle="Understand the why behind the moves" />

        <GlassCard style={[styles.intro, { marginHorizontal: spacing.lg, padding: spacing.lg }]}>
          <Text style={[styles.introText, typography.bodyLG, { color: colors.textSecondary }]}>
            Before memorizing moves, understand why they're played. These
            principles are the foundation every strong player builds on.
          </Text>
        </GlassCard>

        {learnSections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            onExpandRequest={handleCardExpandRequest}
          />
        ))}
      </ScrollView>
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

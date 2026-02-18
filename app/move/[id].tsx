import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { nodesById } from '../../src/data/openings';
import { catalogByNodeId } from '../../src/data/catalog';
import { PRINCIPLES } from '../../src/data/principles';
import { TreeView } from '../../src/components/TreeView';
import { AnimatedChessBoard } from '../../src/components/AnimatedChessBoard';
import { TrapInfo } from '../../src/types';
import { useTheme } from '../../src/theme/ThemeContext';
import { openingStyleColors } from '../../src/theme/openingStyles';
import { EcoBadge, GlassCard, PillChip, SectionCard, SectionTitle } from '../../src/components/UIPrimitives';
import { IdeaIcon, IdeaIconKind } from '../../src/components/IdeaIcons';

function TrapCard({ trap }: { trap: TrapInfo }) {
  const [expanded, setExpanded] = useState(false);
  const { colors } = useTheme();

  return (
    <Pressable
      style={[styles.trapCard, { backgroundColor: colors.yellowBg, borderColor: colors.yellow + '40' }]}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.trapHeader}>
        <Text style={[styles.trapName, { color: colors.yellow }]}>{trap.name}</Text>
        <Text style={[styles.trapToggle, { color: colors.yellow }]}>{expanded ? '\u2212' : '+'}</Text>
      </View>
      {expanded && (
        <View style={styles.trapBody}>
          <Text style={[styles.trapDesc, { color: colors.textSecondary }]}>{trap.description}</Text>
          {trap.pgn && (
            <View style={{ marginTop: 12 }}>
              <AnimatedChessBoard pgn={trap.pgn} compact />
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
}

type GlanceTab = 'strengths' | 'weaknesses' | 'watchOut';

export default function MoveDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors, isDark, typography } = useTheme();
  const opening = id ? nodesById[id] : undefined;
  const catalog = id ? catalogByNodeId.get(id) : undefined;
  const [glanceTab, setGlanceTab] = useState<GlanceTab>('strengths');
  const [deepDiveOpen, setDeepDiveOpen] = useState(false);

  if (!opening) {
    return (
      <>
        <Stack.Screen options={{ title: 'Not Found' }} />
        <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
          <View style={styles.notFoundContainer}>
            <Text style={[styles.notFoundText, { color: colors.textSecondary }]}>Opening not found</Text>
            <Pressable
              style={[styles.backButton, { backgroundColor: colors.accent }]}
              onPress={() => router.back()}
            >
              <Text style={styles.backButtonText}>Go Back</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </>
    );
  }

  const hasPrinciples = !!opening.principleApplications?.length;
  const hasWhyThisMove = !!opening.whyThisMove;
  const hasStrategicThemes = !!opening.strategicThemes?.length;
  const hasPros = !!opening.prosAndCons && opening.prosAndCons.pros.length > 0;
  const hasCons = !!opening.prosAndCons && opening.prosAndCons.cons.length > 0;
  const hasThreats = !!opening.threats?.length;
  const hasTraps = !!opening.traps?.length;
  const hasGlance = hasPros || hasCons || hasThreats || hasTraps;
  const hasResponses = opening.responses.length > 0;
  const hasLines = opening.lines.length > 0;
  const hasFamousPlayers = !!opening.famousPlayers?.length;
  const hasFamousGames = !!opening.famousGames?.length;
  const hasHallOfFame = hasFamousPlayers || hasFamousGames;
  const hasTree = opening.tree.length > 0;
  const hasDeepDive = hasLines || hasHallOfFame || hasTree;

  const glanceTabs: { key: GlanceTab; label: string; hasContent: boolean }[] = [
    { key: 'strengths', label: 'Strengths', hasContent: hasPros },
    { key: 'weaknesses', label: 'Weaknesses', hasContent: hasCons },
    { key: 'watchOut', label: 'Watch Out For', hasContent: hasThreats || hasTraps },
  ];
  const availableTabs = glanceTabs.filter(t => t.hasContent);

  return (
    <>
      <Stack.Screen options={{ title: opening.name }} />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* Hero */}
          <GlassCard style={[styles.heroCard, { backgroundColor: colors.cardGlassStrong }]}>
            <Text style={[styles.heroMove, { color: colors.accent }]}>{opening.move}</Text>
            <Text style={[styles.heroName, typography.titleLG, { color: colors.text }]}>{opening.name}</Text>
            {catalog?.eco && (
              <EcoBadge code={catalog.eco} style={styles.ecoBadge} />
            )}
            {opening.intent[0] && (
              <Text style={[styles.heroTagline, typography.bodyLG, { color: colors.textTertiary }]}>{opening.intent[0]}</Text>
            )}
            {catalog?.style && catalog.style.length > 0 && (
              <View style={styles.heroStyleRow}>
                {catalog.style.map((s) => {
                  const sc = openingStyleColors[s];
                  return (
                    <PillChip key={s} label={s} backgroundColor={isDark ? sc.darkBg : sc.bg} textColor={isDark ? sc.darkText : sc.text} style={styles.heroStyleTag} textStyle={styles.heroStyleText} />
                  );
                })}
              </View>
            )}
            <View style={styles.heroBoardWrapper}>
              <AnimatedChessBoard pgn={opening.boardPgn} arrows={opening.boardArrows} />
            </View>
          </GlassCard>

          {/* Principles */}
          {hasPrinciples && (
            <SectionCard style={styles.section} accentColor={colors.teal}>
              <SectionTitle>How to think about this</SectionTitle>
              <View style={styles.principlesContainer}>
                {opening.principleApplications!.map((pa, index) => {
                  const p = PRINCIPLES[pa.principleId];
                  if (!p) return null;
                  const ideaKind = (pa.principleId as IdeaIconKind) || 'idea';
                  return (
                    <View key={index} style={[styles.principleCard, { backgroundColor: colors.tealBg }]}>
                      <View style={styles.principleHeader}>
                        <View style={[styles.principleIconWrap, { backgroundColor: colors.cardGlassStrong }]}>
                          <IdeaIcon kind={ideaKind} color={colors.teal} size={16} />
                        </View>
                        <Text style={[styles.principleName, { color: colors.teal }]}>{p.name}</Text>
                      </View>
                      <Text style={[styles.principleExplanation, { color: colors.textSecondary }]}>{pa.explanation}</Text>
                    </View>
                  );
                })}
              </View>
            </SectionCard>
          )}

          {/* Why play this — node data takes priority, catalog description is fallback, intent lines as last resort */}
          {hasWhyThisMove ? (
            <SectionCard style={styles.section} accentColor={colors.accent}>
              <SectionTitle>Why play this?</SectionTitle>
              <Text style={[styles.bodyText, { color: colors.textSecondary }]}>{opening.whyThisMove}</Text>
            </SectionCard>
          ) : catalog?.description ? (
            <SectionCard style={styles.section} accentColor={colors.accent}>
              <SectionTitle>About this opening</SectionTitle>
              <Text style={[styles.bodyText, { color: colors.textSecondary }]}>{catalog.description}</Text>
            </SectionCard>
          ) : opening.intent.length > 1 ? (
            <SectionCard style={styles.section} accentColor={colors.accent}>
              <SectionTitle>Why play this?</SectionTitle>
              <View style={styles.bulletContainer}>
                {opening.intent.slice(1).map((line, i) => (
                  <View key={i} style={styles.bulletItem}>
                    <View style={styles.bulletIconWrap}>
                      <IdeaIcon kind="line" color={colors.accent} size={14} />
                    </View>
                    <Text style={[styles.bulletText, { color: colors.textSecondary }]}>{line}</Text>
                  </View>
                ))}
              </View>
            </SectionCard>
          ) : null}

          {/* Strategic themes — node data takes priority, catalog keyIdeas is fallback */}
          {hasStrategicThemes ? (
            <SectionCard style={styles.section} accentColor={colors.green}>
              <SectionTitle>What you're aiming for</SectionTitle>
              <View style={styles.bulletContainer}>
                {opening.strategicThemes!.map((theme, index) => (
                  <View key={index} style={styles.bulletItem}>
                    <View style={styles.bulletIconWrap}>
                      <IdeaIcon kind="idea" color={colors.green} size={14} />
                    </View>
                    <Text style={[styles.bulletText, { color: colors.textSecondary }]}>{theme}</Text>
                  </View>
                ))}
              </View>
            </SectionCard>
          ) : catalog?.keyIdeas && catalog.keyIdeas.length > 0 ? (
            <SectionCard style={styles.section} accentColor={colors.green}>
              <SectionTitle>Key ideas</SectionTitle>
              <View style={styles.bulletContainer}>
                {catalog.keyIdeas.map((idea, index) => (
                  <View key={index} style={styles.bulletItem}>
                    <View style={styles.bulletIconWrap}>
                      <IdeaIcon kind="idea" color={colors.green} size={14} />
                    </View>
                    <Text style={[styles.bulletText, { color: colors.textSecondary }]}>{idea}</Text>
                  </View>
                ))}
              </View>
            </SectionCard>
          ) : null}

          {/* At a Glance */}
          {hasGlance && availableTabs.length > 0 && (
            <SectionCard style={styles.section} accentColor={colors.textMuted}>
              <SectionTitle>At a Glance</SectionTitle>
              <View style={[styles.tabBar, { backgroundColor: colors.cardGlassStrong, borderColor: colors.glassBorder }]}>
                {availableTabs.map((tab) => (
                  <Pressable
                    key={tab.key}
                    style={[
                      styles.tab,
                      glanceTab === tab.key && [styles.tabActive, { backgroundColor: colors.accentBg, borderColor: colors.accent + '40' }],
                    ]}
                    onPress={() => setGlanceTab(tab.key)}
                  >
                    <Text style={[
                      styles.tabText,
                      { color: colors.textTertiary },
                      glanceTab === tab.key && { color: colors.text },
                    ]}>
                      {tab.label}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View style={styles.tabContent}>
                {glanceTab === 'strengths' && hasPros && (
                  <View style={styles.glanceList}>
                    {opening.prosAndCons!.pros.map((pro, index) => (
                      <View key={index} style={styles.bulletItem}>
                        <View style={styles.bulletIconWrap}>
                          <IdeaIcon kind="pro" color={colors.green} size={14} />
                        </View>
                        <Text style={[styles.bulletText, { color: colors.textSecondary }]}>{pro}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {glanceTab === 'weaknesses' && hasCons && (
                  <View style={styles.glanceList}>
                    {opening.prosAndCons!.cons.map((con, index) => (
                      <View key={index} style={styles.bulletItem}>
                        <View style={styles.bulletIconWrap}>
                          <IdeaIcon kind="con" color={colors.yellow} size={14} />
                        </View>
                        <Text style={[styles.bulletText, { color: colors.textSecondary }]}>{con}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {glanceTab === 'watchOut' && (hasThreats || hasTraps) && (
                  <View style={styles.glanceList}>
                    {hasThreats && opening.threats!.map((threat, index) => (
                      <View key={`t-${index}`} style={styles.bulletItem}>
                        <View style={styles.bulletIconWrap}>
                          <IdeaIcon kind="warning" color={colors.yellow} size={14} />
                        </View>
                        <Text style={[styles.bulletText, { color: colors.textSecondary }]}>{threat}</Text>
                      </View>
                    ))}
                    {hasTraps && (
                      <View style={styles.trapsContainer}>
                        {opening.traps!.map((t, index) => (
                          <TrapCard key={index} trap={t} />
                        ))}
                      </View>
                    )}
                  </View>
                )}
              </View>
            </SectionCard>
          )}

          {/* Where this goes next — redesigned */}
          {hasResponses && (
            <SectionCard style={styles.section} accentColor={colors.orange}>
              <View style={styles.responsesHeader}>
                <SectionTitle style={[styles.responsesTitle, { color: colors.text }]}>
                  Continue the line
                </SectionTitle>
                <Text style={[styles.responsesSubtitle, { color: colors.textTertiary }]}>
                  {opening.responses.length} {opening.responses.length === 1 ? 'response' : 'responses'}
                </Text>
              </View>
              <View style={styles.responsesGrid}>
                {opening.responses.map((resp) => (
                  <Pressable
                    key={resp.id}
                    style={({ pressed }) => [
                      styles.responseCard,
                      {
                        backgroundColor: colors.cardGlassStrong,
                        borderColor: colors.glassBorder,
                      },
                      pressed && { backgroundColor: colors.accentBg },
                    ]}
                    onPress={() => router.push(`/move/${resp.id}`)}
                  >
                    <View
                      style={[
                        styles.responseMoveCircle,
                        { backgroundColor: colors.accentBg, borderColor: colors.accent + '40' },
                      ]}
                    >
                      <Text style={[styles.responseMove, { color: colors.accent }]}>{resp.move}</Text>
                    </View>
                    <Text style={[styles.responseName, { color: colors.text }]} numberOfLines={2}>{resp.name}</Text>
                    <Text style={[styles.responseArrow, { color: colors.accent }]}>{'\u203A'}</Text>
                  </Pressable>
                ))}
              </View>
            </SectionCard>
          )}

          {/* Go deeper */}
          {hasDeepDive && (
            <SectionCard style={styles.section} accentColor={colors.purple}>
              <Pressable
                style={styles.deepDiveToggle}
                onPress={() => setDeepDiveOpen(!deepDiveOpen)}
              >
                <SectionTitle style={styles.deepDiveTitle}>Go deeper</SectionTitle>
                <Text style={[styles.deepDiveArrow, { color: colors.purple }]}>{deepDiveOpen ? '\u2212' : '+'}</Text>
              </Pressable>

              {deepDiveOpen && (
                <View style={styles.deepDiveContent}>
                  {hasLines && (
                    <View style={styles.deepDiveSubsection}>
                      <Text style={[styles.subsectionTitle, { color: colors.textTertiary }]}>Example lines</Text>
                      {opening.lines.slice(0, 2).map((exLine, index) => (
                        <View key={index} style={styles.lineBoard}>
                          <AnimatedChessBoard pgn={exLine.pgn} compact label={exLine.label} />
                        </View>
                      ))}
                    </View>
                  )}

                  {hasHallOfFame && (
                    <View style={styles.deepDiveSubsection}>
                      <Text style={[styles.subsectionTitle, { color: colors.textTertiary }]}>Hall of Fame</Text>
                      {hasFamousPlayers && (
                        <View style={styles.chipsContainer}>
                          {opening.famousPlayers!.map((player, index) => (
                            <View key={index} style={[styles.playerChip, { backgroundColor: colors.purpleBg }]}>
                              <Text style={[styles.playerChipText, { color: colors.purple }]}>{player}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                      {hasFamousGames && (
                        <View style={styles.gamesContainer}>
                          {opening.famousGames!.map((g, index) => (
                            <View key={index} style={[styles.gameCard, { backgroundColor: colors.purpleBg, borderLeftColor: colors.purple }]}>
                              <Text style={[styles.gamePlayers, { color: colors.purple }]}>{g.players}</Text>
                              <Text style={[styles.gameDesc, { color: colors.textSecondary }]}>{g.description}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  )}

                  {hasTree && (
                    <View style={styles.deepDiveSubsection}>
                      <Text style={[styles.subsectionTitle, { color: colors.textTertiary }]}>Full move tree</Text>
                      <View style={[styles.treeContainer, { backgroundColor: colors.cardGlassStrong, borderColor: colors.glassBorder }]}>
                        <TreeView nodes={opening.tree} />
                      </View>
                    </View>
                  )}
                </View>
              )}
            </SectionCard>
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

  section: {
    marginBottom: 24,
  },
  sectionCard: {
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 14,
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
  heroMove: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 6,
  },
  heroName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  ecoBadge: {
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
    overflow: 'hidden',
  },
  heroTagline: {
    fontSize: 15,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 10,
  },
  heroStyleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  heroStyleTag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },
  heroStyleText: {
    fontSize: 13,
    fontWeight: '700',
  },
  heroBoardWrapper: {
    marginTop: 4,
  },

  principlesContainer: {
    gap: 12,
  },
  principleCard: {
    borderRadius: 10,
    padding: 14,
  },
  principleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  principleIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  principleName: {
    fontSize: 15,
    fontWeight: '700',
  },
  principleExplanation: {
    fontSize: 14,
    lineHeight: 21,
    paddingLeft: 32,
  },

  bodyText: {
    fontSize: 15,
    lineHeight: 24,
  },

  bulletContainer: {
    gap: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletDot: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
    width: 18,
  },
  bulletIconWrap: {
    width: 18,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
  bulletText: {
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },

  tabBar: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    padding: 3,
    borderWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: {
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tabContent: {
    minHeight: 60,
  },
  glanceList: {
    gap: 8,
  },
  trapsContainer: {
    gap: 10,
    marginTop: 8,
  },
  trapCard: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  trapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  trapName: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  trapToggle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  trapBody: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  trapDesc: {
    fontSize: 14,
    lineHeight: 21,
  },

  // Responses — redesigned
  responsesHeader: {
    marginBottom: 12,
    paddingRight: 6,
  },
  responsesTitle: {
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 3,
  },
  responsesSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  responsesGrid: {
    gap: 10,
  },
  responseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  responseMoveCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  responseMove: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  responseName: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  responseArrow: {
    fontSize: 24,
    fontWeight: '600',
  },

  deepDiveToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deepDiveTitle: {
    marginBottom: 0,
  },
  deepDiveArrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  deepDiveContent: {
    marginTop: 16,
  },
  deepDiveSubsection: {
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  lineBoard: {
    marginBottom: 16,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  playerChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  playerChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  gamesContainer: {
    gap: 10,
  },
  gameCard: {
    padding: 14,
    borderRadius: 8,
    borderLeftWidth: 3,
  },
  gamePlayers: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  gameDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  treeContainer: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },

  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    marginBottom: 20,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

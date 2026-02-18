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
import { PRINCIPLES } from '../../src/data/principles';
import { TreeView } from '../../src/components/TreeView';
import { AnimatedChessBoard } from '../../src/components/AnimatedChessBoard';
import { TrapInfo } from '../../src/types';

function TrapCard({ trap }: { trap: TrapInfo }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      style={styles.trapCard}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.trapHeader}>
        <Text style={styles.trapName}>{trap.name}</Text>
        <Text style={styles.trapToggle}>{expanded ? '−' : '+'}</Text>
      </View>
      {expanded && (
        <View style={styles.trapBody}>
          <Text style={styles.trapDesc}>{trap.description}</Text>
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

// "At a Glance" tab type
type GlanceTab = 'strengths' | 'weaknesses' | 'watchOut';

export default function MoveDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const opening = id ? nodesById[id] : undefined;
  const [glanceTab, setGlanceTab] = useState<GlanceTab>('strengths');
  const [deepDiveOpen, setDeepDiveOpen] = useState(false);

  if (!opening) {
    return (
      <>
        <Stack.Screen options={{ title: 'Not Found' }} />
        <SafeAreaView style={styles.container}>
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundText}>Opening not found</Text>
            <Pressable
              style={styles.backButton}
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

  // Determine which glance tabs have content
  const glanceTabs: { key: GlanceTab; label: string; hasContent: boolean }[] = [
    { key: 'strengths', label: 'Strengths', hasContent: hasPros },
    { key: 'weaknesses', label: 'Weaknesses', hasContent: hasCons },
    { key: 'watchOut', label: 'Watch Out For', hasContent: hasThreats || hasTraps },
  ];
  const availableTabs = glanceTabs.filter(t => t.hasContent);

  return (
    <>
      <Stack.Screen options={{ title: opening.name }} />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* 1. Hero — move name + board in one card */}
          <View style={styles.heroCard}>
            <Text style={styles.heroMove}>{opening.move}</Text>
            <Text style={styles.heroName}>{opening.name}</Text>
            {opening.intent[0] && (
              <Text style={styles.heroTagline}>{opening.intent[0]}</Text>
            )}
            <View style={styles.heroBoardWrapper}>
              <AnimatedChessBoard pgn={opening.boardPgn} arrows={opening.boardArrows} />
            </View>
          </View>

          {/* 2. How to think about this — principle applications */}
          {hasPrinciples && (
            <View style={[styles.section, styles.principlesSection]}>
              <Text style={styles.sectionTitle}>How to think about this</Text>
              <View style={styles.principlesContainer}>
                {opening.principleApplications!.map((pa, index) => {
                  const p = PRINCIPLES[pa.principleId];
                  if (!p) return null;
                  return (
                    <View key={index} style={styles.principleCard}>
                      <View style={styles.principleHeader}>
                        <Text style={styles.principleIcon}>{p.icon}</Text>
                        <Text style={styles.principleName}>{p.name}</Text>
                      </View>
                      <Text style={styles.principleExplanation}>{pa.explanation}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* 3. Why play this? */}
          {hasWhyThisMove && (
            <View style={[styles.section, styles.whySection]}>
              <Text style={styles.sectionTitle}>Why play this?</Text>
              <Text style={styles.whyText}>{opening.whyThisMove}</Text>
            </View>
          )}

          {/* 4. What you're aiming for */}
          {hasStrategicThemes && (
            <View style={[styles.section, styles.themesSection]}>
              <Text style={styles.sectionTitle}>What you're aiming for</Text>
              <View style={styles.bulletContainer}>
                {opening.strategicThemes!.map((theme, index) => (
                  <View key={index} style={styles.bulletItem}>
                    <Text style={styles.bulletDot}>+</Text>
                    <Text style={styles.bulletText}>{theme}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* 5. At a Glance — tabbed: Strengths / Weaknesses / Watch Out For */}
          {hasGlance && availableTabs.length > 0 && (
            <View style={[styles.section, styles.glanceSection]}>
              <Text style={styles.sectionTitle}>At a Glance</Text>
              <View style={styles.tabBar}>
                {availableTabs.map((tab) => (
                  <Pressable
                    key={tab.key}
                    style={[
                      styles.tab,
                      glanceTab === tab.key && styles.tabActive,
                    ]}
                    onPress={() => setGlanceTab(tab.key)}
                  >
                    <Text style={[
                      styles.tabText,
                      glanceTab === tab.key && styles.tabTextActive,
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
                        <Text style={styles.proDot}>+</Text>
                        <Text style={styles.bulletText}>{pro}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {glanceTab === 'weaknesses' && hasCons && (
                  <View style={styles.glanceList}>
                    {opening.prosAndCons!.cons.map((con, index) => (
                      <View key={index} style={styles.bulletItem}>
                        <Text style={styles.conDot}>-</Text>
                        <Text style={styles.bulletText}>{con}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {glanceTab === 'watchOut' && (hasThreats || hasTraps) && (
                  <View style={styles.glanceList}>
                    {hasThreats && opening.threats!.map((threat, index) => (
                      <View key={`t-${index}`} style={styles.bulletItem}>
                        <Text style={styles.threatDot}>!</Text>
                        <Text style={styles.bulletText}>{threat}</Text>
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
            </View>
          )}

          {/* 6. Where this goes next */}
          {hasResponses && (
            <View style={[styles.section, styles.responsesSection]}>
              <Text style={styles.sectionTitle}>Where this goes next</Text>
              {opening.responses.map((resp) => (
                <Pressable
                  key={resp.id}
                  style={({ pressed }) => [
                    styles.responseCard,
                    pressed && styles.responseCardPressed,
                  ]}
                  onPress={() => router.push(`/move/${resp.id}`)}
                >
                  <Text style={styles.responseMove}>{resp.move}</Text>
                  <Text style={styles.responseName}>{resp.name}</Text>
                  <Text style={styles.responseArrow}>{'>'}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {/* 7. Go deeper — collapsible section */}
          {hasDeepDive && (
            <View style={[styles.section, styles.deepDiveSection]}>
              <Pressable
                style={styles.deepDiveToggle}
                onPress={() => setDeepDiveOpen(!deepDiveOpen)}
              >
                <Text style={styles.sectionTitle}>Go deeper</Text>
                <Text style={styles.deepDiveArrow}>{deepDiveOpen ? '−' : '+'}</Text>
              </Pressable>

              {deepDiveOpen && (
                <View style={styles.deepDiveContent}>
                  {/* Example lines */}
                  {hasLines && (
                    <View style={styles.deepDiveSubsection}>
                      <Text style={styles.subsectionTitle}>Example lines</Text>
                      {opening.lines.slice(0, 2).map((exLine, index) => (
                        <View key={index} style={styles.lineBoard}>
                          <AnimatedChessBoard
                            pgn={exLine.pgn}
                            compact
                            label={exLine.label}
                          />
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Hall of Fame */}
                  {hasHallOfFame && (
                    <View style={styles.deepDiveSubsection}>
                      <Text style={styles.subsectionTitle}>Hall of Fame</Text>
                      {hasFamousPlayers && (
                        <View style={styles.chipsContainer}>
                          {opening.famousPlayers!.map((player, index) => (
                            <View key={index} style={styles.playerChip}>
                              <Text style={styles.playerChipText}>{player}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                      {hasFamousGames && (
                        <View style={styles.gamesContainer}>
                          {opening.famousGames!.map((g, index) => (
                            <View key={index} style={styles.gameCard}>
                              <Text style={styles.gamePlayers}>{g.players}</Text>
                              <Text style={styles.gameDesc}>{g.description}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  )}

                  {/* Full move tree */}
                  {hasTree && (
                    <View style={styles.deepDiveSubsection}>
                      <Text style={styles.subsectionTitle}>Full move tree</Text>
                      <View style={styles.treeContainer}>
                        <TreeView nodes={opening.tree} />
                      </View>
                    </View>
                  )}
                </View>
              )}
            </View>
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

  // Section spacing
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#444',
    marginBottom: 14,
  },

  // 1. Hero Card — merged header + board
  heroCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
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
    color: '#2e78b7',
    fontFamily: 'monospace',
    marginBottom: 6,
  },
  heroName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  heroTagline: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 16,
  },
  heroBoardWrapper: {
    marginTop: 4,
  },

  // 2. Principles — teal accent
  principlesSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#00897b',
  },
  principlesContainer: {
    gap: 12,
  },
  principleCard: {
    backgroundColor: '#e0f2f1',
    borderRadius: 10,
    padding: 14,
  },
  principleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  principleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00695c',
    marginRight: 8,
    width: 24,
    textAlign: 'center',
  },
  principleName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#00695c',
  },
  principleExplanation: {
    fontSize: 14,
    color: '#37474f',
    lineHeight: 21,
    paddingLeft: 32,
  },

  // 3. Why play this — blue accent
  whySection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2e78b7',
  },
  whyText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
  },

  // 4. Strategic themes — green accent
  themesSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#43a047',
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
    color: '#43a047',
    marginRight: 10,
    fontWeight: 'bold',
    width: 18,
  },
  bulletText: {
    fontSize: 15,
    color: '#444',
    flex: 1,
    lineHeight: 22,
  },

  // 5. At a Glance — tabbed section
  glanceSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#8e99a4',
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f0edea',
    borderRadius: 8,
    padding: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
  },
  tabTextActive: {
    color: '#333',
  },
  tabContent: {
    minHeight: 60,
  },
  glanceList: {
    gap: 8,
  },
  proDot: {
    fontSize: 16,
    color: '#43a047',
    marginRight: 10,
    fontWeight: 'bold',
    width: 18,
  },
  conDot: {
    fontSize: 16,
    color: '#e6a817',
    marginRight: 10,
    fontWeight: 'bold',
    width: 18,
  },
  threatDot: {
    fontSize: 14,
    color: '#e6a817',
    marginRight: 10,
    fontWeight: 'bold',
    width: 18,
    textAlign: 'center',
  },
  trapsContainer: {
    gap: 10,
    marginTop: 8,
  },
  trapCard: {
    backgroundColor: '#fefcf3',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f0e6c8',
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
    color: '#8b6914',
    flex: 1,
  },
  trapToggle: {
    fontSize: 20,
    color: '#8b6914',
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  trapBody: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  trapDesc: {
    fontSize: 14,
    color: '#555',
    lineHeight: 21,
  },

  // 6. Responses — blue accent
  responsesSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2e78b7',
  },
  responseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#faf8f5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e8e4df',
  },
  responseCardPressed: {
    backgroundColor: '#eef5fb',
    borderColor: '#2e78b7',
  },
  responseMove: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e78b7',
    fontFamily: 'monospace',
    marginRight: 12,
    minWidth: 60,
  },
  responseName: {
    fontSize: 16,
    color: '#444',
    flex: 1,
  },
  responseArrow: {
    fontSize: 18,
    color: '#aaa',
    fontWeight: '600',
  },

  // 7. Deep Dive — collapsible
  deepDiveSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#7e57c2',
  },
  deepDiveToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deepDiveArrow: {
    fontSize: 24,
    color: '#7e57c2',
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
    color: '#666',
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
    backgroundColor: '#ede7f6',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  playerChipText: {
    fontSize: 14,
    color: '#5e35b1',
    fontWeight: '600',
  },
  gamesContainer: {
    gap: 10,
  },
  gameCard: {
    backgroundColor: '#f5f0fa',
    padding: 14,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#7e57c2',
  },
  gamePlayers: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4a148c',
    marginBottom: 4,
  },
  gameDesc: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  treeContainer: {
    backgroundColor: '#faf8f5',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8e4df',
  },

  // Not found
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#2e78b7',
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

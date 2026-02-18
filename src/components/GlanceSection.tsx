import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { BulletRow } from './BulletRow';
import { SectionCard, SectionTitle } from './UIPrimitives';
import { TrapCard } from './TrapCard';
import { TrapInfo } from '../types';
import { useTheme } from '../theme/ThemeContext';

type GlanceTab = 'strengths' | 'weaknesses' | 'watchOut';

interface GlanceSectionProps {
  pros: string[];
  cons: string[];
  threats: string[];
  traps: TrapInfo[];
}

export function GlanceSection({ pros, cons, threats, traps }: GlanceSectionProps) {
  const { colors } = useTheme();
  const [glanceTab, setGlanceTab] = useState<GlanceTab>('strengths');

  const hasPros = pros.length > 0;
  const hasCons = cons.length > 0;
  const hasThreats = threats.length > 0;
  const hasTraps = traps.length > 0;

  const availableTabs = useMemo(() => {
    const tabs: { key: GlanceTab; label: string; hasContent: boolean }[] = [
      { key: 'strengths', label: 'Strengths', hasContent: hasPros },
      { key: 'weaknesses', label: 'Weaknesses', hasContent: hasCons },
      { key: 'watchOut', label: 'Watch Out For', hasContent: hasThreats || hasTraps },
    ];
    return tabs.filter(t => t.hasContent);
  }, [hasPros, hasCons, hasThreats, hasTraps]);

  if (availableTabs.length === 0) return null;

  return (
    <SectionCard accentColor={colors.textMuted}>
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
            {pros.map((pro, index) => (
              <BulletRow key={index} icon="pro" iconColor={colors.green} text={pro} />
            ))}
          </View>
        )}

        {glanceTab === 'weaknesses' && hasCons && (
          <View style={styles.glanceList}>
            {cons.map((con, index) => (
              <BulletRow key={index} icon="con" iconColor={colors.yellow} text={con} />
            ))}
          </View>
        )}

        {glanceTab === 'watchOut' && (hasThreats || hasTraps) && (
          <View style={styles.glanceList}>
            {hasThreats && threats.map((threat, index) => (
              <BulletRow key={`t-${index}`} icon="warning" iconColor={colors.yellow} text={threat} />
            ))}
            {hasTraps && (
              <View style={styles.trapsContainer}>
                {traps.map((t, index) => (
                  <TrapCard key={index} trap={t} />
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
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
});

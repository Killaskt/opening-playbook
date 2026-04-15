import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { BulletRow } from './BulletRow';
import { SectionCard, SectionTitle } from './UIPrimitives';
import { TrapCard } from './TrapCard';
import type { TrapInfo } from '../types';

type GlanceTab = 'strengths' | 'weaknesses' | 'watchOut';

interface GlanceSectionProps {
  pros?: string[];
  cons?: string[];
  threats?: string[];
  traps?: TrapInfo[];
}

export function GlanceSection({
  pros = [],
  cons = [],
  threats = [],
  traps = [],
}: GlanceSectionProps) {
  const { colors, spacing, typography } = useTheme();
  const [activeTab, setActiveTab] = useState<GlanceTab>('strengths');

  const availableTabs = useMemo(() => {
    const tabs: { key: GlanceTab; label: string; hasContent: boolean }[] = [
      { key: 'strengths', label: 'Strengths', hasContent: pros.length > 0 },
      { key: 'weaknesses', label: 'Weaknesses', hasContent: cons.length > 0 },
      { key: 'watchOut', label: 'Watch Out For', hasContent: threats.length > 0 || traps.length > 0 },
    ];
    return tabs.filter((t) => t.hasContent);
  }, [pros.length, cons.length, threats.length, traps.length]);

  if (availableTabs.length === 0) return null;

  const currentTab = availableTabs.some((t) => t.key === activeTab) ? activeTab : availableTabs[0].key;

  const tabBarStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: spacing.lg,
    borderRadius: 8,
    padding: 3,
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.cardGlassStrong,
    gap: 2,
  };

  const tabBtnStyle = (active: boolean): CSSProperties => ({
    flex: 1,
    paddingTop: 9,
    paddingBottom: 9,
    textAlign: 'center',
    borderRadius: 6,
    border: active ? `1px solid ${colors.accent}40` : '1px solid transparent',
    backgroundColor: active ? colors.accentBg : 'transparent',
    cursor: 'pointer',
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
    color: active ? colors.text : colors.textTertiary,
    transition: 'background-color 0.15s ease, color 0.15s ease',
  });

  const contentStyle: CSSProperties = {
    minHeight: 60,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  };

  return (
    <SectionCard accentColor={colors.textMuted}>
      <SectionTitle>At a Glance</SectionTitle>
      <div style={tabBarStyle}>
        {availableTabs.map((tab) => (
          <button key={tab.key} style={tabBtnStyle(currentTab === tab.key)} onClick={() => setActiveTab(tab.key)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div style={contentStyle}>
        {currentTab === 'strengths' && pros.map((pro, i) => (
          <BulletRow key={i} text={pro} kind="pro" />
        ))}
        {currentTab === 'weaknesses' && cons.map((con, i) => (
          <BulletRow key={i} text={con} kind="con" />
        ))}
        {currentTab === 'watchOut' && (
          <>
            {threats.map((threat, i) => (
              <BulletRow key={`t-${i}`} text={threat} kind="warning" />
            ))}
            {traps.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: threats.length > 0 ? spacing.sm : 0 }}>
                {traps.map((trap, i) => (
                  <TrapCard key={i} trap={trap} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </SectionCard>
  );
}

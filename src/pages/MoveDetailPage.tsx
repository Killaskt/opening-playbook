import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import { nodesById } from '../data/openings';
import { catalogByNodeId } from '../data/catalog';
import { PRINCIPLES } from '../data/principles';
import { openingStyleColors } from '../theme/openingStyles';
import { AnimatedChessBoard } from '../components/AnimatedChessBoard';
import { GlanceSection } from '../components/GlanceSection';
import { TreeView } from '../components/TreeView';
import { BulletRow } from '../components/BulletRow';
import { DetailHeader } from '../components/DetailHeader';
import { EcoBadge, GlassCard, PillChip, SectionCard, SectionTitle } from '../components/UIPrimitives';
import type { IdeaIconKind } from '../components/IdeaIcons';
import { useSwipeBack } from '../hooks/useSwipeBack';

const PRINCIPLE_ICON_MAP: Record<string, IdeaIconKind> = {
  center: 'center',
  development: 'development',
  kingSafety: 'kingSafety',
  pawnStructure: 'pawnStructure',
  spaceTempo: 'spaceTempo',
  planning: 'planning',
};

export default function MoveDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { colors, spacing, typography, isDark } = useTheme();
  const [goDeeperOpen, setGoDeeperOpen] = useState(false);
  const swipeRef = useSwipeBack<HTMLDivElement>();

  const node = id ? nodesById[id] : undefined;
  const catalogEntry = id ? catalogByNodeId.get(id) : undefined;

  if (!node) {
    return (
      <div ref={swipeRef}>
        <DetailHeader />
        <div style={{ padding: 40, textAlign: 'center', color: colors.textMuted }}>
          <p>Opening not found</p>
        </div>
      </div>
    );
  }

  const styleList = catalogEntry?.style ?? [];
  const eco = catalogEntry?.eco ?? '';
  const whyThis = node.whyThisMove ?? catalogEntry?.description ?? node.intent?.[0] ?? '';
  const themes = node.strategicThemes?.length
    ? node.strategicThemes
    : (catalogEntry?.keyIdeas ?? []);

  const pageStyle: CSSProperties = {
    backgroundColor: 'transparent',
    paddingBottom: 80,
    minHeight: '100dvh',
  };

  const heroStyle: CSSProperties = {
    padding: `${spacing.md}px ${spacing.lg}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  };

  const moveRowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flexWrap: 'wrap' as const,
  };

  const moveBoxStyle: CSSProperties = {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: `${spacing.sm}px ${spacing.md}px`,
    fontSize: typography.titleLG.fontSize,
    fontWeight: '800',
    color: '#fff',
    fontFamily: 'monospace',
  };

  const nameStyle: CSSProperties = {
    fontSize: typography.titleLG.fontSize,
    fontWeight: typography.titleLG.fontWeight,
    color: colors.text,
    flex: 1,
  };

  const tagsRowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap' as const,
    gap: spacing.xs,
  };

  const sectionGap: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
    padding: `0 ${spacing.lg}px`,
  };

  const goDeeperHeaderStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${spacing.md}px ${spacing.lg}px`,
    cursor: 'pointer',
    borderRadius: 14,
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.card,
    marginLeft: spacing.lg,
    marginRight: spacing.lg,
  };

  return (
    <div ref={swipeRef} style={pageStyle}>
      <DetailHeader title={node.name} />

      {/* Hero */}
      <div style={heroStyle}>
        <div style={moveRowStyle}>
          <span style={moveBoxStyle}>{node.move}</span>
          <span style={nameStyle}>{node.name}</span>
          {eco && <EcoBadge code={eco} />}
        </div>

        {styleList.length > 0 && (
          <div style={tagsRowStyle}>
            {styleList.map((s) => {
              const sc = openingStyleColors[s];
              return (
                <PillChip
                  key={s}
                  label={s}
                  backgroundColor={isDark ? sc.darkBg : sc.bg}
                  textColor={isDark ? sc.darkText : sc.text}
                />
              );
            })}
          </div>
        )}

        {/* Board */}
        <AnimatedChessBoard
          pgn={node.boardPgn}
          responses={node.responses}
          onResponsePress={(respId) => navigate(`/move/${respId}`)}
        />

        {/* Intent */}
        {node.intent && node.intent.length > 0 && (
          <div>
            {node.intent.map((line, i) => (
              <BulletRow key={i} text={line} kind="idea" />
            ))}
          </div>
        )}
      </div>

      {/* Sections */}
      <div style={sectionGap}>

        {/* Principle Applications */}
        {node.principleApplications && node.principleApplications.length > 0 && (
          <SectionCard accentColor={colors.purple}>
            <SectionTitle>Principle Applications</SectionTitle>
            {node.principleApplications.map((pa, i) => {
              const principle = PRINCIPLES[pa.principleId];
              return (
                <div key={i} style={{ marginBottom: spacing.md }}>
                  <span style={{ fontSize: typography.label.fontSize, fontWeight: '600', color: colors.purple }}>
                    {principle?.name ?? pa.principleId}
                  </span>
                  <BulletRow text={pa.explanation} kind={PRINCIPLE_ICON_MAP[pa.principleId] ?? 'idea'} />
                </div>
              );
            })}
          </SectionCard>
        )}

        {/* Why Play This */}
        {whyThis && (
          <SectionCard accentColor={colors.teal}>
            <SectionTitle>Why Play This?</SectionTitle>
            <p style={{ fontSize: typography.bodyMD.fontSize, lineHeight: `${typography.bodyMD.lineHeight}px`, color: colors.textSecondary, margin: 0 }}>
              {whyThis}
            </p>
          </SectionCard>
        )}

        {/* Strategic Themes */}
        {themes.length > 0 && (
          <SectionCard accentColor={colors.accent}>
            <SectionTitle>Strategic Themes</SectionTitle>
            {themes.map((t, i) => <BulletRow key={i} text={t} kind="idea" />)}
          </SectionCard>
        )}

        {/* At a Glance */}
        {(node.prosAndCons || node.threats?.length || node.traps?.length) && (
          <GlanceSection
            pros={node.prosAndCons?.pros}
            cons={node.prosAndCons?.cons}
            threats={node.threats}
            traps={node.traps}
          />
        )}

        {/* Go Deeper */}
        {(node.lines?.length || node.famousGames?.length || node.tree?.length) && (
          <div>
            <div style={goDeeperHeaderStyle} onClick={() => setGoDeeperOpen(!goDeeperOpen)}>
              <span style={{ fontSize: typography.titleSM.fontSize, fontWeight: '600', color: colors.text }}>
                Go Deeper
              </span>
              <span style={{ fontSize: 18, color: colors.textMuted, transform: goDeeperOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
            </div>

            {goDeeperOpen && (
              <div style={{ padding: `${spacing.lg}px ${spacing.lg}px 0`, display: 'flex', flexDirection: 'column', gap: spacing.lg }}>

                {/* Example Lines */}
                {node.lines && node.lines.slice(0, 2).map((line, i) => (
                  <GlassCard key={i} style={{ padding: spacing.md }}>
                    <p style={{ fontSize: typography.label.fontSize, fontWeight: '600', color: colors.textSecondary, marginBottom: spacing.sm }}>
                      {line.label}
                    </p>
                    <AnimatedChessBoard pgn={line.pgn} arrows={line.arrows} compact />
                  </GlassCard>
                ))}

                {/* Famous Players & Games */}
                {(node.famousPlayers?.length || node.famousGames?.length) && (
                  <SectionCard accentColor={colors.orange}>
                    <SectionTitle>Hall of Fame</SectionTitle>
                    {node.famousPlayers && (
                      <p style={{ fontSize: typography.bodyMD.fontSize, color: colors.textSecondary, marginBottom: spacing.md }}>
                        {node.famousPlayers.join(' · ')}
                      </p>
                    )}
                    {node.famousGames?.map((g, i) => (
                      <div key={i} style={{ marginBottom: spacing.sm }}>
                        <span style={{ fontSize: typography.label.fontSize, fontWeight: '600', color: colors.orange }}>
                          {g.players}
                        </span>
                        <p style={{ fontSize: typography.bodySM.fontSize, color: colors.textSecondary, margin: 0 }}>{g.description}</p>
                      </div>
                    ))}
                  </SectionCard>
                )}

                {/* Move Tree */}
                {node.tree && node.tree.length > 0 && (
                  <SectionCard accentColor={colors.textMuted}>
                    <SectionTitle>Move Tree</SectionTitle>
                    <TreeView nodes={node.tree} />
                  </SectionCard>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import type { CSSProperties } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import { nodesById } from '../data/openings';
import { openingStyleColors } from '../theme/openingStyles';
import { EcoBadge, PillChip, SectionCard, SectionTitle } from '../components/UIPrimitives';
import { BulletRow } from '../components/BulletRow';
import { DetailHeader } from '../components/DetailHeader';
import { useSwipeBack } from '../hooks/useSwipeBack';
import type { OpeningStyle } from '../data/catalog';

interface OpeningDetailState {
  name: string;
  pgn: string;
  eco: string;
  style: OpeningStyle[];
  keyIdeas: string[];
  description: string;
  nodeId?: string;
}

export default function OpeningDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { colors, spacing, typography, elevation, isDark } = useTheme();
  const swipeRef = useSwipeBack<HTMLDivElement>();

  const state = location.state as OpeningDetailState | null;

  if (!state) {
    return (
      <div ref={swipeRef}>
        <DetailHeader />
        <div style={{ padding: 40, textAlign: 'center', color: colors.textMuted }}>
          <p>No opening data provided.</p>
        </div>
      </div>
    );
  }

  const { name, pgn, eco, style: styleList = [], keyIdeas = [], description, nodeId } = state;

  const pageStyle: CSSProperties = {
    backgroundColor: 'transparent',
    paddingBottom: 80,
    minHeight: '100dvh',
  };

  const heroStyle: CSSProperties = {
    padding: `${spacing.lg}px ${spacing.lg}px ${spacing.md}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  };

  const nameStyle: CSSProperties = {
    fontSize: typography.titleLG.fontSize,
    fontWeight: typography.titleLG.fontWeight,
    color: colors.text,
  };

  const pgnStyle: CSSProperties = {
    alignSelf: 'flex-start',
    fontSize: typography.bodySM.fontSize,
    fontFamily: 'monospace',
    color: colors.textSecondary,
    backgroundColor: colors.chipBg,
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    padding: `${spacing.xs}px ${spacing.sm}px`,
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

  return (
    <div ref={swipeRef} style={pageStyle}>
      <DetailHeader title={name} />

      <div style={heroStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap' as const }}>
          <span style={nameStyle}>{name}</span>
          {eco && <EcoBadge code={eco} />}
        </div>
        <span style={pgnStyle}>{pgn}</span>
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
      </div>

      <div style={sectionGap}>
        {description && (
          <SectionCard accentColor={colors.teal}>
            <SectionTitle>About This Opening</SectionTitle>
            <p style={{ fontSize: typography.bodyMD.fontSize, lineHeight: `${typography.bodyMD.lineHeight}px`, color: colors.textSecondary, margin: 0 }}>
              {description}
            </p>
          </SectionCard>
        )}

        {keyIdeas.length > 0 && (
          <SectionCard accentColor={colors.accent}>
            <SectionTitle>Key Ideas</SectionTitle>
            {keyIdeas.map((idea, i) => <BulletRow key={i} text={idea} kind="idea" />)}
          </SectionCard>
        )}

        {nodeId && nodesById[nodeId] && (
          <button
            style={{
              width: '100%',
              padding: `${spacing.md}px ${spacing.xl}px`,
              borderRadius: 14,
              border: `1px solid ${colors.accent}`,
              backgroundColor: colors.accentBg,
              color: colors.accent,
              fontSize: typography.bodyMD.fontSize,
              fontWeight: '700',
              cursor: 'pointer',
              ...elevation.sm,
            }}
            onClick={() => navigate(`/move/${nodeId}`)}
          >
            Explore move-by-move →
          </button>
        )}
      </div>
    </div>
  );
}

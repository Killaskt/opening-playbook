import { useState, useMemo } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import { nodesById } from '../data/openings';
import { ScreenHeader } from '../components/ScreenHeader';
import { SearchBar } from '../components/SearchBar';
import { SponsoredCard } from '../components/SponsoredCard';
import { useTabSwipe } from '../hooks/useTabSwipe';
import type { OpeningNode } from '../types';

const START_MOVE_IDS = ['e4', 'd4', 'c4', 'nf3', 'b3'];

function matchesSearch(node: OpeningNode, terms: string[]): boolean {
  if (terms.length === 0) return true;
  const fields = [
    node.move,
    node.name,
    ...(node.intent ?? []),
    node.whyThisMove ?? '',
  ]
    .join(' ')
    .toLowerCase();
  return terms.every((t) => fields.includes(t));
}

export default function MovesPage() {
  const { colors, spacing, typography } = useTheme();
  const navigate = useNavigate();
  const swipeRef = useTabSwipe<HTMLDivElement>();
  const [query, setQuery] = useState('');

  const terms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const moves = useMemo(() => {
    const all = Object.values(nodesById);
    if (terms.length === 0) {
      return START_MOVE_IDS.map((id) => nodesById[id]).filter(Boolean);
    }
    return all.filter((n) => matchesSearch(n, terms));
  }, [query]);

  const pageStyle: CSSProperties = {
    backgroundColor: 'transparent',
    minHeight: '100dvh',
  };

  const listStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    padding: `0 ${spacing.lg}px`,
  };

  return (
    <div ref={swipeRef} style={pageStyle}>
      <ScreenHeader title="Opening Playbook" subtitle="Choose your first move" />
      <SearchBar value={query} onChangeText={setQuery} placeholder="Search openings…" />

      <div style={listStyle}>
        {moves.map((node) => (
          <MoveCard key={node.id} node={node} onPress={() => navigate(`/move/${node.id}`)} />
        ))}
        {/* In-feed ad slot after all the moves, styled to match the cards. */}
        {moves.length > 0 && <SponsoredCard variant="move" />}
        {moves.length === 0 && (
          <p style={{ color: colors.textMuted, textAlign: 'center', marginTop: spacing.xxl, fontSize: typography.bodyMD.fontSize }}>
            No results for "{query}"
          </p>
        )}
      </div>
    </div>
  );
}

function MoveCard({ node, onPress }: { node: OpeningNode; onPress: () => void }) {
  const { colors, spacing, typography } = useTheme();

  const cardStyle: CSSProperties = {
    borderRadius: 20,
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.cardGlass,
    backdropFilter: 'blur(20px) saturate(1.4)',
    WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
    boxShadow: `inset 0 1px 0 ${colors.glassSpecularLight}, 0 2px 8px rgba(0,0,0,0.07)`,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'opacity 0.15s ease',
  };

  const innerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
  };

  const moveBoxStyle: CSSProperties = {
    width: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderRight: '1px solid rgba(255,255,255,0.25)',
    flexShrink: 0,
  };

  const moveTextStyle: CSSProperties = {
    fontSize: typography.titleLG.fontSize,
    fontWeight: '800',
    color: '#fff',
    fontFamily: 'monospace',
  };

  const contentStyle: CSSProperties = {
    flex: 1,
    padding: `${spacing.md}px ${spacing.lg}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  };

  const nameStyle: CSSProperties = {
    fontSize: typography.titleSM.fontSize,
    fontWeight: typography.titleSM.fontWeight,
    color: colors.text,
  };

  const intentStyle: CSSProperties = {
    fontSize: typography.bodySM.fontSize,
    color: colors.textSecondary,
    lineHeight: `${typography.bodySM.lineHeight}px`,
  };

  const responsesRowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  };

  return (
    <div style={cardStyle} onClick={onPress}>
      <div style={innerStyle}>
        <div style={moveBoxStyle}>
          <span style={moveTextStyle}>{node.move.replace(/^\d+\.\s*/, '')}</span>
        </div>
        <div style={contentStyle}>
          <span style={nameStyle}>{node.name}</span>
          {node.intent?.[0] && <span style={intentStyle}>{node.intent[0]}</span>}
          {node.responses && node.responses.length > 0 && (
            <div style={responsesRowStyle}>
              {node.responses.slice(0, 5).map((r) => (
                <span
                  key={r.id}
                  style={{
                    fontSize: typography.labelSM.fontSize,
                    backgroundColor: colors.chipBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 10,
                    padding: `2px 8px`,
                    color: colors.textSecondary,
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Use navigate from outer scope is not available here;
                    // clicking on the pill just navigates to the same as card for now
                  }}
                >
                  {r.move}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

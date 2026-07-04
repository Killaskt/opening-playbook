import { useState, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import { openingsCatalog } from '../data/catalog';
import { ScreenHeader } from '../components/ScreenHeader';
import { SearchBar } from '../components/SearchBar';
import { SectionJumper } from '../components/SectionJumper';
import { useTabSwipe } from '../hooks/useTabSwipe';
import { EcoBadge, PillChip } from '../components/UIPrimitives';
import { openingStyleColors, openingTypeColors } from '../theme/openingStyles';
import type { CatalogEntry, OpeningType } from '../data/catalog';

const CATEGORIES = ['e4', 'd4', 'c4', 'nf3', 'other'] as const;
const TYPE_FILTERS: { key: OpeningType; label: string }[] = [
  { key: 'opening', label: 'Opening' },
  { key: 'defense', label: 'Defense' },
  { key: 'system', label: 'System' },
  { key: 'gambit', label: 'Gambit' },
];

function matchesSearch(entry: CatalogEntry, terms: string[]): boolean {
  if (terms.length === 0) return true;
  const fields = [
    entry.name,
    entry.description,
    entry.pgn,
    entry.eco,
    entry.type,
    ...(entry.style ?? []),
    ...(entry.keyIdeas ?? []),
  ]
    .join(' ')
    .toLowerCase();
  return terms.every((t) => fields.includes(t));
}

type CategoryKey = (typeof CATEGORIES)[number];

export default function LibraryPage() {
  const { colors, spacing, typography } = useTheme();
  const navigate = useNavigate();
  const swipeRef = useTabSwipe<HTMLDivElement>();

  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<OpeningType | null>(null);

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  const sections = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const entries = openingsCatalog.filter(
        (e) =>
          e.category === cat &&
          (typeFilter === null || e.type === typeFilter) &&
          matchesSearch(e, terms),
      );
      return { category: cat, entries };
    }).filter((s) => s.entries.length > 0);
  }, [query, typeFilter]);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [sectionIdx, setSectionIdx] = useState(0);

  const scrollToSection = (idx: number) => {
    const el = sectionRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSectionIdx(idx);
    }
  };

  const pagePad: CSSProperties = {
    backgroundColor: 'transparent',
    paddingBottom: 100,
    minHeight: '100dvh',
  };

  const filterRowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing.sm,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingBottom: spacing.md,
    overflowX: 'auto',
    scrollbarWidth: 'none',
  };

  const categoryLabelStyle: CSSProperties = {
    fontSize: typography.titleSM.fontSize,
    fontWeight: typography.titleSM.fontWeight,
    color: colors.text,
    padding: `${spacing.md}px ${spacing.lg}px ${spacing.sm}px`,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
    borderBottom: `1px solid ${colors.borderLight}`,
    marginBottom: spacing.sm,
  };

  const entriesListStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    padding: `0 ${spacing.lg}px`,
  };

  const catLabels: Record<CategoryKey, string> = {
    e4: '1. e4 — King\'s Pawn',
    d4: '1. d4 — Queen\'s Pawn',
    c4: '1. c4 — English',
    nf3: '1. Nf3 — Réti',
    other: 'Other Systems',
  };

  return (
    <div ref={swipeRef} style={pagePad}>
      <ScreenHeader title="Library" subtitle="Opening encyclopedia" />
      <SearchBar value={query} onChangeText={setQuery} placeholder="Search openings, ECO codes…" />

      <div style={filterRowStyle}>
        <button
          style={filterBtnStyle(typeFilter === null, colors)}
          onClick={() => setTypeFilter(null)}
        >
          All
        </button>
        {TYPE_FILTERS.map((f) => (
          <button
            key={f.key}
            style={filterBtnStyle(typeFilter === f.key, colors)}
            onClick={() => setTypeFilter(typeFilter === f.key ? null : f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {sections.map(({ category, entries }, idx) => (
        <div key={category} ref={(el) => { sectionRefs.current[idx] = el; }}>
          <div style={categoryLabelStyle}>{catLabels[category as CategoryKey]}</div>
          <div style={entriesListStyle}>
            {entries.map((entry) => (
              <EntryCard
                key={entry.name + entry.pgn}
                entry={entry}
                onPress={() => {
                  if (entry.nodeId) {
                    navigate(`/move/${entry.nodeId}`);
                  } else {
                    navigate('/opening-detail', {
                      state: {
                        name: entry.name,
                        pgn: entry.pgn,
                        eco: entry.eco,
                        style: entry.style,
                        keyIdeas: entry.keyIdeas,
                        description: entry.description,
                        nodeId: entry.nodeId,
                      },
                    });
                  }
                }}
              />
            ))}
          </div>
        </div>
      ))}

      {sections.length === 0 && (
        <p style={{ color: colors.textMuted, textAlign: 'center', marginTop: 40, fontSize: typography.bodyMD.fontSize }}>
          No results
        </p>
      )}

      <SectionJumper
        onPrev={() => scrollToSection(Math.max(0, sectionIdx - 1))}
        onNext={() => scrollToSection(Math.min(sections.length - 1, sectionIdx + 1))}
        canGoUp={sectionIdx > 0}
        canGoDown={sectionIdx < sections.length - 1}
      />
    </div>
  );
}

function filterBtnStyle(active: boolean, colors: { accent: string; border: string; accentBg: string; chipBg: string; textSecondary: string }): CSSProperties {
  return {
    flexShrink: 0,
    padding: '6px 14px',
    borderRadius: 20,
    border: active ? `1px solid ${colors.accent}` : `1px solid ${colors.border}`,
    backgroundColor: active ? colors.accentBg : colors.chipBg,
    color: active ? colors.accent : colors.textSecondary,
    fontSize: 13,
    fontWeight: active ? '600' : '400',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    transition: 'all 0.15s ease',
  };
}

function EntryCard({ entry, onPress }: { entry: CatalogEntry; onPress: () => void }) {
  const { colors, spacing, typography } = useTheme();

  const cardStyle: CSSProperties = {
    borderRadius: 14,
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.card,
    padding: `${spacing.md}px ${spacing.lg}px`,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
    marginBottom: spacing.sm,
    transition: 'opacity 0.15s ease',
  };

  const topRowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  };

  const nameStyle: CSSProperties = {
    fontSize: typography.titleSM.fontSize,
    fontWeight: typography.titleSM.fontWeight,
    color: colors.text,
    flex: 1,
  };

  const pgnStyle: CSSProperties = {
    fontSize: typography.labelSM.fontSize,
    color: colors.textMuted,
    fontFamily: 'monospace',
  };

  const descStyle: CSSProperties = {
    fontSize: typography.bodySM.fontSize,
    color: colors.textSecondary,
    lineHeight: `${typography.bodySM.lineHeight}px`,
  };

  const tagsRowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  };

  const typeColors = openingTypeColors[entry.type];

  return (
    <div style={cardStyle} onClick={onPress}>
      <div style={topRowStyle}>
        <span style={nameStyle}>{entry.name}</span>
        {entry.eco && <EcoBadge code={entry.eco} />}
      </div>
      <span style={pgnStyle}>{entry.pgn}</span>
      <span style={descStyle}>{entry.description}</span>
      <div style={tagsRowStyle}>
        <PillChip
          label={entry.type}
          backgroundColor={typeColors.light}
          textColor={colors.text}
        />
        {(entry.style ?? []).slice(0, 3).map((s) => {
          const sc = openingStyleColors[s];
          return (
            <PillChip
              key={s}
              label={s}
              backgroundColor={sc.bg}
              textColor={sc.text}
            />
          );
        })}
      </div>
      {entry.nodeId && (
        <span style={{ fontSize: typography.labelSM.fontSize, color: colors.accent, marginTop: 2 }}>
          Explore move-by-move →
        </span>
      )}
    </div>
  );
}

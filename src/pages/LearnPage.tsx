import { useState, useRef } from 'react';
import type { CSSProperties } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { fundamentals } from '../data/fundamentals';
import { ScreenHeader } from '../components/ScreenHeader';
import { BulletRow } from '../components/BulletRow';
import { AnimatedChessBoard } from '../components/AnimatedChessBoard';
import type { FundamentalSection } from '../data/fundamentals';

export default function LearnPage() {
  const { spacing } = useTheme();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggle = (id: string) => {
    const next = expandedId === id ? null : id;
    setExpandedId(next);
    if (next) {
      setTimeout(() => {
        cardRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  };

  const pageStyle: CSSProperties = {
    backgroundColor: 'transparent',
    paddingBottom: 100,
    minHeight: '100dvh',
  };

  const listStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    padding: `0 ${spacing.lg}px`,
  };

  return (
    <div style={pageStyle}>
      <ScreenHeader title="Learn" subtitle="Chess fundamentals" />
      <div style={listStyle}>
        {fundamentals.map((section) => (
          <LearnCard
            key={section.id}
            section={section}
            expanded={expandedId === section.id}
            onToggle={() => toggle(section.id)}
            ref={(el) => { cardRefs.current[section.id] = el; }}
          />
        ))}
      </div>
    </div>
  );
}

import { forwardRef } from 'react';

const LearnCard = forwardRef<HTMLDivElement, {
  section: FundamentalSection;
  expanded: boolean;
  onToggle: () => void;
}>(function LearnCard({ section, expanded, onToggle }, ref) {
  const { colors, spacing, typography } = useTheme();

  const cardStyle: CSSProperties = {
    borderRadius: 16,
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.card,
    overflow: 'hidden',
    cursor: 'pointer',
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.lg}px`,
  };

  const titleBlockStyle: CSSProperties = {
    flex: 1,
  };

  const titleStyle: CSSProperties = {
    fontSize: typography.titleSM.fontSize,
    fontWeight: typography.titleSM.fontWeight,
    color: colors.text,
    marginBottom: 4,
  };

  const subtitleStyle: CSSProperties = {
    fontSize: typography.bodySM.fontSize,
    color: colors.textSecondary,
    lineHeight: `${typography.bodySM.lineHeight}px`,
  };

  const chevronStyle: CSSProperties = {
    fontSize: 18,
    color: colors.textMuted,
    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
    marginLeft: spacing.md,
    userSelect: 'none',
  };

  const bodyStyle: CSSProperties = {
    padding: `0 ${spacing.lg}px ${spacing.lg}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    borderTop: `1px solid ${colors.borderLight}`,
  };

  const textStyle: CSSProperties = {
    fontSize: typography.bodyMD.fontSize,
    lineHeight: `${typography.bodyMD.lineHeight}px`,
    color: colors.textSecondary,
    marginTop: spacing.md,
  };

  const subheadStyle: CSSProperties = {
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
    color: colors.textMuted,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
  };

  return (
    <div style={cardStyle} ref={ref}>
      <div style={headerStyle} onClick={onToggle}>
        <div style={titleBlockStyle}>
          <div style={titleStyle}>{section.title}</div>
          <div style={subtitleStyle}>{section.subtitle}</div>
        </div>
        <span style={chevronStyle}>▾</span>
      </div>

      {expanded && (
        <div style={bodyStyle}>
          <p style={textStyle}>{section.content}</p>

          {section.keyPoints && section.keyPoints.length > 0 && (
            <div>
              <div style={subheadStyle}>Key Points</div>
              {section.keyPoints.map((kp, i) => (
                <BulletRow key={i} text={kp} kind="idea" />
              ))}
            </div>
          )}

          {section.mistakes && section.mistakes.length > 0 && (
            <div>
              <div style={subheadStyle}>Common Mistakes</div>
              {section.mistakes.map((m, i) => (
                <BulletRow key={i} text={m} kind="warning" />
              ))}
            </div>
          )}

          {section.example && (
            <div>
              <div style={subheadStyle}>Example</div>
              <AnimatedChessBoard
                pgn={section.example.pgn}
                label={section.example.label}
                compact
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
});

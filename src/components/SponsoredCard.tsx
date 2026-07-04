import type { CSSProperties } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { ADS_ENABLED } from '../lib/ads';

type Variant = 'library' | 'move';

interface SponsoredCardProps {
  variant: Variant;
}

/**
 * An in-feed ad slot styled to match the app's cards so it reads as part of the
 * list. Rendered inline in the Library scroll and at the bottom of the Moves
 * list. Returns null while ads are disabled (see ADS_ENABLED).
 *
 * NOTE: the fields below are placeholders. Google AdMob's Capacitor plugin only
 * supports banner/interstitial/rewarded ads — not native (custom-rendered) ads —
 * so these slots cannot be filled with real Google ads without a native-ad
 * plugin. See docs/ADS_ADMOB.md.
 */
const PLACEHOLDER = {
  headline: 'Your ad here',
  body: 'Sponsored placements blend into the feed and match the app’s cards.',
  cta: 'Learn more',
  glyph: '★',
};

export function SponsoredCard({ variant }: SponsoredCardProps) {
  const { colors, spacing, typography } = useTheme();
  if (!ADS_ENABLED) return null;

  const sponsoredTag: CSSProperties = {
    fontSize: typography.labelSM.fontSize,
    fontWeight: typography.labelSM.fontWeight,
    color: colors.textMuted,
    backgroundColor: colors.chipBg,
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    padding: '1px 6px',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    flexShrink: 0,
  };

  const headlineStyle: CSSProperties = {
    fontSize: typography.titleSM.fontSize,
    fontWeight: typography.titleSM.fontWeight,
    color: colors.text,
    flex: 1,
  };

  const bodyStyle: CSSProperties = {
    fontSize: typography.bodySM.fontSize,
    color: colors.textSecondary,
    lineHeight: `${typography.bodySM.lineHeight}px`,
  };

  const ctaStyle: CSSProperties = {
    fontSize: typography.labelSM.fontSize,
    fontWeight: '600',
    color: colors.accent,
    marginTop: 2,
  };

  if (variant === 'move') {
    // Mirror MoveCard: rounded row with an accent box on the left.
    return (
      <div
        style={{
          borderRadius: 16,
          border: `1px solid ${colors.glassBorder}`,
          backgroundColor: colors.card,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            width: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.accent,
            flexShrink: 0,
            fontSize: typography.titleLG.fontSize,
            color: '#fff',
          }}
        >
          {PLACEHOLDER.glyph}
        </div>
        <div
          style={{
            flex: 1,
            padding: `${spacing.md}px ${spacing.lg}px`,
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.xs,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
            <span style={headlineStyle}>{PLACEHOLDER.headline}</span>
            <span style={sponsoredTag}>Sponsored</span>
          </div>
          <span style={bodyStyle}>{PLACEHOLDER.body}</span>
          <span style={ctaStyle}>{PLACEHOLDER.cta} →</span>
        </div>
      </div>
    );
  }

  // Library variant — mirror EntryCard: a column card.
  return (
    <div
      style={{
        borderRadius: 14,
        border: `1px solid ${colors.glassBorder}`,
        backgroundColor: colors.card,
        padding: `${spacing.md}px ${spacing.lg}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.xs,
        marginBottom: spacing.sm,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm }}>
        <span style={headlineStyle}>{PLACEHOLDER.headline}</span>
        <span style={sponsoredTag}>Sponsored</span>
      </div>
      <span style={bodyStyle}>{PLACEHOLDER.body}</span>
      <span style={ctaStyle}>{PLACEHOLDER.cta} →</span>
    </div>
  );
}

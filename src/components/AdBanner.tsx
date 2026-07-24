import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { showBanner, hideBanner, AD_BANNER_HEIGHT } from '../lib/ads';

export { AD_BANNER_HEIGHT };

// ─── Native AdMob banner driver ──────────────────────────────────────────────
// Renders nothing in the DOM — the banner is a native overlay managed by the
// AdMob plugin. No-op on web or when ADS_ENABLED is false in ../lib/ads.
export function AdBanner() {
  useEffect(() => {
    void showBanner();
    return () => { void hideBanner(); };
  }, []);
  return null;
}

// ─── Inline ad frequency ─────────────────────────────────────────────────────
export const AD_FREQUENCY_MOVES = 5;
export const AD_FREQUENCY_LIBRARY = 7;

export function shouldShowAd(index: number, frequency: number): boolean {
  return index > 0 && index % frequency === 0;
}

// ─── House ad content ─────────────────────────────────────────────────────────
export interface HouseAd {
  icon: string;
  headline: string;
  tagline: string;
  cta: string;
}

const HOUSE_ADS: HouseAd[] = [
  {
    icon: '♟',
    headline: 'Master Your Openings',
    tagline: 'Premium unlocks spaced repetition drill mode + 500+ variations',
    cta: 'Try Premium',
  },
  {
    icon: '♜',
    headline: 'Play Live Chess',
    tagline: 'Test your opening prep against real opponents',
    cta: 'Play Now',
  },
  {
    icon: '♛',
    headline: 'Opening Trainer',
    tagline: "Drill your favorite lines until they're muscle memory",
    cta: 'Start Training',
  },
];

// ─── Inline AdCard ────────────────────────────────────────────────────────────
// Always visible house-ad card styled to match the surrounding content cards.
// Swap HOUSE_ADS content for real ad data when integrating a native-ad provider.
export interface AdCardProps {
  ad?: HouseAd;
  adIndex?: number;
  onPress?: () => void;
}

export function AdCard({ ad, adIndex, onPress }: AdCardProps) {
  const { colors, spacing, typography } = useTheme();

  const houseAd: HouseAd = ad ?? HOUSE_ADS[(adIndex ?? 0) % HOUSE_ADS.length];

  const cardStyle: CSSProperties = {
    borderRadius: 16,
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: colors.cardGlass,
    backdropFilter: 'blur(16px) saturate(1.4)',
    WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
    boxShadow: `inset 0 1px 0 ${colors.glassSpecularLight}, 0 2px 8px rgba(0,0,0,0.06)`,
    padding: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  };

  const topRowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  };

  const iconStyle: CSSProperties = {
    fontSize: 28,
    lineHeight: '32px',
    color: colors.accent,
    flexShrink: 0,
  };

  const headlineStyle: CSSProperties = {
    fontSize: typography.titleSM.fontSize,
    fontWeight: 700,
    color: colors.text,
    flex: 1,
    marginLeft: spacing.sm,
  };

  const sponsoredBadgeStyle: CSSProperties = {
    fontSize: 10,
    fontStyle: 'italic',
    color: colors.textMuted,
    letterSpacing: 0.3,
    flexShrink: 0,
    alignSelf: 'flex-start',
    marginTop: 2,
  };

  const taglineStyle: CSSProperties = {
    fontSize: typography.bodySM.fontSize,
    color: colors.textSecondary,
    lineHeight: '1.4em',
  };

  const ctaStyle: CSSProperties = {
    alignSelf: 'flex-start',
    borderRadius: 20,
    padding: '6px 16px',
    backgroundColor: colors.accentBg,
    border: `1px solid ${colors.accent}40`,
    color: colors.accent,
    fontSize: typography.label.fontSize,
    fontWeight: 600,
    cursor: onPress ? 'pointer' : 'default',
  };

  return (
    <div style={cardStyle}>
      <div style={topRowStyle}>
        <span style={iconStyle}>{houseAd.icon}</span>
        <span style={headlineStyle}>{houseAd.headline}</span>
        <span style={sponsoredBadgeStyle}>Sponsored</span>
      </div>
      <span style={taglineStyle}>{houseAd.tagline}</span>
      <button style={ctaStyle} onClick={onPress}>{houseAd.cta}</button>
    </div>
  );
}

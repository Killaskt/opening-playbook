import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTheme } from './theme/ThemeContext';
import { LiquidTabBar } from './components/LiquidTabBar';
import { AdBanner } from './components/AdBanner';
import { showInterstitial } from './lib/ads';
import MovesPage from './pages/MovesPage';
import LibraryPage from './pages/LibraryPage';
import LearnPage from './pages/LearnPage';
import MoveDetailPage from './pages/MoveDetailPage';
import OpeningDetailPage from './pages/OpeningDetailPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const { colors } = useTheme();
  const location = useLocation();

  const TAB_PATHS = ['/', '/library', '/learn'];
  const showTabBar = TAB_PATHS.includes(location.pathname);

  // Show an interstitial every 5th detail-page open (a move OR an opening),
  // counted across the whole session. Lives app-wide so every kind of detail
  // page counts, not just one route. No-ops on web / when ads are disabled.
  useEffect(() => {
    const path = location.pathname;
    const isDetailPage = path.startsWith('/move/') || path === '/opening-detail';
    if (!isDetailPage) return;
    const count = (parseInt(sessionStorage.getItem('AD_VIEW_COUNT') ?? '0', 10) || 0) + 1;
    sessionStorage.setItem('AD_VIEW_COUNT', String(count));
    if (count % 5 === 0) void showInterstitial();
  }, [location.key]);

  const appStyle: CSSProperties = {
    minHeight: '100dvh',
    backgroundColor: colors.bg,
    color: colors.text,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    paddingBottom: showTabBar ? 'max(calc(env(safe-area-inset-bottom, 0px) + 96px), 104px)' : 0,
  };

  // Empty — bottom padding is handled via appStyle above
  const tabPageStyle: CSSProperties = {};

  return (
    <div style={appStyle}>
      <Routes>
        <Route path="/" element={<div style={tabPageStyle}><MovesPage /></div>} />
        <Route path="/library" element={<div style={tabPageStyle}><LibraryPage /></div>} />
        <Route path="/learn" element={<div style={tabPageStyle}><LearnPage /></div>} />
        <Route path="/move/:id" element={<MoveDetailPage />} />
        <Route path="/opening-detail" element={<OpeningDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      {showTabBar && <LiquidTabBar />}
      <AdBanner />
    </div>
  );
}

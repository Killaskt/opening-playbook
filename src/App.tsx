import type { CSSProperties } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTheme } from './theme/ThemeContext';
import { LiquidTabBar } from './components/LiquidTabBar';
import MovesPage from './pages/MovesPage';
import LibraryPage from './pages/LibraryPage';
import LearnPage from './pages/LearnPage';
import MoveDetailPage from './pages/MoveDetailPage';
import OpeningDetailPage from './pages/OpeningDetailPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const { colors } = useTheme();
  const location = useLocation();

  const appStyle: CSSProperties = {
    minHeight: '100dvh',
    backgroundColor: colors.bg,
    color: colors.text,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased',
  };

  const TAB_PATHS = ['/', '/library', '/learn'];
  const showTabBar = TAB_PATHS.includes(location.pathname);

  return (
    <div style={appStyle}>
      <Routes>
        <Route path="/" element={<MovesPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/move/:id" element={<MoveDetailPage />} />
        <Route path="/opening-detail" element={<OpeningDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      {showTabBar && <LiquidTabBar />}
    </div>
  );
}

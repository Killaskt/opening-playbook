import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeColors, lightColors, darkColors } from './colors';
import { spacing, SpacingScale } from './spacing';
import { typography, TypographyScale } from './typography';
import { elevation, ElevationScale } from './elevation';

export type ThemeMode = 'system' | 'light' | 'dark';

interface ThemeContextValue {
  colors: ThemeColors;
  spacing: SpacingScale;
  typography: TypographyScale;
  elevation: ElevationScale;
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
  cycleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: lightColors,
  spacing,
  typography,
  elevation,
  mode: 'system',
  isDark: false,
  setMode: () => {},
  cycleMode: () => {},
});

const MODE_CYCLE: ThemeMode[] = ['system', 'light', 'dark'];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');

  const isDark = mode === 'dark' || (mode === 'system' && systemScheme === 'dark');

  const cycleMode = useCallback(() => {
    setMode((prev) => {
      const idx = MODE_CYCLE.indexOf(prev);
      return MODE_CYCLE[(idx + 1) % MODE_CYCLE.length];
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      colors: isDark ? darkColors : lightColors,
      spacing,
      typography,
      elevation,
      mode,
      isDark,
      setMode,
      cycleMode,
    }),
    [isDark, mode, cycleMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

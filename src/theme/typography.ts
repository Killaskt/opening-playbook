export const typography = {
  titleXL: {
    fontSize: 30,
    fontWeight: '800' as const,
    lineHeight: 36,
  },
  titleLG: {
    fontSize: 22,
    fontWeight: '700' as const,
    lineHeight: 28,
  },
  titleMD: {
    fontSize: 19,
    fontWeight: '700' as const,
    lineHeight: 24,
  },
  titleSM: {
    fontSize: 17,
    fontWeight: '700' as const,
    lineHeight: 22,
  },
  bodyLG: {
    fontSize: 15,
    lineHeight: 22,
  },
  bodyMD: {
    fontSize: 14,
    lineHeight: 21,
  },
  bodySM: {
    fontSize: 13,
    lineHeight: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '600' as const,
    lineHeight: 16,
  },
  labelSM: {
    fontSize: 11,
    fontWeight: '600' as const,
    lineHeight: 14,
  },
  mono: {
    fontFamily: 'monospace' as const,
  },
} as const;

export type TypographyScale = typeof typography;

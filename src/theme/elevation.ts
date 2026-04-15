// Web elevation via CSS box-shadow strings
export const elevation = {
  none: { boxShadow: 'none' },
  sm:   { boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)' },
  md:   { boxShadow: '0 2px 6px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.05)' },
  lg:   { boxShadow: '0 4px 10px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06)' },
} as const;

export type ElevationScale = typeof elevation;

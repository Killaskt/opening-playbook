import { Platform } from 'react-native';

const ios = {
  none: {
    shadowOpacity: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
} as const;

const android = {
  none: { elevation: 0 },
  sm: { elevation: 1 },
  md: { elevation: 3 },
  lg: { elevation: 5 },
} as const;

export const elevation = Platform.OS === 'android' ? android : ios;

export type ElevationScale = typeof elevation;

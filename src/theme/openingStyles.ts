import { OpeningStyle } from '../data/catalog';

export const openingStyleColors: Record<OpeningStyle, { bg: string; darkBg: string; text: string; darkText: string }> = {
  sharp: { bg: '#fde8e8', darkBg: '#3a1a1a', text: '#c62828', darkText: '#ef5350' },
  solid: { bg: '#e3eefc', darkBg: '#1a2a3a', text: '#1565c0', darkText: '#64b5f6' },
  positional: { bg: '#e4f5e6', darkBg: '#1a2e1a', text: '#2e7d32', darkText: '#66bb6a' },
  aggressive: { bg: '#fff3e0', darkBg: '#2e1e0e', text: '#e65100', darkText: '#ff8a50' },
  flexible: { bg: '#f0e4f6', darkBg: '#2a1a30', text: '#7b1fa2', darkText: '#ba68c8' },
  gambit: { bg: '#fce4ec', darkBg: '#301020', text: '#ad1457', darkText: '#f06292' },
  hypermodern: { bg: '#dff0ee', darkBg: '#1a2e2a', text: '#00695c', darkText: '#4db6ac' },
};

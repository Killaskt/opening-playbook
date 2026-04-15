export type IdeaIconKind =
  | 'center'
  | 'development'
  | 'kingSafety'
  | 'pawnStructure'
  | 'spaceTempo'
  | 'planning'
  | 'idea'
  | 'pro'
  | 'con'
  | 'warning'
  | 'line';

export const IDEA_ICONS: Record<IdeaIconKind, string> = {
  idea: '●',
  pro: '✓',
  con: '✗',
  warning: '⚠',
  line: '→',
  center: '⊞',
  development: '▶',
  kingSafety: '♚',
  pawnStructure: '≡',
  spaceTempo: '↑',
  planning: '★',
};

import React from 'react';
import { Text } from 'react-native';

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

interface IdeaIconProps {
  kind: IdeaIconKind;
  color: string;
  size?: number;
}

export function IdeaIcon({ color, size = 15 }: IdeaIconProps) {
  return <Text style={{ color, fontSize: size }}>•</Text>;
}

import React from 'react';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

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

export function IdeaIcon({ kind, color, size = 15 }: IdeaIconProps) {
  switch (kind) {
    case 'center':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.8" />
          <Circle cx="12" cy="12" r="1.6" fill={color} />
        </Svg>
      );
    case 'development':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M6 17L17 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Path d="M10 6h7v7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case 'kingSafety':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M12 4l7 3v5c0 4-2.8 6.8-7 8-4.2-1.2-7-4-7-8V7l7-3z" stroke={color} strokeWidth="1.8" />
        </Svg>
      );
    case 'pawnStructure':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Rect x="5" y="5" width="5" height="5" stroke={color} strokeWidth="1.6" />
          <Rect x="14" y="5" width="5" height="5" stroke={color} strokeWidth="1.6" />
          <Rect x="5" y="14" width="5" height="5" stroke={color} strokeWidth="1.6" />
          <Rect x="14" y="14" width="5" height="5" stroke={color} strokeWidth="1.6" />
        </Svg>
      );
    case 'spaceTempo':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.8" />
          <Line x1="12" y1="12" x2="12" y2="8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <Line x1="12" y1="12" x2="15.5" y2="13.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </Svg>
      );
    case 'planning':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.8" />
          <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.8" />
          <Circle cx="12" cy="12" r="1.5" fill={color} />
        </Svg>
      );
    case 'pro':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.8" />
          <Path d="M8.5 12.2l2.1 2.2 4.9-4.8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case 'con':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.8" />
          <Line x1="8" y1="12" x2="16" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </Svg>
      );
    case 'warning':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M12 5l7 13H5L12 5z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
          <Line x1="12" y1="10" x2="12" y2="13.8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <Circle cx="12" cy="16.5" r="1" fill={color} />
        </Svg>
      );
    case 'line':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M9 7l6 5-6 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case 'idea':
    default:
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M12 4l1.8 4.2L18 10l-4.2 1.8L12 16l-1.8-4.2L6 10l4.2-1.8L12 4z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
        </Svg>
      );
  }
}

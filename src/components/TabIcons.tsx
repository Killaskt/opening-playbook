import type { CSSProperties } from 'react';

interface TabIconProps {
  color: string;
  size: number;
}

function iconStyle(color: string, size: number): CSSProperties {
  return { color, fontSize: size, lineHeight: 1, userSelect: 'none', display: 'inline-block' };
}

export function PawnIcon({ color, size }: TabIconProps) {
  return <span style={iconStyle(color, size)}>♟</span>;
}

export function LibraryIcon({ color, size }: TabIconProps) {
  return <span style={iconStyle(color, size)}>📚</span>;
}

export function BulbIcon({ color, size }: TabIconProps) {
  return <span style={iconStyle(color, size)}>💡</span>;
}

export function MailIcon({ color, size }: TabIconProps) {
  return <span style={iconStyle(color, size)}>✉</span>;
}

import React from 'react';
import { Text } from 'react-native';

interface TabIconProps {
  color: string;
  size: number;
}

export function PawnIcon({ color, size }: TabIconProps) {
  return <Text style={{ color, fontSize: size }}>P</Text>;
}

export function LibraryIcon({ color, size }: TabIconProps) {
  return <Text style={{ color, fontSize: size }}>L</Text>;
}

export function BulbIcon({ color, size }: TabIconProps) {
  return <Text style={{ color, fontSize: size }}>B</Text>;
}

export function MailIcon({ color, size }: TabIconProps) {
  return <Text style={{ color, fontSize: size }}>M</Text>;
}

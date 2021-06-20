import React from 'react';
import { ColorResult } from 'react-color';
import tinycolor from 'tinycolor2';
import ColorPicker from '../../ColorPicker';
import LightColorPicker from '../../LightColorPicker';
import { useLight } from '../../LightProvider';

export interface PlainComponentProps {}
export default function PlainComponent(props: PlainComponentProps) {
  return <LightColorPicker index={0} />;
}

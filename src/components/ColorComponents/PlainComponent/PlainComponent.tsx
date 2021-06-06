import React from 'react';
import { ColorResult } from 'react-color';
import tinycolor from 'tinycolor2';
import ColorPicker from '../../ColorPicker';
import { useLight } from '../../LightProvider';

export interface PlainComponentProps {}
export default function PlainComponent(props: PlainComponentProps) {
  const light = useLight();
  const [color, setColor] = React.useState<string>(light.leds.colors[0]);

  const handleComplete = (newColor: ColorResult) => {
    light.setColors([newColor.hex]);
  };
  return (
    <ColorPicker
      color={color}
      onChange={(newColor: ColorResult) => setColor(newColor.hex)}
      onTextChange={(t: string) => {
        setColor(t);
        light.setColors([tinycolor(t).toHex()]);
      }}
      onChangeComplete={handleComplete}
    />
  );
}

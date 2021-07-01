import { Theme, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import React from 'react';
import { ColorResult } from 'react-color';
import tinycolor from 'tinycolor2';
import ColorPicker from '../ColorPicker';
import { useLight } from '../LightProvider';

export interface LightColorPickerProps {
  index: 0 | 1;
  title?: string;
}

export default function LightColorPicker(props: LightColorPickerProps) {
  const { index, title } = props;
  const light = useLight();
  const theme: Theme = useTheme();
  const [color, setColor] = React.useState<string>(
    light.leds.colors
      ? light.leds.colors[index] ?? theme.customs.defaultColor
      : theme.customs.defaultColor
  );

  const handleComplete = (newColor: string) => {
    const oldColors = light.leds.colors ? [...light.leds.colors] : [];
    oldColors[index] = newColor;
    light.setColors(oldColors);
  };
  return (
    <>
      {title && <Typography align="center">{title}</Typography>}
      <ColorPicker
        color={color}
        onChange={(newColor: ColorResult) => setColor(newColor.hex)}
        onTextChange={(t: string) => {
          setColor(t);
          handleComplete(tinycolor(t).toHex());
        }}
        onChangeComplete={(res: ColorResult) => handleComplete(res.hex)}
      />
    </>
  );
}

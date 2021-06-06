import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { ColorResult } from 'react-color';
import tinycolor from 'tinycolor2';
import ColorPicker from '../../ColorPicker';
import { useLight } from '../../LightProvider';

enum Side {
  RIGHT,
  LEFT,
}
export interface GradientComponentProps {}
export default function GradientComponent(props: GradientComponentProps) {
  const light = useLight();
  const [color1, setColor1] = React.useState<string>(light.leds.colors[0]);
  const [color2, setColor2] = React.useState<string>(
    light.leds.colors[1] ?? light.leds.colors[0]
  );

  const handleComplete = (side: Side, color: string) => {
    console.log('complete');
    if (side === Side.LEFT) {
      light.setColors([tinycolor(color).toHex(), light.leds.colors[1]]);
    } else {
      light.setColors([light.leds.colors[0], tinycolor(color).toHex()]);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography align="center">End</Typography>
        <ColorPicker
          color={color1}
          onChange={(newColor: ColorResult) => setColor1(newColor.hex)}
          onTextChange={(t: string) => {
            setColor1(t);
            handleComplete(Side.LEFT, tinycolor(t).toHex());
          }}
          onChangeComplete={(color: ColorResult) => {
            handleComplete(Side.LEFT, color.hex);
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography align="center">Start</Typography>
        <ColorPicker
          color={color2}
          onChange={(newColor: ColorResult) => setColor2(newColor.hex)}
          onTextChange={(t: string) => {
            setColor2(t);
            handleComplete(Side.RIGHT, tinycolor(t).toHex());
          }}
          onChangeComplete={(color: ColorResult) => {
            handleComplete(Side.RIGHT, color.hex);
          }}
        />
      </Grid>
    </Grid>
  );
}

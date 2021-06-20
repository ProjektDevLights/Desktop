import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { ColorResult } from 'react-color';
import tinycolor from 'tinycolor2';
import ColorPicker from '../../ColorPicker';
import LightColorPicker from '../../LightColorPicker';
import { useLight } from '../../LightProvider';

enum Side {
  RIGHT,
  LEFT,
}
export interface GradientComponentProps {}
export default function GradientComponent(props: GradientComponentProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <LightColorPicker title="Start" index={0} />
      </Grid>
      <Grid item xs={6}>
        <LightColorPicker title="End" index={1} />
      </Grid>
    </Grid>
  );
}

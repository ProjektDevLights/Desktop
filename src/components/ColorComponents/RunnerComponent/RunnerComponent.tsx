import { Grid, makeStyles, Slider } from '@material-ui/core';
import { max } from 'lodash';
import React from 'react';
import LightColorPicker from '../../LightColorPicker';
import { useLight } from '../../LightProvider';
import TimeoutSlider from '../../TimeoutSlider';
import PlainComponent from '../PlainComponent';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 350,
  },
  sliderGrid: {
    height: '100%',
  },
  sliderContainer: {
    position: 'relative',
    height: '90%',
  },
  slider: {
    height: '100%',
    alignSelf: 'center',
    margin: theme.spacing(1),
  },
}));
export interface RunnerComponentProps {}
export default function RunnerComponent(props: RunnerComponentProps) {
  const light = useLight();
  const styles = useStyles();

  const speedToPercentage = (speed: number): number => {
    return 100 - max([0, Math.round(speed / 30)]);
  };
  const percentageToSpeed = (percentage: number): number => {
    return 3010 - max([10, percentage * 30]);
  };

  const [speed, setSpeed] = React.useState<number>(
    speedToPercentage(light.leds.timeout)
  );

  const marks = [
    {
      value: 0,
      label: 'super-slow',
    },
    {
      value: 25,
      label: 'slow',
    },
    {
      value: 50,
      label: 'medium',
    },
    {
      value: 75,
      label: 'fast',
    },
    {
      value: 100,
      label: 'super fast',
    },
  ];

  return (
    <Grid className={styles.root} container spacing={2} direction="row">
      <Grid item>
        <LightColorPicker index={0} />
      </Grid>
      <Grid item>
        <TimeoutSlider orientation="vertical" />
      </Grid>
    </Grid>
  );
}

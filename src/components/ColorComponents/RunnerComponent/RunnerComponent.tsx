import { Grid, makeStyles, Slider } from '@material-ui/core';
import { max } from 'lodash';
import React from 'react';
import { useLight } from '../../LightProvider';
import PlainComponent from '../PlainComponent';

const useStyles = makeStyles((theme: Theme) => ({
  sliderContainer: {},
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
    <Grid container spacing={2}>
      <Grid item>
        <PlainComponent />
      </Grid>
      <Grid className={styles.sliderContainer} item>
        <Slider
          value={speed}
          min={0}
          max={100}
          marks={marks}
          className={styles.slider}
          orientation="vertical"
          onChange={(e, value: number | number[]) => {
            setSpeed(value as number);
          }}
          onChangeCommitted={(e, value: number | number[]) => {
            light.setTimeout(percentageToSpeed(value as number));
          }}
        />
      </Grid>
    </Grid>
  );
}

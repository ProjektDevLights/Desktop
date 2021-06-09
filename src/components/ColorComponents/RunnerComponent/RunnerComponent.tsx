import { Grid, makeStyles, Slider } from '@material-ui/core';
import { max } from 'lodash';
import React from 'react';
import { useLight } from '../../LightProvider';
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
        <PlainComponent />
      </Grid>
      <Grid item>
        <Grid container className={styles.sliderGrid}>
          <div className={styles.sliderContainer}>
            <Slider
              value={speed}
              min={0}
              max={100}
              marks={marks}
              className={styles.slider}
              orientation="vertical"
              scale={(x) => {
                return x * x;
              }}
              onChange={(e, value: number | number[]) => {
                setSpeed(value as number);
              }}
              onChangeCommitted={(e, value: number | number[]) => {
                light.setTimeout(percentageToSpeed(value as number));
              }}
            />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

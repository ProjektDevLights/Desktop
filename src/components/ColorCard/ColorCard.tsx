import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import BasicCard from '../BasicCard';
import ColorComponentGroup from '../ColorComponentGroup';
import LightOff from '../LightOff';
import { useLight } from '../LightProvider';
import PatternPicker from '../PatternPicker';

const useStyles = makeStyles((theme) => ({
  root: {},
  icon: {
    color: theme.palette.secondary.main,
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  iconButton: {
    width: 100,
    height: 100,
  },
}));

export interface ColorCardProps {}
export default function ColorCard(props: ColorCardProps) {
  const styles = useStyles();
  const light = useLight();

  return (
    <>
      <BasicCard className={styles.root}>
        <Typography variant="h4">Pattern</Typography>
        <Typography variant="h6">{light.leds.pattern}</Typography>
        {light.isOn ? (
          <>
            <PatternPicker />
            <ColorComponentGroup />
          </>
        ) : (
          <LightOff />
        )}
      </BasicCard>
    </>
  );
}

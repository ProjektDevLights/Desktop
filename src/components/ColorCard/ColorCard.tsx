import { Pattern } from '@devlights/types';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import ColorComponentGroup from '../ColorComponentGroup';
import { useLight } from '../LightProvider';
import PatternPicker from '../PatternPicker';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'fit-content',
    borderRadius: 16,
  },
  buttonGroup: {
    margin: theme.spacing(2),
  },
}));

export interface ColorCardProps {}
export default function ColorCard(props: ColorCardProps) {
  const styles = useStyles();
  const light = useLight();
  const [color, setColor] = React.useState<string>(light.leds.colors[0]);
  const handlePattern = (newPattern: Pattern) => {
    setPattern(newPattern);
  };

  return (
    <Paper className={styles.root} elevation={4}>
      <Typography variant="h4">Color</Typography>
      <PatternPicker />
      <ColorComponentGroup />
    </Paper>
  );
}

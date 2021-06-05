import { Pattern } from '@devlights/types';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { HexColorPicker } from 'react-colorful';
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
    transform: 'rotate(-6deg)',
  },
  buttonGroup: {
    margin: theme.spacing(2),
  },
}));

export interface ColorCardProps {}
export default function ColorCard(props: ColorCardProps) {
  const styles = useStyles();
  const light = useLight();
  const [color, setColor] = React.useState('#ff0000');
  const [pattern, setPattern] = React.useState<Pattern>(light.leds.pattern);

  const handlePattern = (newPattern: Pattern) => {
    setPattern(newPattern);
  };
  const handleColor = (color: string) => {
    setColor(color);
  };
  return (
    <Paper className={styles.root} elevation={4}>
      <Typography variant="h4">Color</Typography>
      <PatternPicker pattern={pattern} onChange={handlePattern} />
      <HexColorPicker color={color} onChange={setColor} />
    </Paper>
  );
}

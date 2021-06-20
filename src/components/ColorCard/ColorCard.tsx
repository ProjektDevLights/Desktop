import { Pattern } from '@devlights/types';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconButton,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
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
    minWidth: '300px',
    minHeight: '200px',
    transform: 'rotate(-5deg)',
  },
  icon: {
    color: theme.palette.secondary.main,
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
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
    <>
      <Paper className={styles.root} elevation={4}>
        <Typography variant="h4">Pattern</Typography>
        <Typography variant="h6">{light.leds.pattern}</Typography>
        {light.isOn ? (
          <>
            <PatternPicker />
            <ColorComponentGroup />
          </>
        ) : (
          <>
            <Tooltip title="Turn on" placement="right">
              <IconButton>
                <FontAwesomeIcon
                  className={styles.icon}
                  size="3x"
                  icon={faPowerOff}
                  onClick={light.toggleOn}
                />
              </IconButton>
            </Tooltip>
            <Typography variant="body2">
              In order to change the light's pattern turn it on first!
            </Typography>
          </>
        )}
      </Paper>
    </>
  );
}

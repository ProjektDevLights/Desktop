import { Pattern } from '@devlights/types';
import { faPlug, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconButton,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React from 'react';
import BasicCard from '../BasicCard';
import ColorComponentGroup from '../ColorComponentGroup';
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
      <BasicCard rotation={-5} className={styles.root}>
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
              <IconButton className={styles.iconButton}>
                <FontAwesomeIcon
                  className={styles.icon}
                  size="3x"
                  icon={faPlug}
                  onClick={() => light.setPowerStatus(true)}
                />
              </IconButton>
            </Tooltip>
            <Typography variant="body2">
              In order to change the light's pattern turn it on first!
            </Typography>
          </>
        )}
      </BasicCard>
    </>
  );
}

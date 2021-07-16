import { faPlug } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconButton,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useLight } from '../LightProvider';

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    color: theme.palette.secondary.main,
    margin: theme.spacing(1),
  },

  iconButton: {
    width: 100,
    height: 100,
  },
}));
export interface LightOffProps {
  text?: string;
}
export default function LightOff(props: LightOffProps) {
  const { text } = props;
  const styles = useStyles();
  const light = useLight();
  return (
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
        {text ?? 'In order to change the light turn it on first!'}
      </Typography>
    </>
  );
}

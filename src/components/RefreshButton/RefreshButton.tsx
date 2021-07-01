import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fab, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { useLights } from '../LightsProvider';
const useStyles = makeStyles((theme: Theme) => ({
  button: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  caption: {
    paddingLeft: 4,
    color: 'inherit',
  },
  icon: {
    marginRight: 4,
  },
}));
export interface RefreshButtonProps {}
export default function RefreshButton(props: RefreshButtonProps) {
  const lights = useLights();
  const styles = useStyles();
  return (
    <Fab
      className={styles.button}
      variant="extended"
      color="primary"
      onClick={lights.fetch}
    >
      <FontAwesomeIcon icon={faSync} className={styles.icon} />
      Refresh
      <Typography className={styles.caption} variant="caption">
        (Ctrl + R)
      </Typography>
    </Fab>
  );
}

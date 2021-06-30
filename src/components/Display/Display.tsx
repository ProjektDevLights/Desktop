import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
type Bounds = Electron.Display['bounds'];
export interface DisplayProps {
  display: Electron.Display;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: (bounds: Bounds) => bounds.width,
    height: (bounds: Bounds) => bounds.height,
    backgroundColor: theme.palette.info.light,
    display: 'flex',
    position: 'absolute',
    top: (bounds: Bounds) => bounds.y,
    left: (bounds: Bounds) => bounds.x,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    transition: 'all .3s ease-in-out 0s',
  },
  id: {
    fontWeight: 'bold',
  },
}));
export default function Display(props: DisplayProps) {
  const { display } = props;
  const styles = useStyles(display.bounds);
  return (
    <div className={styles.root}>
      <Typography variant="h3" className={styles.id}>
        {display.id}
      </Typography>
      <Typography variant="h6">{`${display.size.width}x${display.size.height}`}</Typography>
    </div>
  );
}

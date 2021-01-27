import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.default,
    width: '100vw',
    height: '100vh',
    transition: theme.transitions.create(['all'], {
      duration: 500,
      easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
    }),
  },
  switch: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
}));

export interface MainProps {}
export default function Main(props: MainProps) {
  const styles = useStyles();

  return <div className={styles.root}></div>;
}

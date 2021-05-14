import { makeStyles, Theme, Toolbar } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alarm from '../Alarm';
import Appbar, { appbarHeight } from '../Appbar/Appbar';
import HomeSwitch from '../HomeSwitch/HomeSwitch';
import Settings from '../Settings';
import Sidebar, { drawerWidth } from '../Sidebar/Sidebar';

const spacing = 4;
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    background: theme.palette.background.default,
    transition: theme.customs.colorTransition,
  },
  container: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: `calc(100vw - ${drawerWidth + theme.spacing(spacing) * 2}px)`,
    top: appbarHeight + theme.spacing(spacing),
    right: theme.spacing(spacing),
    left: drawerWidth + theme.spacing(spacing),
  },
}));

export default function Container() {
  const styles = useStyles();
  const theme: Theme = useTheme();
  console.log(theme.palette.primary);
  return (
    <div className={styles.root}>
      <Appbar />
      <Sidebar />

      <div className={styles.container}>
        <Toolbar />
        <Switch>
          <Route exact path="/home" component={HomeSwitch} />
          <Route exact path="/alarm" component={Alarm} />
          <Route exact path="/settings" component={Settings} />
        </Switch>
      </div>
    </div>
  );
}
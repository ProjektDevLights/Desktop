import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alarm from '../Alarm';
import Appbar from '../Appbar';
import { appbarHeight } from '../Appbar/Appbar';
import Home from '../Home';
import Settings from '../Settings';
import Sidebar from '../Sidebar';
import { drawerWidth } from '../Sidebar/Sidebar';

const spacing = 4;
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.default,
    width: '100vw',
    height: `100vh`,
    transition: theme.customs.colorTransition,
    position: 'absolute',
    zIndex: -1,
  },
  container: {
    position: 'absolute',
    width: `calc(100vw - ${drawerWidth + theme.spacing(spacing)*2}px)`,
    top: appbarHeight + theme.spacing(spacing),
    right: theme.spacing(spacing),
    left: drawerWidth + theme.spacing(spacing),
  },
}));

export default function Container() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Appbar />
      <Sidebar />

      <div className={styles.container}>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/alarm" component={Alarm} />
          <Route exact path="/settings" component={Settings} />
        </Switch>
      </div>
    </div>
  );
}

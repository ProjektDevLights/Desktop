import { faClock, faCog, faHome } from '@fortawesome/free-solid-svg-icons';
import { Drawer, List, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { appbarHeight } from '../Appbar/Appbar';
import SidebarItem from '../SidebarItem';

export const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    height: '100vh',
  },
  drawerPaper: {
    transition: theme.customs.colorTransition,
    border: 'none',
    width: drawerWidth,
  },
  toolbar: {
    overflow: 'auto',
    paddingTop: appbarHeight,
  },
}));
const Sidebar = () => {
  const styles = useStyles();
  const history = useHistory();
  const location = useLocation().pathname.split('/')[1];
  const handleItemPress = (to: string) => {
    history.push(`/${to}`);
  };

  return (
    <Drawer
      className={styles.drawer}
      classes={{
        paper: styles.drawerPaper,
      }}
      variant="permanent"
    >
      <div className={styles.toolbar}>
        <List>
          <SidebarItem
            active={location === 'home'}
            onClick={() => handleItemPress('home')}
            label="Home"
            icon={faHome}
          />
          <SidebarItem
            active={location === 'alarm'}
            onClick={() => handleItemPress('alarm')}
            label="Alarm"
            icon={faClock}
          />
          <SidebarItem
            active={location === 'settings'}
            onClick={() => handleItemPress('settings')}
            label="Settings"
            icon={faCog}
          />
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;

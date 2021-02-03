import { faClock, faCog, faHome } from '@fortawesome/free-solid-svg-icons';
import { Drawer, List, Theme, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { appbarHeight } from '../Appbar/Appbar';
import SidebarItem from '../SidebarItem';

export const drawerWidth = 240;
export enum SidebarCategory {
  HOME,
  ALARM,
  SETTINGS,
}

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    transition: theme.customs.colorTransition,
    border: 'none',
    width: drawerWidth,
    //background: 'transparent',
  },
  toolbar: {
    overflow: 'auto',
    paddingTop: appbarHeight,
  },
}));
const Sidebar = () => {
  const styles = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [active, setActive] = React.useState<SidebarCategory>(
    SidebarCategory.HOME
  );
  const handleItemPress = (item: SidebarCategory) => {
    setActive(item);
    history.push(`/${SidebarCategory[item].toLowerCase()}`);
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
            active={active === SidebarCategory.HOME}
            onClick={() => handleItemPress(SidebarCategory.HOME)}
            label="Home"
            icon={faHome}
          />
          <SidebarItem
            active={active === SidebarCategory.ALARM}
            onClick={() => handleItemPress(SidebarCategory.ALARM)}
            label="Alarm"
            icon={faClock}
          />
          <SidebarItem
            active={active === SidebarCategory.SETTINGS}
            onClick={() => handleItemPress(SidebarCategory.SETTINGS)}
            label="Settings"
            icon={faCog}
          />
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;

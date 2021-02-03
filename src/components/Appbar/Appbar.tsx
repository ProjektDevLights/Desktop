import {
  AppBar,
  IconButton,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useLocation } from 'react-router-dom';
import AppbarContainer from '../AppbarContainer';
import AppbarItem from '../AppbarItem';
import ThemeSwitch from '../ThemeSwitch';
import { useThemeSwitch } from '../ThemeSwitchProvider';

export const appbarHeight = 64;
const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.customs.colorTransition,
    height: appbarHeight,
  },
}));

function Appbar() {
  const { toggleTheme } = useThemeSwitch();
  const styles = useStyles();
  const location = useLocation();
  return (
    <AppBar className={styles.appBar} position="fixed">
      <Toolbar>
        <AppbarContainer>
          <AppbarItem center>
            <Typography variant="h4" color="initial">
              {location.pathname}
            </Typography>
          </AppbarItem>
          <AppbarItem right>
            <IconButton onClick={toggleTheme}>
              <ThemeSwitch />
            </IconButton>
          </AppbarItem>
        </AppbarContainer>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;

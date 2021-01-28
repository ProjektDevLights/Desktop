import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import AppbarContainer from '../AppbarContainer';
import AppbarItem from '../AppbarItem';
import ThemeSwitch from '../ThemeSwitch';
import { useThemeSwitch } from '../ThemeSwitchProvider';

function Appbar() {
  const { toggleTheme } = useThemeSwitch();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <AppbarContainer>
          <AppbarItem center>
            <Typography variant="h4">Overview</Typography>
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

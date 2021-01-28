import { createMuiTheme } from '@material-ui/core';

const theme = (dark: boolean) => {
  return createMuiTheme({
    palette: {
      type: dark ? 'dark' : 'light',
      primary: {
        main: dark ? '#1DE9B6' : '#FF9800',
      },
      secondary: {
        main: dark ? '#FF9800' : '#1DE9B6',
      },
    },
    typography: {
      fontFamily: ['Titillium Web'].join(','),
    },
  });
};

export default theme;

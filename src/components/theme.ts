import { createMuiTheme } from '@material-ui/core';

const theme = (dark: boolean) => {
  return createMuiTheme({
    palette: {
      type: dark ? 'dark' : 'light',
      primary: {
        main: '#1DE9B6',
      },
      secondary: {
        main: '#FF9800',
      },
    },
    typography: {
      fontFamily: ['Titillium Web'].join(','),
    },
  });
};

export default theme;

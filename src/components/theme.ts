import { createMuiTheme } from '@material-ui/core';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    customs: {
      colorTransition: string;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    customs?: {
      colorTransition?: string;
    };
  }
}

const theme = (dark: boolean) => {
  return createMuiTheme({
    props: {
      MuiTypography: {
        color: 'textPrimary',
      },
    },
    palette: {
      type: dark ? 'dark' : 'light',
      primary: {
        main: dark ? '#1DE9B6' : '#FF9800',
      },
      secondary: {
        main: dark ? '#FF9800' : '#1DE9B6',
      },
      background: {
        paper: dark ? '#ffffff14' : '#ebebeb',
      },
    },
    typography: {
      fontFamily: ['Titillium Web'].join(','),
    },
    customs: {
      colorTransition: 'background 200ms cubic-bezier(0.87, 0, 0.13, 1) 0ms',
    },
  });
};

export default theme;

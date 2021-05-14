import { createMuiTheme, Theme } from '@material-ui/core';

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

const defaultTheme = (dark: boolean): Theme =>
  createMuiTheme({ palette: { type: dark ? 'dark' : 'light' } });
const theme = (dark: boolean) => {
  return createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            margin: 0,
            '&::-webkit-scrollbar': {
              backgroundColor: defaultTheme(dark).palette.background.paper,
            },
            '&::-webkit-scrollbar-thumb': {
              background: !dark
                ? `linear-gradient(180deg, rgb(74,237,196), rgb(20,163,127))`
                : `linear-gradient(180deg, rgb(255,172,51), rgb(178,106,0))`,
              borderRadius: 10,
            },
          },
        },
      },
    },
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

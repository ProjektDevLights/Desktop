import { createMuiTheme, Theme } from '@material-ui/core';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    customs: {
      defaultColor: string;
      colorTransition: string;
      presets: {
        blend: Record<string, unknown>;
        filter: Record<string, unknown>;
      };
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    customs?: {
      defaultColor?: string;
      colorTransition?: string;
      presets?: {
        blend?: Record<string, unknown>;
        filter?: Record<string, unknown>;
      };
    };
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    tertiary: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
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
            '&::-webkit-outer-spin-button,::-webkit-inner-spin-button': {
              '-webkit-appearance': 'none',
              margin: 0,
            },
          },
        },
      },
      MuiList: {
        root: {
          width: '100%',
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
      tertiary: {
        main: '#FF7D91',
      },
      background: {
        paper: dark ? '#ffffff14' : '#ebebeb',
      },
    },
    typography: {
      fontFamily: ['Titillium Web'].join(','),
    },
    customs: {
      defaultColor: '#1de9b6',
      colorTransition: 'background 200ms cubic-bezier(0.87, 0, 0.13, 1) 0ms',
      presets: {
        filter: {
          background: 'inherit',
          '-webkit-background-clip': 'text',
          color: 'transparent',
          filter: 'invert(1) grayscale(1) contrast(100)',
        },
        blend: { mixBlendMode: 'difference', color: 'white' },
      },
    },
  });
};

export default theme;

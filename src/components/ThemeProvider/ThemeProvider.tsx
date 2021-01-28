import { ThemeProvider as MaterialProvider } from '@material-ui/core';
import React from 'react';
import theme from '../theme';
import { useThemeSwitch } from '../ThemeSwitchProvider';

export interface ThemeProviderProps {
  children: React.ReactNode;
}
export default function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props;
  const themeSwitch = useThemeSwitch();
  return (
    <>
      <MaterialProvider theme={theme(themeSwitch.isThemeDark)}>
        {children}
      </MaterialProvider>
    </>
  );
}

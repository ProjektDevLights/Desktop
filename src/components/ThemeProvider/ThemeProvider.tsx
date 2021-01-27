import { ThemeProvider as MaterialProvider } from '@material-ui/core';
import React from 'react';
import theme from '../theme';
import ThemeSwitch from '../ThemeSwitch';

export interface ThemeProviderProps {
  children: React.ReactNode;
}
export default function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props;
  const [isThemeDark, setIsThemeDark] = React.useState<boolean>(
    localStorage.getItem('isThemeDark')
      ? JSON.parse(localStorage.getItem('isThemeDark'))
      : true
  );
  const toggleTheme = () => {
    localStorage.setItem('isThemeDark', JSON.stringify(!isThemeDark));
    setIsThemeDark(!isThemeDark);
  };
  return (
    <>
      <MaterialProvider theme={theme(isThemeDark)}>
        <>
          <ThemeSwitch isThemeDark={isThemeDark} toggleTheme={toggleTheme} />
          {children}
        </>
      </MaterialProvider>
    </>
  );
}

import React from 'react';

export interface ThemeSwitchContextProps {
  isThemeDark: boolean;
  toggleTheme: () => void;
}
export interface ThemeSwitchProviderProps {
  children: React.ReactNode;
}
export const ThemeSwitchContext = React.createContext<ThemeSwitchContextProps>({
  isThemeDark: true,
  toggleTheme: () => {},
});
function ThemeSwitchProvider(props: ThemeSwitchProviderProps) {
  const [isThemeDark, setIsThemeDark] = React.useState<boolean>(
    localStorage.getItem('isThemeDark')
      ? JSON.parse(localStorage.getItem('isThemeDark'))
      : true
  );
  const toggleTheme = () => {
    localStorage.setItem('isThemeDark', JSON.stringify(!isThemeDark));
    setIsThemeDark(!isThemeDark);
  };
  const { children } = props;
  return (
    <ThemeSwitchContext.Provider
      value={{
        isThemeDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeSwitchContext.Provider>
  );
}

export default ThemeSwitchProvider;

import React from 'react';
import {
  ThemeSwitchContext,
  ThemeSwitchContextProps,
} from './ThemeSwitchProvider';

export default function useThemeSwitch() {
  return React.useContext<ThemeSwitchContextProps>(ThemeSwitchContext);
}

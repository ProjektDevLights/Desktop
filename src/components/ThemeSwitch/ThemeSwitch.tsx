import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import React from 'react';
//@ts-ignore
import { MorphReplace } from 'react-svg-morph';

export interface ThemeSwitchProps {
  isThemeDark: boolean;
  toggleTheme: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    top: 20,
    right: 20,
    height: 'fit-content',
    width: 'fit-content',
    '& path': {
      fill: (props: ThemeSwitchProps) =>
        props.isThemeDark
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
    },
  },
}));
export default function ThemeSwitch(props: ThemeSwitchProps) {
  const styles = useStyles(props);
  const theme = useTheme();
  const { isThemeDark, toggleTheme } = props;
  return (
    <div onClick={toggleTheme} className={styles.root}>
      <MorphReplace width={50} height={50}>
        {isThemeDark ? (
          <FontAwesomeIcon key="night" icon={faMoon} />
        ) : (
          <FontAwesomeIcon key="day" icon={faSun} />
        )}
      </MorphReplace>
    </div>
  );
}

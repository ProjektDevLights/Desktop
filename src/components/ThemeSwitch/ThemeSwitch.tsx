import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
//@ts-ignore
import { MorphReplace } from 'react-svg-morph';
import { useThemeSwitch } from '../ThemeSwitchProvider';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 36,
    width: 36,
    '& path': {
      fill: theme.palette.secondary.main,
    },
  },
}));
export default function ThemeSwitch() {
  const styles = useStyles();
  const { isThemeDark } = useThemeSwitch();
  return (
    <div className={styles.root}>
      <MorphReplace width={36} height={36}>
        {isThemeDark ? (
          <FontAwesomeIcon key="night" icon={faMoon} />
        ) : (
          <FontAwesomeIcon key="day" icon={faSun} />
        )}
      </MorphReplace>
    </div>
  );
}

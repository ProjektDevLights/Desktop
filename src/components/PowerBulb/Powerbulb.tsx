import { Light } from '@devlights/types';
import { faLightbulb as faLightbulbRegular } from '@fortawesome/free-regular-svg-icons';
import { faLightbulb as faLightbulbSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import tinycolor from 'tinycolor2';
import { useLight } from '../LightProvider';
import { useLights } from '../LightsProvider';

const getColor = (light: Light): string => {
  if (light.isOn) {
    switch (light.leds.pattern) {
      case 'plain':
        return tinycolor(light.leds.colors[0]).isDark() ? '#fff' : '#000';
      case 'gradient':
        return tinycolor(light.leds.colors[1]).isDark() ? '#fff' : '#000';
      default:
        return '';
    }
  } else {
    return '#fff';
  }
};
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    cursor: 'pointer',
    color: (light: Light) => getColor(light),
  },
}));
const Powerbulb = () => {
  const light = useLight();
  const { isOn, id } = light;
  const { toggleOn } = useLights();
  const styles = useStyles(light);
  const handleClick = () => {
    toggleOn(id);
  };
  return (
    <FontAwesomeIcon
      size="2x"
      className={styles.root}
      onClick={handleClick}
      icon={isOn ? faLightbulbSolid : faLightbulbRegular}
    />
  );
};

export default Powerbulb;

import { faLightbulb as faLightbulbRegular } from '@fortawesome/free-regular-svg-icons';
import { faLightbulb as faLightbulbSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useLight } from '../LightProvider';
import { useLights } from '../LightsProvider';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    top: theme.spacing(0.5),
    right: theme.spacing(0.5),
    width: 50,
    height: 50,
    cursor: 'pointer',
    color: theme.palette.grey[500],
    transition: theme.customs.colorTransition,
  },
  icon: {
    width: '30px !important',
    height: '30px !important',
  },
}));
const Powerbulb = () => {
  const light = useLight();
  const { isOn, id } = light;
  const { toggleOn } = useLights();
  const styles = useStyles(light);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    toggleOn(id);
  };
  return (
    <IconButton
      className={styles.root}
      onClick={handleClick}
      onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
        e.stopPropagation()
      }
    >
      <FontAwesomeIcon
        className={styles.icon}
        icon={isOn ? faLightbulbSolid : faLightbulbRegular}
      />
    </IconButton>
  );
};

export default Powerbulb;

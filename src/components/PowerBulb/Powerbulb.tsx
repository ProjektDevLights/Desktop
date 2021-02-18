import { Light } from '@devlights/types';
import { faLightbulb as faLightbulbRegular } from '@fortawesome/free-regular-svg-icons';
import { faLightbulb as faLightbulbSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useLights } from '../LightsProvider';



export interface PowerbulbProps {
  light: Light
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    cursor: "pointer"
  }
}))
const Powerbulb = (props: PowerbulbProps) => {
  const {isOn,id} = props.light;
  const {toggleOn} = useLights();
  const styles = useStyles();
  const handleClick = () => {
    toggleOn(id);
  }
  return (
    <FontAwesomeIcon size="2x" className={styles.root} onClick={handleClick} icon={isOn ? faLightbulbSolid: faLightbulbRegular} />
  )
}

export default Powerbulb

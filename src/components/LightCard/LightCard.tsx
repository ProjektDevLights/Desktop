import { Light } from '@devlights/types';
import {
  Card,
  CardContent,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import tinycolor from 'tinycolor2';
import BrightnessSlider from '../BrightnessSlider';
import { useLight } from '../LightProvider';
import Powerbulb from '../PowerBulb';
import TagChip from '../TagChip';
const getBackground = (light: Light): string => {
  if (light.isOn) {
    switch (light.leds.pattern) {
      case 'plain':
        return light.leds.colors[0];
      case 'gradient':
        return `linear-gradient(120deg, ${light.leds.colors[0]}, ${light.leds.colors[1]})`;
      default:
        return '';
    }
  } else {
    return '#000';
  }
};
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(3),
    borderRadius: 20,
  },
  card: {
    width: 400,
    height: 200,
    borderRadius: 20,
  },
  paper: {
    background: (light: Light) => getBackground(light),
    height: '40%',
    position: 'relative',
    transition: theme.customs.colorTransition,
  },
  name: {
    color: (light: Light) =>
      light.isOn
        ? tinycolor(light.leds.colors[0]).isLight()
          ? '#000'
          : '#fff'
        : '#fff',
    position: 'relative',
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
  slider: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(1) * 2}px)`,
  },
}));
function LightCard() {
  const light = useLight();
  const styles = useStyles(light);
  const history = useHistory();
  return (
    <Card
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        history.push(`/home/light/${light.id}`);
      }}
      className={styles.card}
    >
      <Paper className={styles.paper} square elevation={0}>
        <Typography variant="h5" className={styles.name}>
          {light.name}
        </Typography>
        <Powerbulb />
      </Paper>
      <CardContent>
        {light.tags?.map((tag: string, index: number) => (
          <TagChip key={index} tag={tag} />
        ))}
        <BrightnessSlider className={styles.slider} />
      </CardContent>
    </Card>
  );
}

export default LightCard;

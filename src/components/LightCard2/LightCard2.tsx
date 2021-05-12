import { Light } from '@devlights/types';
import {
  ButtonBase,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
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
const getTextColor = (light: Light): string => {
  if (light.isOn) {
    return tinycolor(light.leds.colors[0]).isLight() ? '#000' : '#fff';
  }
  return '#fff';
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 400,
    height: 200,
    borderRadius: theme.shape.borderRadius * 2,
    overflow: 'hidden',
    boxShadow: theme.shadows[3],
  },
  slider: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(1) * 2}px)`,
  },
  grid_container: {
    width: '100%',
    height: '100%',
    flexWrap: 'nowrap',
  },
  grid_item: {
    width: '100%',
    maxWidth: '100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  grid_item_top: {
    paddingTop: theme.spacing(2),
    backgroundColor: (light: Light) => getBackground(light),
  },
  grid_item_bottom: {
    padding: theme.spacing(2),
    textAlign: 'left',
  },
  name: {
    color: (light: Light) => getTextColor(light),
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

export default function LightCard2() {
  const light = useLight();
  const styles = useStyles(light);
  const history = useHistory();

  return (
    <ButtonBase
      className={styles.root}
      onClick={(e: MouseEvent) => {
        console.log(e);
        e.preventDefault();
        e.stopPropagation();
        history.push(`/home/light/${light.id}`);
      }}
    >
      <Grid container direction="column" className={styles.grid_container}>
        <Grid
          sm={6}
          item
          className={clsx(styles.grid_item, styles.grid_item_top)}
        >
          <Powerbulb />
          <Typography variant="h5" className={styles.name}>
            {light.name}
          </Typography>
        </Grid>
        <Grid
          alignItems="flex-start"
          sm={6}
          item
          className={clsx(styles.grid_item, styles.grid_item_bottom)}
        >
          {light.tags?.map((tag: string) => (
            <TagChip key={tag} tag={tag} />
          ))}
          <BrightnessSlider className={styles.slider} />
        </Grid>
      </Grid>
    </ButtonBase>
  );
}

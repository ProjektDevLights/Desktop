import { ButtonBase, Grid, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import BrightnessSlider from '../BrightnessSlider';
import ContrastTypography from '../ContrastTypography';
import LightBackground from '../LightBackground';
import { useLight } from '../LightProvider';
import Powerbulb from '../PowerBulb';
import TagChip from '../TagChip';

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
  },
  grid_item_bottom: {
    padding: theme.spacing(2),
    textAlign: 'left',
    backgroundColor: theme.palette.background.paper,
  },
  name: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

export default function LightCard() {
  const light = useLight();
  const styles = useStyles(light);
  const history = useHistory();

  return (
    <ButtonBase
      className={styles.root}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        history.push(`/home/light/${light.id}`);
      }}
    >
      <Grid container direction="column" className={styles.grid_container}>
        <Grid
          xs={6}
          item
          component={LightBackground}
          className={clsx(styles.grid_item, styles.grid_item_top)}
        >
          <Powerbulb />
          <ContrastTypography
            variant="h5"
            className={styles.name}
            blend={light.leds.pattern === 'runner'}
          >
            {light.name}
          </ContrastTypography>
        </Grid>
        <Grid
          xs={6}
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

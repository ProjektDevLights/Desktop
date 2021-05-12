import { Light } from '@devlights/types';
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import LightCard from '../LightCard2';
import { LightProvider } from '../LightProvider';
import useLights from '../LightsProvider/useLights';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));
function Home() {
  const styles = useStyles();
  const { lights } = useLights();
  return (
    <Grid className={styles.container} container spacing={2}>
      <Grid className={styles.cardsContainer} item sm={12} lg={7}>
        {lights.map((light: Light) => {
          return (
            <LightProvider key={light.id} id={light.id}>
              <LightCard />
            </LightProvider>
          );
        })}
      </Grid>
      <Grid item sm={12} lg={5}></Grid>
    </Grid>
  );
}

export default Home;

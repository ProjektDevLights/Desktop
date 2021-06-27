import { Light } from '@devlights/types';
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import LightCard from '../LightCard';
import { LightProvider } from '../LightProvider';
import useLights from '../LightsProvider/useLights';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
  },
}));
function Home() {
  const styles = useStyles();
  const { lights } = useLights();
  return (
    <Grid className={styles.container} container spacing={2}>
      <Grid item container spacing={4} sm={12} lg={12}>
        {lights.map((light: Light) => {
          return (
            <Grid item key={light.id}>
              <LightProvider id={light.id}>
                <LightCard />
              </LightProvider>
            </Grid>
          );
        })}
      </Grid>
      <Grid item sm={12} lg={5}></Grid>
    </Grid>
  );
}

export default Home;

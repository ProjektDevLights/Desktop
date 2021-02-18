import { Light } from '@devlights/types';
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import LightCard from '../LightCard';
import useLights from '../LightsProvider/useLights';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
  }
}));
function Home() {
  const styles = useStyles();
  const {lights} = useLights();
  return (
    <Grid className={styles.container} container spacing={2}>
      <Grid className={styles.cardsContainer} item sm={12} lg={7}>
        {lights.map((light: Light) => {
          console.log(light)
          return <LightCard light={light} />
        })}
      </Grid>
      <Grid item sm={12} lg={5}>

      </Grid>
    </Grid>
  );
}

export default Home;

import { Light } from '@devlights/types';
import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import AlarmCard from '../AlarmCard';
import AmbientCard from '../AmbientCard';
import ColorCard from '../ColorCard';
import { useLight } from '../LightProvider';
import NameInput from '../NameInput';
import SettingsCard from '../SettingsCard';
import TagsCard from '../TagsCard';

const useStyles = makeStyles((theme: Theme) => ({
  name: {
    marginBottom: theme.spacing(3),
  },
}));
const LightScreen = () => {
  const light: Light = useLight();
  const styles = useStyles();
  return (
    <>
      <NameInput className={styles.name} value={light.name} />
      <Grid container spacing={4}>
        <Grid item>
          <ColorCard />
        </Grid>
        <Grid item>
          <SettingsCard />
        </Grid>
        <Grid item>
          <TagsCard />
        </Grid>
        <Grid item>
          <AlarmCard />
        </Grid>
        <Grid item>
          <AmbientCard />
        </Grid>
      </Grid>
    </>
  );
};

export default LightScreen;

import { faPowerOff, faRuler } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Switch,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import BasicCard from '../BasicCard';
import { useLight } from '../LightProvider';
import { LengthItem, PowerItem } from '../SettingsItems';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  list: {
    width: '100%',
  },
}));
function SettingsCard() {
  const styles = useStyles();
  const light = useLight();
  const theme = useTheme();
  return (
    <BasicCard className={styles.root} rotation={4}>
      <Typography variant="h4">Settings</Typography>
      <List className={styles.list}>
        <PowerItem />
        <LengthItem />
        <ListItem>3</ListItem>
      </List>
    </BasicCard>
  );
}

export default SettingsCard;

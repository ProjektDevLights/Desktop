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
import { LengthItem, PositionItem, PowerItem } from '../SettingsItems';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: 'none',
    width: 400,
  },
  list: {
    width: '100%',
  },
  typographyContainer: {
    display: 'flex',
    flex: 'auto',
    alignItems: 'center',
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
        <PositionItem />
        {light.isOn && (
          <>
            <LengthItem />
          </>
        )}
      </List>
      {!light.isOn && (
        <div className={styles.typographyContainer}>
          <Typography variant="body2">
            In order to change the light's settings turn it on first!
          </Typography>
        </div>
      )}
    </BasicCard>
  );
}

export default SettingsCard;

import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import { useLight } from '../LightProvider';

export default function PowerItem() {
  const light = useLight();
  const theme = useTheme();
  return (
    <ListItem>
      <ListItemIcon>
        <FontAwesomeIcon
          color={
            light.isOn ? theme.palette.primary.main : theme.palette.grey[500]
          }
          size="2x"
          icon={faPowerOff}
        />
      </ListItemIcon>
      <ListItemText>Power Status</ListItemText>
      <ListItemSecondaryAction>
        <Switch
          color="primary"
          checked={light.isOn}
          onChange={(e, checked: boolean) => light.setPowerStatus(checked)}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

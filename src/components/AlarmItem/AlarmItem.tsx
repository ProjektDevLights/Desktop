import { Alarm } from '@devlights/types';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ListItem,
  ListItemIcon,
  ListItemProps,
  ListItemText,
  useTheme,
} from '@material-ui/core';
import React from 'react';

export interface AlarmItemProps extends ListItemProps {
  alarm: Alarm;
}
export default function AlarmItem(props: AlarmItemProps) {
  const { alarm } = props;
  const theme = useTheme();
  return (
    <ListItem>
      <ListItemIcon>
        <FontAwesomeIcon
          size="2x"
          color={alarm.isOn ? alarm.color : theme.palette.common.white}
          icon={faBell}
        />
      </ListItemIcon>
      <ListItemText>{`${alarm.time} - ${alarm.name}`}</ListItemText>
      {/* remove button */}
    </ListItem>
  );
}

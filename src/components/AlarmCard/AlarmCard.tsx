import { Alarm } from '@devlights/types';
import { List, Typography } from '@material-ui/core';
import React from 'react';
import AlarmItem from '../AlarmItem';
import BasicCard from '../BasicCard';
import { useLight } from '../LightProvider';

export interface AlarmCardProps {}
export default function AlarmCard(props: AlarmCardProps) {
  const light = useLight();

  const [alarms, setAlarms] = React.useState<Alarm[]>([]);

  React.useEffect(() => {
    light.getAlarms().then(setAlarms);
  }, []);
  return (
    <BasicCard rotation={3}>
      <Typography variant="h4">Alarms</Typography>
      <Typography variant="body1">Alarms running on this light</Typography>
      <List>
        {alarms.map((alarm: Alarm, i: number) => (
          <AlarmItem
            key={alarm.id}
            alarm={alarm}
            divider={i !== alarms.length - 1}
          />
        ))}
      </List>
    </BasicCard>
  );
}

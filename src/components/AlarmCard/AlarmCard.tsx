import { Alarm } from '@devlights/types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconButton,
  List,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React from 'react';
import AlarmItem from '../AlarmItem';
import BasicCard from '../BasicCard';
import { useLight } from '../LightProvider';

const useStyles = makeStyles((theme: Theme) => ({
  desc: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    color: theme.palette.secondary.main,
    margin: theme.spacing(1),
  },
  iconButton: {
    width: 100,
    height: 100,
  },
}));
export interface AlarmCardProps {}
export default function AlarmCard(props: AlarmCardProps) {
  const light = useLight();
  const styles = useStyles();
  const [alarms, setAlarms] = React.useState<Alarm[]>([]);

  React.useEffect(() => {
    light.getAlarms().then(setAlarms);
  }, []);
  return (
    <BasicCard rotation={3}>
      <Typography variant="h4">Alarms</Typography>
      <Typography variant="body1" className={styles.desc}>
        Alarms running on this light
      </Typography>
      {!alarms.length ? (
        <>
          <Tooltip title="Add alarm" placement="right">
            <IconButton className={styles.iconButton}>
              <FontAwesomeIcon
                className={styles.icon}
                size="3x"
                icon={faPlus}
              />
            </IconButton>
          </Tooltip>
          <Typography variant="body2">Nothing to show! Add one</Typography>
        </>
      ) : (
        <List>
          {alarms.map((alarm: Alarm, i: number) => (
            <AlarmItem
              key={alarm.id}
              alarm={alarm}
              divider={i !== alarms.length - 1}
            />
          ))}
        </List>
      )}
    </BasicCard>
  );
}

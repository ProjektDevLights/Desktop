import { faRuler } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
} from '@material-ui/core';
import React from 'react';
import { useLight } from '../LightProvider';

const useStyles = makeStyles((theme: Theme) => ({
  actionContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textField: { width: '40%', alignSelf: 'end' },
}));
export default function LengthItem() {
  const styles = useStyles();
  const light = useLight();
  return (
    <ListItem>
      <ListItemIcon>
        <FontAwesomeIcon size="2x" icon={faRuler} />
      </ListItemIcon>
      <ListItemText>Length</ListItemText>
      <ListItemSecondaryAction className={styles.actionContainer}>
        <TextField
          value={light.count}
          type="number"
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            light.setCount(parseInt(e.target.value, 10));
          }}
          className={styles.textField}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

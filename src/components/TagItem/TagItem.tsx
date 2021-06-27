import { faTag, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemProps,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';
import { useLight } from '../LightProvider';

const useStyles = makeStyles((theme: Theme) => ({
  delIcon: {
    color: theme.palette.error.main,
    height: 25,
    width: '25px !important',
  },
}));
export interface TagItemProps extends ListItemProps {
  tag: string;
}
export default function TagItem(props: TagItemProps) {
  const { tag, ...rest } = props;
  const styles = useStyles();
  const light = useLight();
  return (
    <ListItem {...rest}>
      <ListItemIcon>
        <FontAwesomeIcon size="lg" icon={faTag} />
      </ListItemIcon>
      <ListItemText>{tag}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={() => light.removeTag(tag)}>
          <FontAwesomeIcon className={styles.delIcon} icon={faTrashAlt} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

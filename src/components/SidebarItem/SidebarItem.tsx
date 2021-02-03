import {
  faChevronRight,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 70,
    borderTopRightRadius: '50rem',
    borderBottomRightRadius: '50rem',
    backgroundColor: (props: SidebarItemProps) =>
      props.active ? theme.palette.secondary.main : '#00000000',
    '&:hover': {
      backgroundColor: (props: SidebarItemProps) =>
        props.active ? theme.palette.secondary.dark : '#00000014',
    },
  },
  listIconRight: {
    justifyContent: 'flex-end',
    minWidth: 16,
  },
  listIconLeft: {
    minWidth: 16,
    justifyContent: 'flex-start',
    marginRight: theme.spacing(1),
  },
}));

export interface SidebarItemProps {
  label: string;
  icon: IconDefinition;
  active: boolean;
  onClick: () => void;
}
function SidebarItem(props: SidebarItemProps) {
  const styles = useStyles(props);
  const { label, onClick, icon } = props;
  return (
    <ListItem button className={styles.root} onClick={onClick}>
      <ListItemIcon className={styles.listIconLeft}>
        <FontAwesomeIcon size="lg" icon={icon} />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="subtitle1">{label}</Typography>
      </ListItemText>
      <ListItemIcon className={styles.listIconRight}>
        <FontAwesomeIcon icon={faChevronRight} />
      </ListItemIcon>
    </ListItem>
  );
}

export default SidebarItem;

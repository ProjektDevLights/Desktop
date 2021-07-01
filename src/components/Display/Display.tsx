import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
type Bounds = Electron.Display['bounds'];
export interface DisplayProps {
  display: Electron.Display;
  selected: boolean;
  onSelected: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: (props: DisplayProps) => props.display.bounds.width / 8,
    height: (props: DisplayProps) => props.display.bounds.height / 8,
    backgroundColor: (props: DisplayProps) =>
      props.selected ? theme.palette.info.light : theme.palette.info.light,
    display: 'flex',
    position: 'absolute',
    borderRadius: theme.shape.borderRadius,
    border: (props: DisplayProps) =>
      props.selected ? `4px solid ${theme.palette.grey[900]}` : 'none',
    top: (props: DisplayProps) => props.display.bounds.y / 8,
    left: (props: DisplayProps) => props.display.bounds.x / 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    transition: 'position, width, height .3s ease-in-out 0s',
    '&:hover': {
      backgroundColor: theme.palette.info.main,
    },
  },
  id: {
    fontWeight: 'bold',
  },
}));
export default function Display(props: DisplayProps) {
  const { display, onSelected } = props;
  const styles = useStyles(props);
  return (
    <div className={styles.root} onClick={onSelected}>
      <Typography variant="h3" className={styles.id}>
        {display.id}
      </Typography>
      <Typography variant="h6">{`${display.size.width}x${display.size.height}`}</Typography>
    </div>
  );
}

import { Card, Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';

export interface BasicCardProps {
  children?: React.ReactNode;
  className?: string;
  rotation?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    width: 'fit-content',
    borderRadius: 16,
    minWidth: '300px',
    minHeight: '200px',
    transform: (r) => `rotate(${r ?? 0}deg)`,
  },
}));
export default function BasicCard(props: BasicCardProps) {
  const { children, className, rotation } = props;

  const styles = useStyles(rotation);
  return (
    <Paper className={clsx(styles.root, className)} elevation={4}>
      {children}
    </Paper>
  );
}

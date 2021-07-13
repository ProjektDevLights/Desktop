import { Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';

export interface BasicCardProps {
  children?: React.ReactNode;
  className?: string;
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
  },
}));
export default function BasicCard(props: BasicCardProps) {
  const { children, className } = props;

  const styles = useStyles();
  return (
    <Paper className={clsx(styles.root, className)} elevation={4}>
      {children}
    </Paper>
  );
}

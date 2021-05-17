import { Theme, Typography, TypographyProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';

export interface ContrastTypographyProps extends TypographyProps {
  children: React.ReactNode;
  blend?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  filter: theme.customs.presets.filter,
  blend: theme.customs.presets.blend,
}));
export default function ContrastTypography(props: ContrastTypographyProps) {
  const { children, className, blend, ...rest } = props;

  const styles = useStyles();
  return (
    <Typography
      className={clsx(blend ? styles.blend : styles.filter, className)}
      {...rest}
    >
      {children}
    </Typography>
  );
}

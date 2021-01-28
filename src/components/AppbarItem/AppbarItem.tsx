import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: (props: AppbarItemProps) =>
      props.left || props.center ? theme.spacing(2) : undefined,
    marginRight: (props: AppbarItemProps) =>
      props.right || props.center ? theme.spacing(2) : undefined,
    alignItems: 'center',
    display: 'flex',
  },
}));
export interface AppbarItemProps {
  children: React.ReactNode;
  left?: boolean;
  center?: boolean;
  right?: boolean;
}

function AppbarItem(props: AppbarItemProps) {
  const styles = useStyles(props);
  const { children, ...rest } = props;
  return (
    <div className={styles.root} {...rest}>
      {children}
    </div>
  );
}

export default AppbarItem;

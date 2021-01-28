import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
  },
  base: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  left: {
    justifyContent: 'flex-start',
    order: 1,
  },
  center: {
    justifyContent: 'center',
    order: 2,
  },
  right: {
    justifyContent: 'flex-end',
    order: 3,
  },
});
export interface AppbarContainerProps {
  children: React.ReactNode;
}
function AppbarContainer(props: AppbarContainerProps) {
  const styles = useStyles();
  const { children } = props;
  return (
    <div className={styles.root}>
      <div className={clsx(styles.base, styles.left)}>
        {React.Children.map(children, (child: React.ReactNode) => {
          if (child?.props?.left) {
            return child;
          }
        })}
      </div>
      <div className={clsx(styles.base, styles.center)}>
        {React.Children.map(children, (child: React.ReactNode) => {
          if (child?.props?.center) {
            return child;
          }
        })}
      </div>{' '}
      <div className={clsx(styles.base, styles.right)}>
        {React.Children.map(children, (child: React.ReactNode) => {
          if (child?.props?.right) {
            return child;
          }
        })}
      </div>
    </div>
  );
}

export default AppbarContainer;

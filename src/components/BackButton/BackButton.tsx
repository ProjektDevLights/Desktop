import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    height: 60,
    width: 60,
  },
}));
export default function BackButton() {
  const history = useHistory();
  const styles = useStyles();
  return (
    <IconButton className={styles.button} onClick={history.goBack}>
      <FontAwesomeIcon color="#000" icon={faChevronLeft} />
    </IconButton>
  );
}

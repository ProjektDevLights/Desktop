import { faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import { useLight } from '../LightProvider';

export interface NameInputProps {
  value: string;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: 100,
  },
  typograhpy: {
    display: 'flex',
    position: 'relative',
    top: theme.spacing(3) - 2,
    // marginTop: theme.spacing(3) - 2,
  },
  editIcon: {
    marginLeft: theme.spacing(1),
    alignSelf: 'center',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.text.disabled,
    },
  },
  confirmIcon: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.text.disabled,
    },
  },
  input: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 300,
  },
  inputLabel: {
    fontSize: theme.typography.h5.fontSize,
  },
  textField: {
    [theme.breakpoints.down('lg')]: {
      width: '50%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '33%',
    },
  },
}));

export default function NameInput(props: NameInputProps) {
  const { value, className } = props;
  const styles = useStyles();
  const light = useLight();
  const theme: Theme = useTheme();
  const [name, setName] = React.useState<string>(value);
  const [edit, setEdit] = React.useState<boolean>(false);

  const confirm = () => {
    if (value !== name) {
      light.setName(name);
    }
    setEdit(false);
  };

  return (
    <div className={clsx(styles.container, className)}>
      {edit ? (
        <TextField
          autoFocus
          color="secondary"
          InputProps={{
            className: styles.input,
            endAdornment: (
              <InputAdornment position="end">
                <FontAwesomeIcon
                  className={styles.confirmIcon}
                  icon={faCheck}
                  onClick={confirm}
                />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            className: styles.inputLabel,
          }}
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.textField}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              confirm();
            }
          }}
        />
      ) : (
        <Typography className={styles.typograhpy} variant="h2">
          {name}
          <FontAwesomeIcon
            className={styles.editIcon}
            icon={faPen}
            size="xs"
            onClick={() => setEdit(true)}
          />
        </Typography>
      )}
    </div>
  );

  /* <InputBase
      endAdornment={
        <InputAdornment position="end">
          <FontAwesomeIcon icon={faEdit} />
        </InputAdornment>
      }
      className={styles.root}
      value={name}
      shrink
      onChange={(e) => setName(e.target.value)}
      classes={{ disabled: styles.disabled }}
    /> */
}

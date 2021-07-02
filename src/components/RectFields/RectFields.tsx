import {
  faRulerHorizontal,
  faRulerVertical,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  textFields: {
    alignSelf: 'flex-start',
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(1),
    width: 200,
  },
  adornmentIcon: {
    width: '20px !important',
  },
}));

export interface RectFieldsProps {
  value: Electron.Size;
  onChange: (newRect: Electron.Size) => void;
}
export default function RectFields(props: RectFieldsProps) {
  const { onChange, value } = props;
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);
  const styles = useStyles();
  return (
    <>
      <TextField
        value={value?.width}
        onChange={(e) => {
          setWidth(parseInt(e.target.value, 10));
          onChange({ width: parseInt(e.target.value, 10), height });
        }}
        className={styles.textFields}
        label="Width"
        helperText="Amount of LEDs in horizontal direction"
        InputProps={{
          type: 'number',
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon
                className={styles.adornmentIcon}
                icon={faRulerHorizontal}
              />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        value={value?.height}
        onChange={(e) => {
          setHeight(parseInt(e.target.value, 10));
          onChange({ height: parseInt(e.target.value, 10), width });
        }}
        helperText="Amount of LEDs in vertical direction"
        className={styles.textFields}
        label="Height"
        InputProps={{
          type: 'number',
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon
                className={styles.adornmentIcon}
                icon={faRulerVertical}
              />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}

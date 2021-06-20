import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  makeStyles,
  Slider,
  TextField,
  Theme,
  InputAdornment,
  Typography,
  SliderProps,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useLight } from '../LightProvider';

export interface TimeoutSliderProps extends SliderProps {
  rootStyles?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  rootVertical: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    maxWidth: '100%',
    alignItems: 'center',
    paddingLeft: (props: TimeoutSliderProps) =>
      props.orientation !== 'vertical' ? theme.spacing(3) : 0,
    paddingRight: (props: TimeoutSliderProps) =>
      props.orientation !== 'vertical' ? theme.spacing(3) : 0,
  },
  sliderContainerVertical: {
    height: 'inherit',
    width: 'inherit',
    margin: theme.spacing(2),
  },
  sliderVertical: {
    marginBottom: theme.spacing(3),
  },
  input: {
    '&::-webkit-outer-spin-button,::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
}));
export default function TimeoutSlider(props: TimeoutSliderProps) {
  const { orientation, rootStyles, title, ...rest } = props;
  const light = useLight();
  console.log(light.leds.timeout ?? 1000);
  const styles = useStyles(props);
  console.log(light.leds.timeout ?? 1000);
  const [timeout, setTimeout] = React.useState<number>(
    light.leds.timeout ?? 1000
  );
  const [validTimeout, setValidTimeout] = React.useState<number>(timeout);

  const commitTimeout = (tm: number) => {
    light
      .setTimeout(tm)
      ?.then(() => {
        setValidTimeout(tm);
        setTimeout(tm);
      })
      .catch(() => {
        setTimeout(validTimeout);
      });
  };

  const swapNumber = (val: number) => {
    return val * -1 + 3010;
  };

  const marks = [
    {
      value: 10,
      label: 'super-slow',
    },
    {
      value: 760,
      label: 'slow',
    },
    {
      value: 1510,
      label: 'medium',
    },
    {
      value: 2210,
      label: 'fast',
    },
    {
      value: 3000,
      label: 'super fast',
    },
  ];

  return (
    <div className={clsx(styles.rootVertical, rootStyles)}>
      {title && <Typography>Timeout</Typography>}
      <div className={styles.sliderContainerVertical}>
        <Slider
          value={swapNumber(timeout)}
          className={styles.sliderVertical}
          min={10}
          max={3000}
          onChange={(e, val) => setTimeout(swapNumber(val as number))}
          onChangeCommitted={(e, val) =>
            commitTimeout(swapNumber(val as number))
          }
          orientation={orientation}
          marks={marks}
          {...rest}
        />
      </div>
      <TextField
        InputProps={{
          className: styles.input,
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faStopwatch} />
            </InputAdornment>
          ),
        }}
        type="number"
        onChange={(e) => commitTimeout(parseInt(e.target.value))}
        value={timeout}
      />
    </div>
  );
}

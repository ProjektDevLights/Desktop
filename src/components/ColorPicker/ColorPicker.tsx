import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { CustomPicker, CustomPickerProps } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';
import tinycolor from 'tinycolor2';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
  },
  saturation: {
    width: 200,
    height: 150,
    position: 'relative',
  },
  hue: {
    width: 200,
    height: 20,
    position: 'relative',
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  },
  saturation_pointer: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    transform: 'translate(-8px, -8px)',
    borderColor: '#fff',
    borderWidth: 2,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 1.5px, rgba(0, 0, 0, 0.3) 0px 0px 1px 1px inset, rgba(0, 0, 0, 0.4) 0px 0px 1px 2px',
  },
  hue_pointer: {
    borderRadius: theme.shape.borderRadius,
    width: 12,
    height: 20,
    transform: 'translateX(-6px)',
    borderColor: '#fff',
    borderWidth: 2,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 1.5px, rgba(0, 0, 0, 0.3) 0px 0px 1px 1px inset, rgba(0, 0, 0, 0.4) 0px 0px 1px 2px',
  },
  textField: {
    width: '100%',
    maxWidth: 200,
  },
}));

export interface ColorPickerProps extends CustomPickerProps<undefined> {
  onTextChange?: (hex: string) => void;
  color: string;
  className?: string;
}
function ColorPicker(props: ColorPickerProps) {
  const { color, className, onTextChange, onChange } = props;
  const styles = useStyles();
  const [textValue, setTextValue] = React.useState<string>(color);

  React.useEffect(() => {
    setTextValue(color?.charAt(0) === '#' ? color.substr(1) : color);
  }, [color]);

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.saturation}>
        <Saturation
          pointer={() => <div className={styles.saturation_pointer} />}
          {...props}
        />
      </div>
      <div className={styles.hue}>
        <Hue
          pointer={() => <div className={styles.hue_pointer} />}
          {...props}
          direction="horizontal"
        />
      </div>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faHashtag} />
            </InputAdornment>
          ),
        }}
        className={styles.textField}
        value={textValue}
        onChange={(e) => {
          const c = tinycolor(e.target.value);
          if (c.isValid()) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onTextChange
              ? onTextChange(e.target.value)
              : onChange(
                  { hex: c.toHex(), hsl: c.toHsl(), rgb: c.toRgb() },
                  undefined
                );
          }
          setTextValue(e.target.value);
        }}
        color="secondary"
      />
    </div>
  );
}

export default CustomPicker(ColorPicker);

import { Slider, SliderProps, Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import React from 'react';
import { useLight } from '../LightProvider';
import { LightContextType } from '../LightProvider/LightProvider';

const BrightnessSlider = (props: SliderProps) => {
  const light: LightContextType = useLight();
  const theme: Theme = useTheme();
  const [value, setValue] = React.useState<number>(light.brightness);
  React.useEffect(() => {
    if (light.brightness !== value) {
      setValue(light.brightness);
    }
  }, [light]);
  return (
    <Slider
      value={value}
      color="secondary"
      valueLabelDisplay="auto"
      marks={[
        { value: 0, label: '0%' },
        { value: 128, label: '50%' },
        { value: 255, label: '100%' },
      ]}
      valueLabelFormat={(x: number) => `${Math.round((x / 255) * 100)}%`}
      defaultValue={light.brightness}
      disabled={!light.isOn}
      onMouseDown={(e: MouseEvent) => e.stopPropagation()}
      onClick={(e: MouseEvent) => e.stopPropagation()}
      onChange={(_e, val: number | number[]) => setValue(val as number)}
      onChangeCommitted={(event: React.ChangeEvent, value: number) => {
        light.setBrightness(value);
      }}
      style={{
        transition: theme.customs.colorTransition,
      }}
      min={1}
      max={255}
      {...props}
    />
  );
};

export default BrightnessSlider;

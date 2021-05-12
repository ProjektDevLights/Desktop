import { Slider, SliderProps } from '@material-ui/core';
import React from 'react';
import { useLight } from '../LightProvider';

const BrightnessSlider = (props: SliderProps) => {
  const light = useLight();
  return (
    <Slider
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
      onChangeCommitted={(event: React.ChangeEvent, value: number) => {
        light.setBrightness(value);
      }}
      min={1}
      max={255}
      {...props}
    />
  );
};

export default BrightnessSlider;

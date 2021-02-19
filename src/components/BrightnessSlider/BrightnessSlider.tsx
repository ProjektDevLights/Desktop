import { Slider, SliderProps } from '@material-ui/core';
import React from 'react';
import { useLight } from '../LightProvider';

export interface BrightnessSliderProps extends SliderProps {}

const BrightnessSlider = (props: BrightnessSliderProps) => {
  const light = useLight();
  console.log(light.brightness);
  return (
    <Slider
      color="secondary"
      valueLabelDisplay="auto"
      marks={[
        { value: 0, label: '0%' },
        { value: 128, label: '50%' },
        { value: 255, label: '100%' },
      ]}
      valueLabelFormat={(x: number) => Math.round((x / 255) * 100) + '%'}
      defaultValue={light.brightness}
      disabled={!light.isOn}
      onChangeCommitted={(event: object, value: number) =>
        light.setBrightness(value)
      }
      min={1}
      max={255}
      {...props}
    />
  );
};

export default BrightnessSlider;

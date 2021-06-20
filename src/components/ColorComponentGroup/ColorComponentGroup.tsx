import React from 'react';
import GradientComponent from '../ColorComponents/GradientComponent';
import PlainComponent from '../ColorComponents/PlainComponent';
import RunnerComponent from '../ColorComponents/RunnerComponent';
import { useLight } from '../LightProvider';
import TimeoutSlider from '../TimeoutSlider';

export interface ColorComponentGroupProps {}
export default function ColorComponentGroup(props: ColorComponentGroupProps) {
  const light = useLight();
  switch (light.leds.pattern) {
    case 'plain':
      return <PlainComponent />;
    case 'gradient':
      return <GradientComponent />;
    case 'runner':
      return <RunnerComponent />;
    case 'fading':
    case 'rainbow':
      return <TimeoutSlider />;
    default:
      return <div>not implemented</div>;
  }
}

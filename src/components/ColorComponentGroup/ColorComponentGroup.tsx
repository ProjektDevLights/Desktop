import React from 'react';
import GradientComponent from '../ColorComponents/GradientComponent';
import PlainComponent from '../ColorComponents/PlainComponent';
import RunnerComponent from '../ColorComponents/RunnerComponent';
import { useLight } from '../LightProvider';

export interface ColorComponentGroupProps {}
export default function ColorComponentGroup(props: ColorComponentGroupProps) {
  const light = useLight();
  console.log(light.leds.pattern);
  switch (light.leds.pattern) {
    case 'plain':
      return <PlainComponent />;
    case 'gradient':
      return <GradientComponent />;
    case 'runner':
      return <RunnerComponent />;
    default:
      return <div>not implemented</div>;
  }
}

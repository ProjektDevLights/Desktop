/* eslint-disable consistent-return */
import React from 'react';
import { Leds, Light, UserPattern } from '@devlights/types';
import { useLights } from '../LightsProvider';
import { AxiosReturn } from '../LightsProvider/LightsProvider';

export interface LightContextType extends Light {
  setCount: (count: number) => AxiosReturn<Light>;
  setBrightness: (brightness: number) => AxiosReturn<Light>;
  setName: (name: string) => AxiosReturn<Light>;
  setPattern: (pattern: UserPattern) => AxiosReturn<Light> | undefined;
  setColors: (colors: string[]) => AxiosReturn<Light> | undefined;
  setTimeout: (timeout: number) => AxiosReturn<Light> | undefined;
  setPowerStatus: (status: boolean) => AxiosReturn<Light>;
  toggleOn: () => AxiosReturn<Light>;
  fetch: () => void;
}
const defaults: LightContextType = {
  brightness: 255,
  count: 150,
  id: '0.0',
  isOn: true,
  leds: {
    colors: ['#000000'],
    pattern: 'plain',
  },
  name: 'default',
  setCount: () => (undefined as unknown) as AxiosReturn<Light>,
  setBrightness: () => (undefined as unknown) as AxiosReturn<Light>,
  setName: () => (undefined as unknown) as AxiosReturn<Light>,
  setPattern: () => undefined,
  setColors: () => undefined,
  setTimeout: () => undefined,
  toggleOn: () => (undefined as unknown) as AxiosReturn<Light>,
  fetch: () => undefined,
  setPowerStatus: () => (undefined as unknown) as AxiosReturn<Light>,
};
export const LightContext = React.createContext<LightContextType>(defaults);
export interface LightProviderProps {
  id: string;
  children: React.ReactNode;
}
const LightProvider = (props: LightProviderProps) => {
  const { id, children } = props;
  const lights = useLights();
  const setBrightness = (brightness: number): AxiosReturn<Light> => {
    return lights.setBrightness(id, brightness);
  };
  const setName = (name: string): AxiosReturn<Light> => {
    return lights.setName(id, name);
  };
  const setCount = (length: number): AxiosReturn<Light> => {
    return lights.setCount(id, length);
  };
  const toggleOn = (): AxiosReturn<Light> => {
    return lights.toggleOn(id);
  };
  const setPowerStatus = (status: boolean): AxiosReturn<Light> => {
    return lights.setPowerStatus(id, status);
  };
  const fetch = () => {
    return lights.fetch();
  };
  const setPattern = (pattern: UserPattern): AxiosReturn<Light> | undefined => {
    const oldLeds: Leds = lights.getWithId(id)?.leds as Leds;
    const firstColor = oldLeds.colors
      ? oldLeds.colors[0] ?? '#1de9b6'
      : '#1de9b6';
    let newLeds: Leds;
    switch (pattern) {
      case 'plain':
        newLeds = { colors: [firstColor], pattern: 'plain' };
        break;
      case 'gradient':
        newLeds = {
          colors: [firstColor, oldLeds?.colors[1] ?? firstColor],
          pattern: 'gradient',
        };
        break;
      case 'runner':
        newLeds = {
          colors: [firstColor],
          pattern: 'runner',
          timeout: oldLeds.timeout ?? 1000,
        };
        break;
      case 'rainbow':
      case 'fading':
        newLeds = {
          pattern,
          timeout: oldLeds.timeout ?? 1000,
        };
        break;
      default:
        return;
    }
    return lights.setLeds(id, newLeds);
  };
  const setColors = (colors: string[]): AxiosReturn<Light> | undefined => {
    const oldLeds: Leds = lights.getWithId(id)?.leds as Leds;
    let newLeds: Leds;
    switch (oldLeds.pattern) {
      case 'plain':
        newLeds = { colors: [colors[0]], pattern: 'plain' };
        break;
      case 'gradient':
        newLeds = { colors: [colors[0], colors[1]], pattern: 'gradient' };
        break;
      case 'runner':
        newLeds = {
          colors: [colors[0]],
          pattern: 'runner',
          timeout: oldLeds.timeout,
        };
        break;
      default:
        return;
    }
    return lights.setLeds(id, newLeds);
  };
  const setTimeout = (timeout: number): AxiosReturn<Light> | undefined => {
    const oldLeds: Leds = lights.getWithId(id)?.leds as Leds;
    const firstColor = oldLeds.colors
      ? oldLeds.colors[0] ?? '#1de9b6'
      : '#1de9b6';

    let newLeds: Leds;
    switch (oldLeds.pattern) {
      case 'runner':
        newLeds = { colors: [firstColor], pattern: 'runner', timeout };
        break;
      case 'fading':
      case 'rainbow':
        newLeds = { colors: [], pattern: oldLeds.pattern, timeout };
        break;
      case 'plain':
      case 'gradient':
      default:
        return;
    }
    return lights.setLeds(id, newLeds);
  };
  return (
    <LightContext.Provider
      value={{
        ...(lights.getWithId(id) as Light),
        fetch,
        setCount,
        setPowerStatus,
        toggleOn,
        setBrightness,
        setName,
        setPattern,
        setColors,
        setTimeout,
      }}
    >
      {children}
    </LightContext.Provider>
  );
};

export default LightProvider;

/* eslint-disable consistent-return */
import React from 'react';
import { Leds, Light, UserPattern } from '@devlights/types';
import { useLights } from '../LightsProvider';
import { AxiosReturn } from '../LightsProvider/LightsProvider';
import { light } from '@material-ui/core/styles/createPalette';
import { map, max } from 'lodash';

export interface LightContextType extends Light {
  fetch: () => void;
  setCount: (count: number) => AxiosReturn<Light>;
  setBrightness: (brightness: number) => AxiosReturn<Light>;
  setName: (name: string) => AxiosReturn<Light>;
  setPattern: (pattern: UserPattern) => AxiosReturn<Light> | undefined;
  setColors: (colors: string[]) => AxiosReturn<Light> | undefined;
  setTimeout: (timeout: number) => AxiosReturn<Light> | undefined;
  setPowerStatus: (status: boolean) => AxiosReturn<Light>;
  toggleOn: () => AxiosReturn<Light>;
  addTag: (tag: string) => AxiosReturn<Light>;
  removeTag: (tag: string) => AxiosReturn<Light>;
  setPosition: (pos: number) => AxiosReturn<Light>;
  moveToTop: () => AxiosReturn<Light>;
  moveToBottom: () => AxiosReturn<Light>;
  moveUp: () => AxiosReturn<Light>;
  moveDown: () => AxiosReturn<Light>;
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
  position: 0,
  fetch: () => undefined,
  setCount: () => (undefined as unknown) as AxiosReturn<Light>,
  setBrightness: () => (undefined as unknown) as AxiosReturn<Light>,
  setName: () => (undefined as unknown) as AxiosReturn<Light>,
  setPattern: () => undefined,
  setColors: () => undefined,
  setTimeout: () => undefined,
  toggleOn: () => (undefined as unknown) as AxiosReturn<Light>,
  setPowerStatus: () => (undefined as unknown) as AxiosReturn<Light>,
  addTag: () => (undefined as unknown) as AxiosReturn<Light>,
  removeTag: () => (undefined as unknown) as AxiosReturn<Light>,
  setPosition: () => (undefined as unknown) as AxiosReturn<Light>,
  moveDown: () => (undefined as unknown) as AxiosReturn<Light>,
  moveToBottom: () => (undefined as unknown) as AxiosReturn<Light>,
  moveToTop: () => (undefined as unknown) as AxiosReturn<Light>,
  moveUp: () => (undefined as unknown) as AxiosReturn<Light>,
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

  const addTag = (tag: string): AxiosReturn<Light> => {
    return lights.addTag(id, tag);
  };

  const removeTag = (tag: string): AxiosReturn<Light> => {
    return lights.removeTag(id, tag);
  };

  const setPosition = (pos: number): AxiosReturn<Light> => {
    return lights.setPosition(id, pos);
  };

  const moveToBottom = (): AxiosReturn<Light> => {
    return setPosition(max(map(lights.lights, 'position')) + 1 ?? 1000);
  };

  const moveToTop = (): AxiosReturn<Light> => {
    return setPosition(0);
  };

  const moveDown = (): AxiosReturn<Light> => {
    console.log(lights.getWithId(id)?.position + 1);
    return setPosition(lights.getWithId(id)?.position + 1 ?? 0);
  };

  const moveUp = (): AxiosReturn<Light> => {
    return setPosition(lights.getWithId(id)?.position - 1 ?? 0);
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
        addTag,
        removeTag,
        setPosition,
        moveDown,
        moveToBottom,
        moveToTop,
        moveUp,
      }}
    >
      {children}
    </LightContext.Provider>
  );
};

export default LightProvider;

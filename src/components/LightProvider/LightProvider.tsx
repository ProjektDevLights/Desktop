import { Light } from '@devlights/types';
import React from 'react';
import { useLights } from '../LightsProvider';
import { AxiosReturn } from '../LightsProvider/LightsProvider';

export interface LightContextType extends Light {
  setBrightness: (brightness: number) => AxiosReturn<Light>;
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
  setBrightness: () => (undefined as unknown) as AxiosReturn<Light>,
  toggleOn: () => (undefined as unknown) as AxiosReturn<Light>,
  fetch: () => undefined,
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
  const toggleOn = (): AxiosReturn<Light> => {
    return lights.toggleOn(id);
  };
  const fetch = () => {
    return lights.fetch();
  };
  return (
    <LightContext.Provider
      value={{
        ...(lights.getWithId(id) as Light),
        fetch,
        toggleOn,
        setBrightness,
      }}
    >
      {children}
    </LightContext.Provider>
  );
};

export default LightProvider;

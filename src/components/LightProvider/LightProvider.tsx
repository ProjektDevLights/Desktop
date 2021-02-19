import { Light } from '@devlights/types';
import React from 'react';
import { useLights } from '../LightsProvider';

export interface LightContextType extends Light {
  setBrightness: (brightness: number) => void;
  toggleOn: () => void;
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
  setBrightness: () => undefined,
  toggleOn: () => undefined,
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
  const setBrightness = (brightness: number) => {
    lights.setBrightness(id, brightness);
  };
  const toggleOn = () => {
    lights.toggleOn(id);
  };
  const fetch = () => {
    lights.fetch();
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

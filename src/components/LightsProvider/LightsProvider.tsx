import { Light } from '@devlights/types';
import Response from '@devlights/types/src/Response';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { findIndex } from "lodash";
import React from 'react';


export interface LightsContextType {
  lights: Light[];
  fetch: () => void;
  toggleOn: (id: string) => void;
  getWithId: (id: string) => Light |undefined;
}

const defaults: LightsContextType = {
  lights: [],
  fetch: () => {},
  toggleOn: () => {},
  getWithId: () => undefined,
}

export interface LightsProviderProps{
  children: React.ReactNode;
}

export const LightsContext = React.createContext<LightsContextType>(defaults);
export default function LightsProvider(props: LightsProviderProps) {
  const {children} = props;

  const [lights, setLights] = React.useState<Light[]>([]);

  const fetch = () => {
    console.log("fetch")
    axios.get('http://devlight.local/lights').then((response: AxiosResponse<Response<Light[]>>) => {
      setLights(response.data.object);
    });
  };

  const getWithId = (id: string): Light | undefined => {
    return find(lights, (light: Light) => light.id === id);
  }

  const toggleOn = (id: string) => {
    const lightsCopy = [...lights];
    const lightIndex: number = findIndex(lightsCopy, (light: Light) => light.id === id);
    const light: Light =  lightsCopy[lightIndex];
    axios.patch(`http://devlight.local/lights/${id}/${light?.isOn ? "off" : "on"}`)
    .then((response: AxiosResponse<Response<Light>>) => {
      light ? light.isOn = response.data.object.isOn : undefined;
      lightsCopy[lightIndex] = light;
      setLights(lightsCopy);

    }).catch((err: AxiosError) => {
      console.error(err);
    })
  }

  React.useEffect(() => {
    fetch();
  }, [])


  return (
    <LightsContext.Provider value={{lights: lights,fetch: fetch, toggleOn: toggleOn, getWithId: getWithId}}>
      {children}
    </LightsContext.Provider>
  )
}

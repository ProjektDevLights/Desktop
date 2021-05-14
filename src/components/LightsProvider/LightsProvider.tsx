import { Light } from '@devlights/types';
import Response from '@devlights/types/src/Response';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { find, findIndex, merge } from 'lodash';
import React from 'react';
import { SnackbarContextType } from '../SnackbarProvider/SnackbarProvider';
import useSnackbar from '../SnackbarProvider/useSnackbar';

export type AxiosReturn<T> = Promise<AxiosResponse<Response<T>>>;
export interface LightsContextType {
  lights: Light[];
  fetch: () => void;
  toggleOn: (id: string) => AxiosReturn<Light>;
  getWithId: (id: string) => Light | undefined;
  setBrightness: (id: string, brightness: number) => AxiosReturn<Light>;
}

const defaults: LightsContextType = {
  lights: [],
  fetch: () => {},
  toggleOn: () => (undefined as unknown) as AxiosReturn<Light>,
  setBrightness: () => (undefined as unknown) as AxiosReturn<Light>,
  getWithId: () => undefined,
};

export interface LightsProviderProps {
  children: React.ReactNode;
}

export const LightsContext = React.createContext<LightsContextType>(defaults);
export default function LightsProvider(props: LightsProviderProps) {
  const { children } = props;

  const [lights, setLights] = React.useState<Light[]>([]);

  const snackbarController: SnackbarContextType = useSnackbar();

  const updateLight = (id: string, data: Partial<Light>) => {
    const lightsCopy = [...lights];
    const lightIndex: number = findIndex(
      lightsCopy,
      (light: Light) => light.id === id
    );
    lightsCopy[lightIndex] = merge(lightsCopy[lightIndex], data);
    setLights(lightsCopy);
  };
  const fetch = () => {
    axios.get(`/lights`).then((response: AxiosResponse<Response<Light[]>>) => {
      setLights(response.data.object);
    });
  };

  const getWithId = (id: string): Light | undefined => {
    return find(lights, (light: Light) => light.id === id);
  };

  const setBrightness = (
    id: string,
    brightness: number
  ): AxiosReturn<Light> => {
    const ax: AxiosReturn<Light> = axios.patch(`/lights/${id}/brightness`, {
      brightness,
    });
    ax.then((response: AxiosResponse<Response<Light>>) => {
      snackbarController.showResponse(response);
      updateLight(id, {
        brightness:
          response.data?.object?.brightness ?? getWithId(id)?.brightness,
      });
    });
    ax.catch((err: AxiosError) => {
      snackbarController.showResponse(err.response);
    });
    return ax;
  };

  const toggleOn = (id: string): AxiosReturn<Light> => {
    const light: Light | undefined = getWithId(id);
    const ax: AxiosReturn<Light> = axios.patch(
      `/lights/${id}/${light?.isOn ? 'off' : 'on'}`
    );
    ax.then((response: AxiosResponse<Response<Light>>) => {
      snackbarController.showResponse(response);
      updateLight(id, { isOn: response.data.object.isOn });
    });
    ax.catch((err: AxiosError) => {
      snackbarController.showResponse(err.response);
    });
    return ax;
  };

  React.useEffect(() => {
    fetch();
  }, []);

  return (
    <LightsContext.Provider
      value={{
        lights,
        fetch,
        toggleOn,
        getWithId,
        setBrightness,
      }}
    >
      {children}
    </LightsContext.Provider>
  );
}

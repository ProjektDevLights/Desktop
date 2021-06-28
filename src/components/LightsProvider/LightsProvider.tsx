import { Alarm, Leds, Light } from '@devlights/types';
import Response from '@devlights/types/src/Response';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { assign, find, findIndex } from 'lodash';
import React from 'react';
import { SnackbarContextType } from '../SnackbarProvider/SnackbarProvider';
import useSnackbar from '../SnackbarProvider/useSnackbar';

export type AxiosReturn<T> = Promise<AxiosResponse<Response<T>>>;
export interface LightsContextType {
  lights: Light[];
  fetch: () => void;
  getWithId: (id: string) => Light | undefined;
  setCount: (id: string, count: number) => AxiosReturn<Light>;
  setPowerStatus: (id: string, status: boolean) => AxiosReturn<Light>;
  toggleOn: (id: string) => AxiosReturn<Light>;
  setBrightness: (id: string, brightness: number) => AxiosReturn<Light>;
  setName: (id: string, name: string) => AxiosReturn<Light>;
  setLeds: (id: string, leds: Leds) => AxiosReturn<Light>;
  addTag: (id: string, tag: string) => AxiosReturn<Light>;
  removeTag: (id: string, tag: string) => AxiosReturn<Light>;
  setPosition: (id: string, pos: number) => AxiosReturn<Light>;
  getAlarms: (id: string) => Promise<Alarm[]>;
}

const defaults: LightsContextType = {
  lights: [],
  fetch: () => {},
  getWithId: () => undefined,
  setCount: () => (undefined as unknown) as AxiosReturn<Light>,
  setPowerStatus: () => (undefined as unknown) as AxiosReturn<Light>,
  toggleOn: () => (undefined as unknown) as AxiosReturn<Light>,
  setBrightness: () => (undefined as unknown) as AxiosReturn<Light>,
  setName: () => (undefined as unknown) as AxiosReturn<Light>,
  setLeds: () => (undefined as unknown) as AxiosReturn<Light>,
  addTag: () => (undefined as unknown) as AxiosReturn<Light>,
  removeTag: () => (undefined as unknown) as AxiosReturn<Light>,
  setPosition: () => (undefined as unknown) as AxiosReturn<Light>,
  getAlarms: () => (undefined as unknown) as Promise<Alarm[]>,
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
    lightsCopy[lightIndex] = assign(lightsCopy[lightIndex], data);
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

  const setCount = (id: string, count: number): AxiosReturn<Light> => {
    const ax: AxiosReturn<Light> = axios.patch(`/lights/${id}/count`, {
      count,
    });
    ax.then((response: AxiosResponse<Response<Light>>) => {
      snackbarController.showResponse(response);
      updateLight(id, {
        count: response.data?.object?.count ?? getWithId(id)?.count,
      });
    });
    ax.catch((err: AxiosError) => {
      snackbarController.showResponse(err.response);
    });
    return ax;
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

  const setName = (id: string, name: string): AxiosReturn<Light> => {
    const ax: AxiosReturn<Light> = axios.patch(`/lights/${id}/update`, {
      name,
    });
    ax.then((response: AxiosResponse<Response<Light>>) => {
      snackbarController.showResponse(response);
      updateLight(id, {
        name: response.data?.object?.name ?? getWithId(id)?.name,
      });
    });
    ax.catch((err: AxiosError) => {
      snackbarController.showResponse(err.response);
    });
    return ax;
  };

  const setLeds = (id: string, leds: Leds): AxiosReturn<Light> => {
    const ax: AxiosReturn<Light> = axios.patch(`/lights/${id}/color`, leds);
    ax.then((response: AxiosResponse<Response<Light>>) => {
      snackbarController.showResponse(response);
      updateLight(id, {
        leds: response.data?.object?.leds ?? getWithId(id)?.leds,
      });
    });
    ax.catch((err: AxiosError) => {
      snackbarController.showResponse(err.response);
    });
    return ax;
  };

  const setPowerStatus = (id: string, status: boolean): AxiosReturn<Light> => {
    const ax: AxiosReturn<Light> = axios.patch(
      `/lights/${id}/${status ? 'on' : 'off'}`
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

  const toggleOn = (id: string): AxiosReturn<Light> => {
    const light: Light | undefined = getWithId(id);
    return setPowerStatus(id, light?.isOn ?? false);
  };

  const addTag = (id: string, tag: string): AxiosReturn<Light> => {
    const ax: AxiosReturn<Light> = axios.put(`/lights/${id}/tags`, {
      tags: [tag],
    });
    ax.then((response: AxiosResponse<Response<Light>>) => {
      snackbarController.showResponse(response);
      updateLight(id, { tags: response.data.object.tags });
    });
    ax.catch((err: AxiosError) => {
      snackbarController.showResponse(err.response);
    });
    return ax;
  };

  const removeTag = (id: string, tag: string): AxiosReturn<Light> => {
    const ax: AxiosReturn<Light> = axios.delete(`/lights/${id}/tags`, {
      data: { tags: [tag] },
    });
    ax.then((response: AxiosResponse<Response<Light>>) => {
      snackbarController.showResponse(response);
      updateLight(id, { tags: response.data.object.tags });
    });
    ax.catch((err: AxiosError) => {
      snackbarController.showResponse(err.response);
    });
    return ax;
  };

  const setPosition = (id: string, pos: number): AxiosReturn<Light> => {
    const ax: AxiosReturn<Light> = axios.patch(`/lights/${id}/position`, {
      position: pos,
    });
    ax.then((response: AxiosResponse<Response<Light>>) => {
      snackbarController.showResponse(response);
      updateLight(id, { position: response.data.object.position });
    });
    ax.catch((err: AxiosError) => {
      snackbarController.showResponse(err.response);
    });
    return ax;
  };

  const getAlarms = async (id: string): Promise<Alarm[]> => {
    const ax: AxiosReturn<Alarm[]> = axios.get(`/lights/${id}/alarms`);
    ax.catch((err: AxiosError) => {
      snackbarController.showResponse(err.response);
    });
    return (await ax).data.object;
  };
  React.useEffect(() => {
    fetch();
  }, []);

  return (
    <LightsContext.Provider
      value={{
        lights,
        fetch,
        setCount,
        setPowerStatus,
        toggleOn,
        getWithId,
        setBrightness,
        setName,
        setLeds,
        addTag,
        removeTag,
        setPosition,
        getAlarms,
      }}
    >
      {children}
    </LightsContext.Provider>
  );
}

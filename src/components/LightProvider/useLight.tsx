import React from 'react';
import { LightContext, LightContextType } from './LightProvider';

const useLight = (): React.ContextType<typeof LightContext> => {
  return React.useContext<LightContextType>(LightContext);
};

export default useLight;

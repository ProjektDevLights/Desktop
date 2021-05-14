import React from 'react';
import { SnackbarContext, SnackbarContextType } from './SnackbarProvider';

const useSnackbar = (): React.ContextType<typeof SnackbarContext> => {
  return React.useContext<SnackbarContextType>(SnackbarContext);
};

export default useSnackbar;

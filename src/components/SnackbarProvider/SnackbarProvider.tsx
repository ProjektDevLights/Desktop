import Response from '@devlights/types/src/Response';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faExclamation,
  faExclamationTriangle,
  faInfo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Snackbar, SnackbarCloseReason } from '@material-ui/core';
import { Alert, Color } from '@material-ui/lab';
import { AxiosResponse } from 'axios';
import React from 'react';

export interface SnackbarProviderProps {
  children: React.ReactNode;
}
export interface SnackbarContextType {
  forceClose: () => void;
  show: (message: string, sev?: Color) => void;
  showResponse: (res?: AxiosResponse) => void;
}
const defaults: SnackbarContextType = {
  show: () => undefined,
  showResponse: () => undefined,
  forceClose: () => undefined,
};
export const SnackbarContext = React.createContext<SnackbarContextType>(
  defaults
);
export default function SnackbarProvider(props: SnackbarProviderProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [severity, setSeverity] = React.useState<Color>('info');

  const snackbarRef = React.useRef();

  const forceClose = () => {
    setOpen(false);
  };
  const show = (msg: string, sev?: Color) => {
    setMessage(msg);
    setSeverity(sev ?? 'info');
    setOpen(true);
  };

  const showResponse = (res?: AxiosResponse<Response<unknown>>) => {
    const status = res?.status ?? 500;
    if (status === 304) {
      setMessage('Nothing Changed!');
    } else if (Array.isArray(res?.data.message)) {
      setMessage(res?.data?.message[0] ?? 'Something went wrong');
    } else {
      setMessage(res?.data?.message ?? 'Something went wrong');
    }
    switch (true) {
      case status && status < 100:
        setSeverity('info');
        break;
      case status >= 200 && status < 300:
        setSeverity('success');
        break;
      case status >= 300 && status < 400:
        setSeverity('info');
        break;
      case status >= 400 && status < 500:
        setSeverity('error');
        break;
      case status >= 500:
        setSeverity('error');
        break;
      default:
        setSeverity('error');
        break;
    }
    setOpen(true);
  };

  const handleClose = (
    _event: React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const Icon = (icon: IconProp) => (
    <FontAwesomeIcon style={{ alignSelf: 'center' }} size="xs" icon={icon} />
  );

  return (
    <SnackbarContext.Provider
      value={{
        show,
        showResponse,
        forceClose,
      }}
    >
      {props.children}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        ref={snackbarRef}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          action={<></>}
          iconMapping={{
            error: Icon(faExclamation),
            info: Icon(faInfo),
            warning: Icon(faExclamationTriangle),
            success: Icon(faCheck),
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

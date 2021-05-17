import { CssBaseline } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import config from '../config.json';
import Container from './Container';
import { LightsProvider } from './LightsProvider';
import SnackbarProvider from './SnackbarProvider';
import ThemeProvider from './ThemeProvider';
import ThemeSwitchProvider from './ThemeSwitchProvider';

axios.defaults.baseURL = config.baseUrl;
axios.defaults.validateStatus = (status: number) => {
  return status >= 200 && status < 400;
};
export default function App() {
  return (
    <ThemeSwitchProvider>
      <ThemeProvider>
        <CssBaseline />
        <SnackbarProvider>
          <LightsProvider>
            <Router initialEntries={['/home']}>
              <Container />
            </Router>
          </LightsProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </ThemeSwitchProvider>
  );
}

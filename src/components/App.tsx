import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Container from './Container';
import { LightsProvider } from './LightsProvider';
import ThemeProvider from './ThemeProvider';
import ThemeSwitchProvider from './ThemeSwitchProvider';

export default function App() {
  return (
    <ThemeSwitchProvider>
      <ThemeProvider>
        <LightsProvider>
          <Router initialEntries={['/home']}>
            <Container />
          </Router>
        </LightsProvider>
      </ThemeProvider>
    </ThemeSwitchProvider>
  );
}

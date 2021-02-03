import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Container from './Container';
import ThemeProvider from './ThemeProvider';
import ThemeSwitchProvider from './ThemeSwitchProvider';

export default function App() {
  return (
    <ThemeSwitchProvider>
      <ThemeProvider>
        <Router initialEntries={['/home']}>
          <Container />
        </Router>
      </ThemeProvider>
    </ThemeSwitchProvider>
  );
}

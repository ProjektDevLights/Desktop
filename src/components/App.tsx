import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Main';
import ThemeProvider from './ThemeProvider';
import ThemeSwitchProvider from './ThemeSwitchProvider';

export default function App() {
  return (
    <ThemeSwitchProvider>
      <ThemeProvider>
        <Router>
          <Switch>
            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </ThemeProvider>
    </ThemeSwitchProvider>
  );
}

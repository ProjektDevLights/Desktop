import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Main';
import ThemeProvider from './ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

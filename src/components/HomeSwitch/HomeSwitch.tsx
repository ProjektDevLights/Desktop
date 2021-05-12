import React from 'react';
import { Route, RouteChildrenProps, Switch } from 'react-router-dom';
import Home from '../Home/Home';

const HomeSwitch = () => {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route path="/home/light/:light">
        {(props: RouteChildrenProps) => {
          return <div>light screen</div>;
        }}
      </Route>
    </Switch>
  );
};

export default HomeSwitch;

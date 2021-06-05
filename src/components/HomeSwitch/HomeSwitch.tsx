import React from 'react';
import {
  Route,
  RouteChildrenProps,
  Switch,
  useHistory,
} from 'react-router-dom';
import Home from '../Home/Home';
import { LightProvider } from '../LightProvider';
import LightScreen from '../LightScreen/LightScreen';

const HomeSwitch = () => {
  const history = useHistory();
  return (
    <Switch>
      <Route exact path="/home/light/:light">
        {(props: RouteChildrenProps) => {
          return (
            <LightProvider id={props.match?.params.light}>
              <LightScreen />
            </LightProvider>
          );
        }}
      </Route>
      <Route exact path="/home" component={Home} />
    </Switch>
  );
};

export default HomeSwitch;

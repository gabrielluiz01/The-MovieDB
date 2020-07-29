// Libs
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

// Components
import Layout from './Layout';
import Series from './components/Series';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Series}/>
    </Switch>
  </BrowserRouter>
)

export default Routes;
// Libs
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

// Components
import Layout from './Layout';
import Movies from './components/Movies';
import Series from './components/Series';
import DetailsMovies from './components/DetailsMovies';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Movies}/>
      <Route path="details-movies" component={DetailsMovies}/>      
      <Route path="/series" component={Series}/>
    </Switch>
  </BrowserRouter>
)

export default Routes;
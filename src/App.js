// Libs
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Routes
import Routes from './routes';

import Layout from './Layout';
import Series from './components/Series';
import Movies from './components/Movies';


const App = () => {
  return (
    <div className="App">
      {/* <Series /> */}
      <Movies />
    </div>
  );
}

export default App;

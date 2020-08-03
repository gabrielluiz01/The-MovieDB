// Libs
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';



import Layout from './Layout';
import Series from './components/Series';
import Movies from './components/Movies';
import Sidebar from './components/Sidebar';


const App = () => {
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;

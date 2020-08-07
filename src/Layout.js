// Libs
import React, {Component} from 'react';
import styled from 'styled-components';

// Routes
import Routes from './routes';

// Components
import Sidebar from './components/Sidebar';
import Movies from './components/Movies';
import Series from './components/Series';

const Container = styled.div`
  width: 100%;
  display: flex;
`;

class Layout extends Component{

  state = {
    currentScreen: 'series',
  }

  handleScreen = () => {
    switch(this.state.currentScreen){
      case 'movies':
        return <Movies changeScreen={this.changeScreen}/>
      case 'series':
        return <Series changeScreen={this.changeScreen}/>
    }
  }

  changeScreen = (screen) => {
    this.setState({
      currentScreen: screen,
    })
  }


  render() {
    return(
      <Container>
        <Sidebar changeScreen={this.changeScreen}/>
        {this.handleScreen()}
      </Container>
    );
  }
}
export default Layout;
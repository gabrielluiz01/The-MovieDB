// Libs
import React, {Component} from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

// Images
import Logo from '../assets/logo.png';

const Container = styled.div`
  width: 25%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #141414;
  border-right: .5px solid #BCBCBC70;
`;

const ImageLogo = styled.img`
  width: 200px;
  align-self: center;
`;

const Content = styled.div`
  margin-top: 2rem;
`;

const Options = styled.p`
  font-size: 1rem;
  color: #FFF;
  cursor: pointer;
  margin: 2rem 0;

  :hover{
    opacity: 0.8;
  }
`;

const BoxOption = styled.span`

`;

const SubOptions = styled.p`
  color: #FFF;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-family: Open Sans, Light;
  margin: 1rem 0;
  cursor: pointer;
  padding: 1rem;
  border-bottom: 1px solid #BCBCBC60;

  :hover{
    background: #FFFFFF40;
  }
`;

class Sidebar extends Component{

  state = {
    isOpenMovies: false,
    isOpenSeries: false,
    moviesOptions: ['top rated', 'now playing', 'upcoming', 'popular'],
    seriesOptions: ['airing today', 'on the air', 'top_rated', 'popular'],
  }

  openMovies = (ev) => {
    ev.stopPropagation();
    this.setState({
      isOpenMovies: !this.state.isOpenMovies,
      isOpenSeries: false,
    })
  }

  handleMovie = (ev) => {
    ev.stopPropagation();
  }

  openSeries = (ev) => {
    ev.stopPropagation();
    this.setState({
      isOpenSeries: !this.state.isOpenSeries,
      isOpenMovies: false,
    })
  }

  render(){
    return(
      <Container onClick={() => this.setState({isOpenMovies: false, isOpenSeries: false,})}>
        <ImageLogo src={Logo}/>
        <Content>
          <BoxOption>
            <Options onClick={this.openMovies}>Filmes</Options>
            {this.state.isOpenMovies && (
              this.state.moviesOptions.map(data =>(
                <SubOptions onClick={() => this.props.changeScreen('movies')}>{data}</SubOptions>
              ))
            )}
          </BoxOption>
          <BoxOption>
            <Options onClick={this.openSeries}>Séries</Options>
            {this.state.isOpenSeries && (
              this.state.seriesOptions.map(data =>(
                <SubOptions onClick={() => this.props.changeScreen('series')}>
                  {data}
                </SubOptions>
              ))
            )}
          </BoxOption>
        </Content>
      </Container>
    );
  }
}

export default Sidebar;
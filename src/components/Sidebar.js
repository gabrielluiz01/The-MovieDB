// Libs
import React, {Component} from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

// Images
import Logo from '../assets/logo.png';

import { getMoviesThunk, getSeriesThunk } from '../dataflow/thunks/app-thunk';

const mapDispatchToProps = dispatch => ({
  getMoviesThunk: info => dispatch(getMoviesThunk(info)),
  getSeriesThunk: info => dispatch(getSeriesThunk(info)),
})

const Container = styled.div`
  width: 20%;
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
    seriesOptions: ['airing today', 'on the air', 'top rated', 'popular'],
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

  handleClickMovies = (data) => {
    switch (data) {
      case 'top rated':
        return this.props.getMoviesThunk('top_rated') && this.props.changeScreen('movies')
      case 'now playing':
        return this.props.getMoviesThunk('now_playing') && this.props.changeScreen('movies')
      case 'upcoming':
        return this.props.getMoviesThunk('upcoming') && this.props.changeScreen('movies')
      case 'popular':
        return this.props.getMoviesThunk('popular') && this.props.changeScreen('movies')
      default: 
        return null
    }
  }

  handleClickSeries = (data) => {
    switch (data) {
      case 'airing today':
        return this.props.getSeriesThunk('airing_today') && this.props.changeScreen('series')
      case 'on the air':
        return this.props.getSeriesThunk('on_the_air') && this.props.changeScreen('series')
      case 'top rated':
        return this.props.getSeriesThunk('top_rated') && this.props.changeScreen('series')
      case 'popular':
        return this.props.getSeriesThunk('popular') && this.props.changeScreen('series')
      default: 
        return null
    }
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
                <SubOptions onClick={() => this.handleClickMovies(data)}>{data}</SubOptions>
              ))
            )}
          </BoxOption>
          <BoxOption>
            <Options onClick={this.openSeries}>Séries</Options>
            {this.state.isOpenSeries && (
              this.state.seriesOptions.map(data =>(
                <SubOptions onClick={() => this.handleClickSeries(data)}>
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

export default connect(null, mapDispatchToProps) (Sidebar);
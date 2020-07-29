// Libs
import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Images
import StarIcon from '../assets/star.png';

// Redux
import { getMoviesThunk } from '../dataflow/thunks/app-thunk'; 

// Map State
const mapStateToProps = state => ({
  movies: state.movies.movies,
});

// Map Dispatch
const mapDispatchToProps = dispatch => ({
  getMoviesThunk: info => dispatch(getMoviesThunk(info)),
});

// Styled 
const Content = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #007EBD;
`;

const Container = styled.div`
  width: 100%;
  height: 80vh;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  background: #007EBD;
  padding: 1rem;

  ::-webkit-scrollbar{
    width: 8px;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb{
    background: red;
    width: 6px;
    background: #BCBCBC;
    border-radius: 6px;
  }
`;

const ContainerTitle = styled.h1`
  margin-left: 1rem;
`;

const BoxMovies = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 14px #FBAA30;
  margin-top: 2rem;
  position: relative;
`;

const ImageMovie = styled.img`
  width: 200px;
  cursor: pointer;
  position: relative;

  ::before{
    content: '';
    background: #000;
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

const TitleMovie = styled.h1`
  width: 100%;
  margin-left: .5rem;
  font-size: 1.3rem;
`;

const Synopsis = styled.p`
  width: 95%;
  height: 4.2rem;
  align-self: center;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const BoxAverage = styled.span`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  margin-top: .5rem;
`;

const AverageVote = styled.p`
  position: absolute;
  right: 1.2rem;
  bottom: 3rem;
  font-size: 1rem;
  font-weight: bold;
`;

const Star = styled.img`
  width: 60px;
  position: relative;
  bottom: 2rem;
`;

class Layout extends Component{

  state = {
    load: false,
  }

  componentDidMount() {
    this.props.getMoviesThunk();
  }

  loadMovies = () => {
    this.setState({
      load: true,
    })
  }

  render() {
    return (
      <Content>
        <ContainerTitle>Filmes</ContainerTitle>
        <Container load={this.state.load}>
          {this.props.movies.map(item => (
            <BoxMovies key={item.id}>
              <ImageMovie src={item.poster_path} />
              <BoxAverage>
                <Star src={StarIcon}/>
                <AverageVote>{item.vote_average}</AverageVote>
              </BoxAverage>
              <TitleMovie>{item.title}</TitleMovie>
              {/* <Synopsis>{item.overview}</Synopsis> */}
            </BoxMovies>
          ))}
        </Container>
      </Content>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Layout);
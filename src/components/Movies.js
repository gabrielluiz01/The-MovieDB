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
  background: #141414;
  padding-left: 2rem;
  padding-bottom: 1rem;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  background: #141414;
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
  color: #FFF;
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
  color: #FFF;
`;

const Synopsis = styled.p`
  width: 95%;
  height: 4.2rem;
  align-self: center;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #FFF;
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


const Form = styled.form`
  width: auto;
  padding: 1rem;
`;

const InputFilter = styled.input`
  width: 13rem;
  height: 2rem;
  border: 1px solid #BCBCBC;
  margin-right: 1rem;
  padding: 0 1rem;
  border-radius: 6px;
`;

const ButtonFilter = styled.button`
  height: 2rem;
  background: #C10A13;
  border-radius: 6px;
  border: none;
  padding: 0 0.5rem;
  color: #FFF;
  cursor: pointer;
  text-transform: uppercase;
  text-align: center;

  :hover{
    opacity:0.7;
  }
`;

class Layout extends Component{

  state = {
    load: false,
    search: '',
    searching: false,
    filtered: undefined,
    hovered: false,
  }

  componentDidMount() {
    this.props.getMoviesThunk();
  }

  loadMovies = () => {
    this.setState({
      load: true,
    })
  }

  handleChangeFilter = (ev) => {
    this.setState({
      search: ev.target.value,
    });

    const movies = (this.state.search !== '' && this.state.searching === true) 
    ? this.props.movies.filter(item => item.title.match(new RegExp(this.state.search, 'i'))) 
    : this.props.movies;

    this.setState({
      filtered: movies,
      searching: true,
    })
    if(this.state.search === ''){
      this.setState({
        searching: false,
      })
    }
  }

  render() {
    return (
      <Content>
        <ContainerTitle>Filmes</ContainerTitle>
        <Form>
          <InputFilter 
            type="text" 
            placeholder="buscar filmes" 
            onChange={this.handleChangeFilter}
          />
          <ButtonFilter type="submit">Pesquisar</ButtonFilter>
        </Form>
        <Container load={this.state.load}>
          {this.state.searching ? (
            this.state.filtered.map(item => (
              <BoxMovies key={item.id}>
  
                <ImageMovie src={item.poster_path} />
                <BoxAverage>
                  <Star src={StarIcon}/>
                  <AverageVote>{item.vote_average}</AverageVote>
                </BoxAverage>
                <TitleMovie>{item.title}</TitleMovie>
                <Synopsis>{item.overview}</Synopsis>
              </BoxMovies>
            ))
          ) : (
            this.props.movies.map(item => (
              <BoxMovies key={item.id}>
  
                <ImageMovie src={item.poster_path} />
                <BoxAverage>
                  <Star src={StarIcon}/>
                  <AverageVote>{item.vote_average}</AverageVote>
                </BoxAverage>
                <TitleMovie>{item.title}</TitleMovie>
                <Synopsis>{item.overview}</Synopsis>
              </BoxMovies>
            ))
          )}
        </Container>
      </Content>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Layout);
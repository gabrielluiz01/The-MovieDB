// Libs
import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Api
import api from '../api';
import {api_key} from '../api';

// Images
import StarIcon from '../assets/star.png';
import Arrow from '../assets/arrow.png';

// Redux
import { getMoviesThunk, searchMoviesThunk, detailsMoviesThunk } from '../dataflow/thunks/app-thunk'; 

// Map State
const mapStateToProps = state => ({
  movies: state.content.movies,
  filteredMovies: state.content.filteredMovies,
  detailsMovies: state.content.detailsMovies,
});

// Map Dispatch
const mapDispatchToProps = dispatch => ({
  getMoviesThunk: info => dispatch(getMoviesThunk(info)),
  searchMoviesThunk: info => dispatch(searchMoviesThunk(info)),
  detailsMoviesThunk: info => dispatch(detailsMoviesThunk(info)),
});

// Styled 
const Content = styled.div`
  width: 80%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #141414;
  /* padding-left: 2rem; */
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

const Overlay = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #141414;
  position: fixed;
  top: 0%;
  left: 0;
`;

const Modal = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoxInfoMovie = styled.div`
  width: auto;
  display: flex;
`;

const BoxInfo = styled.div`
  width: 25vw;
  display: flex;
  flex-direction: column;
`;

const BoxArrow = styled.div``;

const ImageArrow = styled.img`
  width: 50px;
  border-radius: 50%;
  margin: 1rem;
  cursor: pointer;
`;

const BoxTrailer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  background: #FFF;
`;

const Trailer = styled.div``;

const Images = styled.div``;

class Layout extends Component{

  state = {
    load: false,
    search: '',
    searching: false,
    isOpenDetails: false,
  }

  componentDidMount() {
    this.props.getMoviesThunk('popular');
  }

  handleClick = (item) => {
    this.props.detailsMoviesThunk(item.id);
    this.setState({
      isOpenDetails: true,
    })
    console.log('teste', this.props.detailsMovies)
  }


  handleChangeFilter = (ev) => {
    const {search} = this.state;
    this.setState({
      search: ev.target.value,
    });
    this.props.searchMoviesThunk(search)
  }


  renderModalDetails = () => {
    return (
      <>
        {this.props.detailsMovies.map(item => (
          <Overlay>
            <BoxArrow>
              <ImageArrow src={Arrow} onClick={() => this.setState({ isOpenDetails: false })}/>
            </BoxArrow>
            <Modal>
              <BoxInfoMovie>
                <ImageMovie src={item.backdrop_path} style={{margin: '0 1rem'}}/>
                <BoxInfo>
                  <TitleMovie>{item.title}</TitleMovie>
                  <Synopsis>{item.release_date}</Synopsis>
                  <Synopsis>{item.overview}</Synopsis>
                </BoxInfo>
              </BoxInfoMovie>
            </Modal>
          </Overlay>
        ))}
      </>
    )
  }

  render() {
    console.log('filmes', this.props.detailsMovies)
    return (
      <Content>
        {this.state.isOpenDetails ? (
          <>
            {this.renderModalDetails()}
          </>
        ) : (
          <>
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
            {this.state.search.length > 0 ? (
              this.props.filteredMovies.map(item => (
                <BoxMovies key={item.id} onClick={() => this.handleClick(item)}>
    
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
                <BoxMovies key={item.id} onClick={() => this.handleClick(item)}>
    
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
        </>
      )}
      </Content>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Layout);
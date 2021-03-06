// Libs
import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom' 
import YouTube from 'react-youtube';

// Api
import api from '../api';
import {api_key} from '../api';

// Images
import StarIcon from '../assets/star.png';
import Arrow from '../assets/arrow.svg';

// Redux
import {
  getMoviesThunk,
  searchMoviesThunk,
  detailsMoviesThunk,
  getVideoMoviesThunk,
  getImagesMoviesThunk,
  getCastMoviesThunk
} from '../dataflow/thunks/app-thunk'; 
import {clear} from '../dataflow/modules/app-module';

// Map State
const mapStateToProps = state => ({
  movies: state.content.movies,
  filteredMovies: state.content.filteredMovies,
  detailsMovies: state.content.detailsMovies,
  moviesVideos: state.content.moviesVideos,
  imagesMovies: state.content.imagesMovies,
  castMovies: state.content.castMovies,
});

// Map Dispatch
const mapDispatchToProps = dispatch => ({
  getMoviesThunk: info => dispatch(getMoviesThunk(info)),
  searchMoviesThunk: info => dispatch(searchMoviesThunk(info)),
  detailsMoviesThunk: info => dispatch(detailsMoviesThunk(info)),
  getVideoMoviesThunk: info => dispatch(getVideoMoviesThunk(info)),
  getImagesMoviesThunk: info => dispatch(getImagesMoviesThunk(info)),
  getCastMoviesThunk: info => dispatch(getCastMoviesThunk(info)),
  clear: info => dispatch(clear(info))
});

// Styled 
const Content = styled.div`
  width: calc(100% - 13rem);
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #141414;
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
  padding: .5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 14px #FBAA30;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`;

const ImageMovie = styled.img`
  width: ${props => props.details ? '250px' : '200px'};
  height: ${props => props.details && '300px'};
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
  color: #000;
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
  background: transparent;
  position: absolute;
  top: 0%;
  left: 0;
  z-index: 1;
`;

const Modal = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  margin-bottom: -2rem;
`;

const BoxInfoMovie = styled.div`
  width: auto;
  display: flex;
  z-index: 1;
`;

const BoxInfo = styled.div`
  width: 25vw;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const BoxArrow = styled.div`
  z-index: 1;
  display: flex;
  align-items: center;
`;

const ImageArrow = styled.img`
  width: 70px;
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
  z-index: 1;
`;

const BoxVideosImages = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-top: -1rem;
  padding-top: 2rem;
  background: #171717;
`;

const BoxPoster = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  background: #141414;

  img{
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
`;

const BoxGallery = styled.div`
  width: 60%;
  height: 27rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  z-index: 1;
  overflow: hidden;
`;

const ImageGallery = styled.img`
  width: 220px;
  height: 150px;

  :hover{
    width: 230px;
    transition: 0.5s ease-in-out;
  }
`;

const BoxCast = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  /* justify-content: center; */
  align-items: center;
  padding: 1rem;
  background: #141414;
`;

const ImageCast = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const NameCast = styled.p`
  text-align: center;
`;

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
    this.props.getVideoMoviesThunk(item.id);
    this.props.getImagesMoviesThunk(item.id);
    this.props.getCastMoviesThunk(item.id)
    // return <Redirect to="/details-movies"/>
    this.setState({
      isOpenDetails: true,
    })
  }


  handleChangeFilter = (ev) => {
    const {search} = this.state;
    this.setState({
      search: ev.target.value,
    });
    this.props.searchMoviesThunk(search)
  }

  renderVideos = () => {
    const opts = {
      height: '300',
      width: '500',
      playerVars: {
        autoplay: 0,
      },
      casts: this.props.castMovies.length,
      showCasts: 5,
    }
    const video = this.props.moviesVideos
    return <YouTube videoId={video.key} opts={opts}/>
  }

  isBack = () => {
    this.setState({ isOpenDetails: false })
    this.props.clear()
  }

  // renderGallery = () => {
  //   this.props.imagesMovies.map(item => {
  //     console.log('eaokaoo')
  //     const images = {
  //       file_path: `https://image.tmdb.org/t/p/w500${item.file_path}`,
  //     }
  //     return (
  //       <img src={images.file_path}/>
  //     )
  //   })
  // }


  renderModalDetails = () => {
    const {casts, showCasts} = this.state;
    const data = Array.from({length: casts},(v, k) => k);
    return (
      <>
        {this.props.detailsMovies.map(item => {
          console.log('detalhes', item)
          const images = {
            poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            backdrop_path: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
          }
          return(
          <Overlay>
            <BoxPoster>
                <img src={images.backdrop_path}/>    
            </BoxPoster>  
            <BoxArrow>
              <ImageArrow src={Arrow} onClick={this.isBack} onMouseEnter={() => this.setState({isBack: true,})} onMouseLeave={() => this.setState({isBack: false,})}/>
              {this.state.isBack && <p>Back</p>}
            </BoxArrow>
              <Modal>
              <BoxInfoMovie>
                <ImageMovie details src={images.poster_path} style={{margin: '0 1rem'}}/>
                <BoxInfo>
                  <TitleMovie>{item.title}</TitleMovie>
                  <Synopsis>{item.release_date}</Synopsis>
                  <Synopsis>{item.overview}</Synopsis>
                </BoxInfo>
                </BoxInfoMovie>
            </Modal>
            <BoxVideosImages>
              <span style={{display: 'flex', flexDirection: 'column'}}>
                <h1 style={{textAlign: 'center',marginBottom: '2.5rem'}}>Trailer</h1>
                {this.renderVideos()}
              </span>
                <BoxGallery>
                  {this.props.imagesMovies.map(item => {
                    const gallery = {
                      file_path: `https://image.tmdb.org/t/p/w500${item.file_path}`,
                    }
                    return (
                      <ImageGallery src={gallery.file_path}/>
                    )
                  })}
                </BoxGallery>
            </BoxVideosImages>
              <BoxCast>
                {this.props.castMovies.map(item => {
                  const images = {
                    profile_path: `https://image.tmdb.org/t/p/w500${item.profile_path}`
                  }
                  return (
                    data.slice(0, showCasts).map((casts, index) => {
                      return(
                      <div style={{display: 'flex', flexDirection: 'column'}}>
                        <ImageCast src={images.profile_path}/>
                        <NameCast>{item.name}</NameCast>
                      </div>
                      )
                    })
                  )
                })}
              </BoxCast>
          </Overlay>
        )})}
      </>
    )
  }

  render() {
    return (
      <Content>
        {this.state.isOpenDetails ? (
          <>
            {this.renderModalDetails()}
          </>
        ) : (
          <>
          <ContainerTitle>Movies</ContainerTitle>
          <Form>
            <InputFilter 
              type="text" 
              placeholder="search movies" 
              onChange={this.handleChangeFilter}
            />
            <ButtonFilter type="submit">search</ButtonFilter>
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
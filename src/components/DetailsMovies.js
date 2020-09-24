// Libs
import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';

// Redux
import {
  detailsMoviesThunk,
  getVideoMoviesThunk,
  getImagesMoviesThunk,
  getCastMoviesThunk,
} from '../dataflow/thunks/app-thunk';

import { clear } from '../dataflow/modules/app-module';

// Images
import Arrow from '../assets/arrow.svg';

// MapState
const mapStateToProps = state => ({
  detailsMovies: state.content.detailsMovies,
  moviesVideos: state.content.moviesVideos,
  imagesMovies: state.content.imagesMovies,
  castMovies: state.content.castMovies,
});

// MapDispatch
const mapDispatchToProps = dispatch => ({
  detailsMoviesThunk: info => dispatch(detailsMoviesThunk(info)),
  getVideoMoviesThunk: info => dispatch(getVideoMoviesThunk(info)),
  getImagesMoviesThunk: info => dispatch(getImagesMoviesThunk(info)),
  getCastMoviesThunk: info => dispatch(getCastMoviesThunk(info)),
  clear: info => dispatch(clear(info))
});

// Styled
const TitleMovie = styled.h1`
  width: 100%;
  margin-left: .5rem;
  font-size: 1.3rem;
  color: #FFF;
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

const Synopsis = styled.p`
  width: 95%;
  height: 4.2rem;
  align-self: center;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #FFF;
`;

class DetailsMovies extends Component{

  state = {
    isBack: false,
  }

  isBack = () => {
    this.props.clear()
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


  render(){
    return(
      <>
      {this.props.detailsMovies.map(item => {
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
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                      <ImageCast src={images.profile_path}/>
                      <NameCast>{item.name}</NameCast>
                    </div>
                  )
              })}
            </BoxCast>
        </Overlay>
      )})}
    </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (DetailsMovies);
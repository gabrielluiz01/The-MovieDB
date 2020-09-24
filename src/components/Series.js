// Libs
import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Components
import Episodes from './Episodes';

// Images
import StarIcon from '../assets/star.png';
import Arrow from '../assets/arrow.svg';

// Redux
import { getSeriesThunk, searchSeriesThunk, detailsSeriesThunk, getSeasonThunk, getEpisodesThunk } from '../dataflow/thunks/app-thunk';
import {saveId, clear} from '../dataflow/modules/app-module';

// Map State
const mapStateToProps = state => ({
  series: state.content.series,
  filteredSeries: state.content.filteredSeries,
  detailsSeries: state.content.detailsSeries,
  seasons: state.content.seasons,
  id: state.content.id,
});

// Map Dispatch
const mapDispatchToProps = dispatch => ({
  getSeriesThunk: info => dispatch(getSeriesThunk(info)),
  searchSeriesThunk: info => dispatch(searchSeriesThunk(info)),
  detailsSeriesThunk: info => dispatch(detailsSeriesThunk(info)),
  getSeasonThunk: info => dispatch(getSeasonThunk(info)),
  getEpisodesThunk: info => dispatch(getEpisodesThunk(info)),
  saveId: info => dispatch(saveId(info)),
  clear: info => dispatch(clear(info)),
})

// Styled 
const Content = styled.div`
  width: calc(100% - 13rem);
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #141414;
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
  z-index: 1;
`;

const Synopsis = styled.p`
  width: 95%;
  height: 4.2rem;
  align-self: center;
  text-overflow: ellipsis;
  overflow: ${props => props.details ? 'none' : 'hidden'};
  color: #FFF;
  font-size: ${props => props.details && '1rem'};
  z-index: 1;
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
  position: absolute;
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



const BoxTrailer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  background: #FFF;
`;

const BoxSeasons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: #171717;  
  grid-row-gap: 30px;
  padding-bottom: 2.5rem;
`;

const Box = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 14px #FBAA30;
  margin: 0 auto;
`;

const BoxInfoSeason = styled.span`
  height: 10rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonView = styled.button`
  width: 7rem;
  background: transparent;
  border: 1px solid #BCBCBC80;
  border-radius: 6px;
  font-size: .9rem;
  padding: .3rem;
  margin: 1rem;
  font-weight: bold;
  cursor: pointer;

  :hover{
    background: #BCBCBC80;
    transition: .5s ease-in-out;
  }
`;

const SeasonText = styled.h3`

`;

class Series extends Component{

  state = {
    load: false,
    search: '',
    searching: false,
    filtered: undefined,
    hovered: false,
    isOpenDetails: false,
    isBack: false,
    isEpisodes: false,
  }

  componentDidMount() {
    this.props.getSeriesThunk('popular');
  }

  loadSeries = () => {
    this.setState({
      load: true,
    })
  }

  handleChangeFilter = (ev) => {
    const {search} = this.state;
    this.setState({
      search: ev.target.value,
    });
    this.props.searchSeriesThunk(search)
  }

  handleClick = (item) => {
    this.props.detailsSeriesThunk(item.id)
    this.props.getSeasonThunk(item.id)
    this.props.getEpisodesThunk(item.id)
    this.props.saveId(item.id)
    this.setState({
      isOpenDetails: true,
    })
  }

  handleClickSeason = (item) => {
    console.log('PROPS', this.props.id)
    const data = {
      id: item.id,
      season: item.season_number,
      serieId: this.props.id,
    }
    this.props.getEpisodesThunk(data)
    this.isOpenEpisodes()
  }

  isCloseEpisodes = () => {
    this.setState({
      isEpisodes: false,
      isOpenDetails: true,
    })
  }

  isOpenEpisodes = () => {
    this.setState({
      isEpisodes: true,
      isOpenDetails: false,
    })
  }

  isBack = () => {
    this.setState({ isOpenDetails: false })
    this.props.clear()
  }

  renderSeasons = () => {
    this.props.seasons.map(item => {
      const images = {
        poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      }
      return (
        <Box>
          <h1 style={{color: '#FFF'}}>SEASONS</h1>
          <img src={images.poster_path}/>
        </Box>
      )
    })
  }

  renderModalDetails = () => (
    <>
      {this.props.detailsSeries.map(item => {
        const images = {
          ...item,
          backdrop_path: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
          poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }
        return (
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
                <ImageMovie src={images.poster_path} style={{ margin: '0 1rem' }} />
                <BoxInfo>
                  <TitleMovie>{item.original_name}</TitleMovie>
                  <Synopsis>{item.release_date}</Synopsis>
                  <Synopsis details>{item.overview}</Synopsis>
                </BoxInfo>
              </BoxInfoMovie>
            </Modal>
            <BoxSeasons>
              {this.props.seasons.map(item => {
                console.log(item)
                const images = {
                  poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }
                return (

                  <Box>
                    <img style={{ width: '150px', height: '100%' }} src={images.poster_path} />
                    <BoxInfoSeason>
                      <SeasonText style={{ color: '#FFF' }}>{item.name}</SeasonText>
                      <SeasonText>{`Episodes ${item.episode_count}`}</SeasonText>
                      <ButtonView onClick={() => this.handleClickSeason(item)}>View all</ButtonView>
                    </BoxInfoSeason>
                  </Box>
                )
              })}
            </BoxSeasons>
            
          </Overlay>
        )
      })}
  </>
  )

  render() {
    return (
      <Content>
        {this.state.isEpisodes && 
        <Episodes details={this.state.isOpenDetails} isEpisodes={this.state.isEpisodes} isCloseEpisodes={this.isCloseEpisodes}/>}
        {this.state.isOpenDetails ? (
          this.renderModalDetails()
        ) : (
          <>
          <ContainerTitle>Series</ContainerTitle>
          <Form>
            <InputFilter 
              type="text" 
              placeholder="search series" 
              onChange={this.handleChangeFilter}
            />
            <ButtonFilter type="submit">search</ButtonFilter>
          </Form>
          <Container load={this.state.load}>
            {this.state.search.length > 0 ? (
              this.props.filteredSeries.map(item => (
                <BoxMovies key={item.id} onClick={() => this.handleClick(item)}>
    
                  <ImageMovie src={item.poster_path} />
                  <BoxAverage>
                    <Star src={StarIcon}/>
                    <AverageVote>{item.vote_average}</AverageVote>
                  </BoxAverage>
                  <TitleMovie>{item.original_name}</TitleMovie>
                  <Synopsis>{item.overview}</Synopsis>
                </BoxMovies>
              ))
            ) : (
              this.props.series.map(item => (
                <BoxMovies key={item.id} onClick={() => this.handleClick(item)}>
    
                  <ImageMovie src={item.poster_path} />
                  <BoxAverage>
                    <Star src={StarIcon}/>
                    <AverageVote>{item.vote_average}</AverageVote>
                  </BoxAverage>
                  <TitleMovie>{item.original_name}</TitleMovie>
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

export default connect(mapStateToProps, mapDispatchToProps) (Series);
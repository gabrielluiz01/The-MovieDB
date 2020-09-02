// Libs
import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Images
import StarIcon from '../assets/star.png';
import Arrow from '../assets/arrow.png';

// Redux
import { getSeriesThunk, searchSeriesThunk, detailsSeriesThunk } from '../dataflow/thunks/app-thunk';

// Map State
const mapStateToProps = state => ({
  series: state.content.series,
  filteredSeries: state.content.filteredSeries,
  detailsSeries: state.content.detailsSeries,
});

// Map Dispatch
const mapDispatchToProps = dispatch => ({
  getSeriesThunk: info => dispatch(getSeriesThunk(info)),
  searchSeriesThunk: info => dispatch(searchSeriesThunk(info)),
  detailsSeriesThunk: info => dispatch(detailsSeriesThunk(info)),
})

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

class Series extends Component{

  state = {
    load: false,
    search: '',
    searching: false,
    filtered: undefined,
    hovered: false,
    isOpenDetails: false,
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
    this.setState({
      isOpenDetails: true,
    })
  }

  renderImageDetails = () => {
    const images = this.props.detailsSeries.map(item => {
      return {
        ...item,
        backdrop_path: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
        poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      }
      return <img src={item.backdrop_path}/>
    })
  }

  renderModalDetails = () => (
    <>
      {this.props.detailsSeries.map(item => {
        return (
          <Overlay>
            <BoxArrow>
              <ImageArrow src={Arrow} onClick={() => this.setState({ isOpenDetails: false })} />
            </BoxArrow>
            <Modal>
              <BoxInfoMovie>
                <ImageMovie src={item.backdrop_path} style={{ margin: '0 1rem' }} />
                <BoxInfo>
                  <TitleMovie>{item.original_name}</TitleMovie>
                  <Synopsis>{item.release_date}</Synopsis>
                  <Synopsis>{item.overview}</Synopsis>
                </BoxInfo>
              </BoxInfoMovie>
            </Modal>
          </Overlay>
        )
      })}}
  </>
  )

  render() {
    console.log(this.props.detailsSeries)
    return (
      <Content> 
        {this.state.isOpenDetails ? (
          this.renderModalDetails()
        ) : (
          <>
          <ContainerTitle>Series</ContainerTitle>
          <Form>
            <InputFilter 
              type="text" 
              placeholder="buscar series" 
              onChange={this.handleChangeFilter}
            />
            <ButtonFilter type="submit">Pesquisar</ButtonFilter>
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
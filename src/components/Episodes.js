// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

// Images
import Arrow from '../assets/arrow.svg';

// Redux
const mapStateToProps = state => ({
  episodes: state.content.episodes,
});

const mapDispatchToProps = dispatch => ({

});

// Styled

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #141414;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const BoxPoster = styled.div`
  width: 100%;
  height: 90vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  background: #141414;
  z-index: 2;

  img{
    width: 100%;
    height: 100%;
    opacity: 0.2;
  }
`;

const BoxEpisodes = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 1rem;
  z-index: 3;
`;

const Box = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  background: #141414;
  opacity: 0.8;
  box-shadow: 0px 0px 14px #FBAA30;
  margin: 0 auto;
  margin: 1rem;
  z-index: 3;
`;

const BoxInfoEpisodes = styled.span`
  min-height: 10rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  z-index: 3;
`;

const EpisodesText = styled.p`
  font-size: .8rem;
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

class Episodes extends Component{

  state = {
    isBack: false,
  }


  isBack = () => {
    this.props.isCloseEpisodes()
  }

  render(){
    console.log('episodios', this.props)
    return(
      <Container>
        <BoxArrow>
          <ImageArrow src={Arrow} onClick={this.isBack} onMouseEnter={() => this.setState({isBack: true,})} onMouseLeave={() => this.setState({isBack: false,})}/>
          {this.state.isBack && <p>Back</p>}
        </BoxArrow>
        <BoxEpisodes>
        {this.props.episodes.map(item => {
          const images = {
            ...item,
            still_path: `https://image.tmdb.org/t/p/w500${item.still_path}`,
          }
          return(
            <>
              <Box>
                <img style={{ width: '150px', height: '10rem', margin: '0 1rem 0 0'}} src={images.still_path}/>
                <BoxInfoEpisodes>
                  <span style={{display: 'flex'}}>
                    <EpisodesText>{`${item.episode_number} - `}</EpisodesText>
                    <EpisodesText>
                      {item.name}
                    </EpisodesText>
                  </span>
                  <EpisodesText>{item.air_date}</EpisodesText>
                  <EpisodesText>{item.overview}</EpisodesText>
                </BoxInfoEpisodes>
              </Box>
            </>
          )
        })}
        </BoxEpisodes>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Episodes);
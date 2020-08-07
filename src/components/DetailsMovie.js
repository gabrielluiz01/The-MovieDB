// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Redux


// Map State
const mapStateToProps = state => ({
  detailsMovies: state.content.detailsMovies,
});

// Styled
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  height: 100vh;
  background: url("https://image.tmdb.org/t/p/w500//bOGkgRGdhrBYJSLpXaxhXVstddV.jpg") 0% 0% / cover no-repeat fixed;
`;



class DetailsMovie extends Component{
  render() {
    console.log('props', this.props);
    return (
      <>
        {this.props.detailsMovies.map(item => (
          <Container> 
            <Content>

            </Content>
          </Container>
        ))}
      </>
    );
  }
}

export default DetailsMovie;
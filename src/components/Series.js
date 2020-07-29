// Libs
import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Redux
import { getSeriesThunk } from '../dataflow/thunks/app-thunk';

// Map State
const mapStateToProps = state => ({
  series: state.series.series,
});

// Map Dispatch
const mapDispatchToProps = dispatch => ({
  getSeriesThunk: info => dispatch(getSeriesThunk(info))
})

class Series extends Component{

  componentDidMount() {
    this.props.getSeriesThunk();
  }

  render() {
    console.log(this.props.series)
    return (
      <div>
        {this.props.series.map(item => (
          <div key={item.id}>
            <img src={item.poster_path} />
            <h2>{item.original_name}</h2>
            <p>{item.overview}</p>
            <p>{item.vote_average}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Series);
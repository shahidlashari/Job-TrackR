import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
// import SearchHistogramData from '../../components/TrendingHistogramData';
// import SearchHistoricalData from '../../components/TrendingHistoricalData';
import SearchEmployerData from '../../components/TrendingEmployerData';
// import SerachRegionalData from '../../components/TrendingRegionalData';
// import { GET_EMPLOYER_DATA, GET_REGIONAL_DATA, GET_HISTORICAL_DATA, GET_HISTOGRAM_DATA } from '../../actions/types';

class Trending extends Component {
  render() {
    return (

      <>
        {/* <Container stackable style={{ marginTop: '4em', marginBottom: '5em' }}> */}
        <SearchEmployerData />
        {/* </Container>

        <Container> */}
        {/* <SerachRegionalData /> */}
        {/* </Container> */}
        {/*
        <Container>
          <SearchHistoricalData />
        </Container>
        <Container>
          <SearchHistogramData />
        </Container> */}
      </>
    );
  }
}
export default reduxForm({ form: 'Trending ' })(Trending);

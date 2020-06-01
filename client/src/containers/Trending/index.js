import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SearchHistogramData from '../../components/SearchHistogramData';
import SearchHistoricalData from '../../components/SearchHistoricalData';
import SearchEmployerData from '../../components/SearchEmployerData';
import SerachRegionalData from '../../components/SearchRegionalData';
import EmployerChart from '../EmployerChart';
import RegionalChart from '../RegionalChart';
import HistoricalChart from '../HistoricalChart';
import HistogramChart from '../HistogramChart';

class Trending extends Component {
  renderEmployerChart = () => (
    <Grid.Row>
      <Grid.Column width={16}>
        <Segment style={{ minHeight: 450 }}>
          <EmployerChart />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  )

  renderRegionalChart = () => (
    <Grid.Row>
      <Grid.Column width={16}>
        <Segment style={{ minHeight: 450 }}>
          <RegionalChart />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  )

  renderHistoricalChart = () => (
    <Grid.Row>
      <Grid.Column width={16}>
        <Segment style={{ minHeight: 450 }}>
          <HistoricalChart />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  )

  renderHistogramChart = () => (
    <Grid.Row>
      <Grid.Column width={16}>
        <Segment style={{ minHeight: 450 }}>
          <HistogramChart />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  )

  render() {
    return (
      <div>
        <Helmet>
          <style>{'body { background-color: #37373b; }'}</style>
        </Helmet>
        <Grid textAlign="center" style={{ height: '5vh' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 200 }} />
        </Grid>
        <Grid container stackable textAlign="center" style={{ marginTop: '3em', marginBottom: '3em' }}>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header
                as="h2"
                content="Top Employers"
                inverted
                style={{
                  color: 'white',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  marginBottom: 0,
                  marginTop: '1.3em',
                }}
              />
              <SearchEmployerData employer={this.props.employer} />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header
                as="h2"
                content="Regional Data"
                inverted
                style={{
                  color: 'white',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  marginBottom: 0,
                  marginTop: '1.3em',
                }}
              />
              <SerachRegionalData regional={this.props.regional} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <Header
                as="h2"
                content="Historical Data"
                inverted
                style={{
                  color: 'white',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  marginBottom: 0,
                  marginTop: '1em',
                }}
              />
              <SearchHistoricalData historical={this.props.historical} />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header
                as="h2"
                content="Histogram Data"
                inverted
                style={{
                  color: 'white',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  marginBottom: 0,
                  marginTop: '1em',
                }}
              />
              <SearchHistogramData histogram={this.props.histogram} />
            </Grid.Column>
          </Grid.Row>
          {this.props.employer.length === 0 ? null : this.renderEmployerChart()}
          {this.props.regional.length === 0 ? null : this.renderRegionalChart()}
          {this.props.historical.length === 0 ? null : this.renderHistoricalChart()}
          {this.props.histogram.length === 0 ? null : this.renderHistogramChart()}
        </Grid>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    employer: state.data.employerData,
    regional: state.data.regionalData,
    historical: state.data.historicalData,
    histogram: state.data.histogramData,
  };
}
export default compose(
  connect(mapStateToProps, {}),
  reduxForm({ form: 'Trending' }),
)(Trending);

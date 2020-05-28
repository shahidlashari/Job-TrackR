import React, { Component } from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import SearchEmployerData from '../../components/TrendingEmployerData';
import SerachRegionalData from '../../components/TrendingRegionalData';
import SearchHistoricalData from '../../components/TrendingHistoricalData';
import SearchHistogramData from '../../components/TrendingHistogramData';

class TrendingResult extends Component {
  componentDidMount() {
    console.log(this.props.data);
  }

  render() {
    return (
      <div>
        <Card className="text-center card-chart-display" border="dark">
          <Card.Header>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={
                <Tooltip id="tooltip-top">
                  Data result for trendings
                </Tooltip>
              }
            >
              <Card.Title className="trending-chart-title">Data Result</Card.Title>
            </OverlayTrigger>
          </Card.Header>

          <Card.Body>
            <Card.Text>
              <SearchEmployerData data={this.props.data} />
              <SerachRegionalData data={this.props.data} />
              <SearchHistoricalData data={this.props.data} />
              <SearchHistogramData data={this.props.data} />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { data: state.data };
}
export default connect(mapStateToProps, {})(TrendingResult);

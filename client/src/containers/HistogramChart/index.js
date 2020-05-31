/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

class HistogramChart extends PureComponent {
  state = {
    isMapped: false,
    // eslint-disable-next-line react/no-unused-state
    histogramData: [],
  }

  componentDidUpdate(prevProps) {
    if (this.props.historical !== prevProps.historical) {
      this.mapChartData();
    }
  }

  renderHistogramChart = () => {
    return (
      <div style={{ width: '100%', height: 350, textAlign: 'center' }}>
        <h2> Histogram salary 6-months data for specific Jobs category  </h2>
        <ResponsiveContainer>
          <BarChart width={730} height={250} data={this.state.histogramData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="HistoMonth" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="SalaryHistogram" fill="#008000" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  componentDidMount = () => {
    this.mapChartData();
  }

  mapChartData = () => {
    const histogramData = this.mapData();
    this.setState({ histogramData, isMapped: true });
  }

  mapData() {
    const histogramArr = [];
    for (const key in this.props.histogram1) {
      histogramArr.push({ HistoMonth: key, SalaryHistogram: this.props.histogram1[key] });
    }
    return histogramArr;
  }

  render() {
    return (
      <Container>
        {this.state.isMapped ? this.renderHistogramChart() : null}
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    histogram1: state.data.histogramData.histogram,
    location: state.data.histogramDataLocation,
  };
}
export default connect(mapStateToProps, {})(HistogramChart);

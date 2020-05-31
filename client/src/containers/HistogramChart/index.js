import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

class HistogramChart extends PureComponent {
  // Logic that renders the Result Chart (Rechart npm package)
  state = {
    isMapped: false,
    // eslint-disable-next-line react/no-unused-state
    histogramData: [],
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.historical !== prevProps.historical) {
      this.mapChartData();
    }
  }

  renderHistogramChart = () => {
    // console.log(this.props.histogramData);
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
            <Bar dataKey="SalaryHistogram" fill="#82ca9d" />
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
    console.log(histogramData);
    this.setState({ histogramData, isMapped: true });
  }

  mapData() {
    const histogramArr = [];
    for (const key in this.props.histogram1) {
      histogramArr.push({ HistoMonth: key, SalaryHistogram: this.props.histogram1[key] });
    }

    console.log(histogramArr);
    return histogramArr;
  }

  render() {
    console.log(this.props.histogram1);
    console.log(this.props.location);
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

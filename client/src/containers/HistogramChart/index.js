import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

class HistogramChart extends PureComponent {
  state = {
    histogramData: [],
    isMapped: false,
  }

  componentDidUpdate(prevProps) {
    if (this.props.histogram !== prevProps.histogram) {
      this.mapChartData();
    }
  }

  renderHistogramChart = () => {
    return (
      <div style={{ width: '100%', height: 350, textAlign: 'center' }}>
        <h2> Histogram Salary for that Specific Job Category in the Past 6 Months </h2>
        <ResponsiveContainer>
          <AreaChart width={730} height={250} data={this.state.histogramData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="HistoMonth" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="SalaryHistogram" fill="#008000" />
          </AreaChart>
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
    for (const key in this.props.histogram) {
      histogramArr.push({ HistoMonth: key, SalaryHistogram: this.props.histogram[key] });
    }
    return histogramArr;
  }

  render() {
    return (
      <Container className="histogram-chart">
        {this.state.isMapped ? this.renderHistogramChart() : null}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    histogram: state.data.histogramData.histogram,
    location: state.data.histogramDataLocation,
  };
}

export default connect(mapStateToProps, {})(HistogramChart);

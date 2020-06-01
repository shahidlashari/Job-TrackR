import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

class HistoricalChart extends PureComponent {
  state = {
    historicalData: [],
    isMapped: false,
  }

  componentDidUpdate(prevProps) {
    if (this.props.historical !== prevProps.historical) {
      this.mapChartData();
    }
  }

  renderHistoricalChart = () => {
    return (
      <div style={{ width: '100%', height: 350, textAlign: 'center' }}>
        <h2> Historical Salary Data of that Specific Job Category in the Past 6 Months  </h2>
        <ResponsiveContainer>
          <BarChart width={730} height={250} data={this.state.historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="salary" fill="#A52A2A" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  componentDidMount = () => {
    this.mapChartData();
  }

  mapChartData = () => {
    const historicalData = this.mapData();
    this.setState({ historicalData, isMapped: true });
  }

  mapData() {
    const historicalArr = [];
    for (const key in this.props.historical) {
      historicalArr.push({ month: key, salary: this.props.historical[key] });
    }
    return historicalArr;
  }

  render() {
    return (
      <Container className="historical-chart">
        {this.state.isMapped ? this.renderHistoricalChart() : null}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    historical: state.data.historicalData,
    location: state.data.historicalDataLocation,
  };
}

export default connect(mapStateToProps, {})(HistoricalChart);

import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

class HistoricalChart extends PureComponent {
  state = {
    isMapped: false,
    historicalData: [],
  }

  componentDidUpdate(prevProps) {
    if (this.props.historical !== prevProps.historical) {
      this.mapChartData();
    }
  }

  renderHistoricalChart = () => {
    console.log(this.props.historicalData);
    return (
      <div style={{ width: '100%', height: 350, textAlign: 'center' }}>
        <h2> Historical salary 6-months data for specific Jobs category  </h2>
        <ResponsiveContainer>
          <BarChart width={730} height={250} data={this.state.historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="salary" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <p>{this.props.location}</p>
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
      <Container>
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

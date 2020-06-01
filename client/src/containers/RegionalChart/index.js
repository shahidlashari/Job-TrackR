import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

class RegionalChart extends PureComponent {
  state = {
    regionalData: [],
    isMapped: false,
  }

  componentDidUpdate(prevProps) {
    if (this.props.regional !== prevProps.regional) {
      this.mapChartData();
    }
  }

  renderRegionalChart = () => {
    return (
      <div style={{ width: '100%', height: 350, textAlign: 'center' }}>
        <h2> Regional Data Salary in the Past Year </h2>
        <ResponsiveContainer>
          <BarChart width={730} height={250} data={this.state.regionalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="salary" fill="#00acee" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  componentDidMount = () => {
    this.mapChartData();
  }

  mapChartData = () => {
    const regionalData = this.mapData();
    this.setState({ regionalData, isMapped: true });
  }

  mapData() {
    const regionalArr = [];
    for (const key in this.props.regional) {
      regionalArr.push({ month: key, salary: this.props.regional[key] });
    }
    return regionalArr;
  }

  render() {
    return (
      <Container className="regional-chart">
        {this.state.isMapped ? this.renderRegionalChart() : null}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    regional: state.data.regionalData,
    location: state.data.regionalDataLocation,
  };
}

export default connect(mapStateToProps, {})(RegionalChart);

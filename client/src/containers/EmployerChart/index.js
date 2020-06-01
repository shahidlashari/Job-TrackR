import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

class EmployerChart extends PureComponent {
  state = {
    employerData: [],
    isMapped: false,
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.employer !== prevProps.employer) {
      this.mapChartData();
    }
  }

  renderEmployerChart = () => {
    return (
      <div style={{ width: '100%', height: 350, textAlign: 'center' }}>
        <h2> Top 5 Companies by # of Vacancies of that Job </h2>
        <ResponsiveContainer>
          <BarChart width={730} height={250} data={this.state.employerData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="numberOfJobs" fill="#800080" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  componentDidMount = () => {
    this.mapChartData();
  }

  mapChartData = () => {
    const employerData = this.mapData();
    this.setState({ employerData, isMapped: true });
  }

  mapData() {
    const employerArr = [];
    this.props.employer.forEach((element) => {
      const dataObj = {};
      dataObj.name = element.canonical_name;
      dataObj.numberOfJobs = element.count;
      employerArr.push(dataObj);
    });
    return employerArr;
  }

  render() {
    return (
      <Container className="employer-chart">
        {this.state.isMapped ? this.renderEmployerChart() : null}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    employer: state.data.employerData,
  };
}

export default connect(mapStateToProps, {})(EmployerChart);

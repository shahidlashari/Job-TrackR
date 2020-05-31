import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

class EmployerChart extends PureComponent {
  // Logic that renders the Result Chart (Rechart npm package)
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
    console.log(this.state.employerData);
    return (
      <div style={{ width: '100%', height: 350, textAlign: 'center' }}>
        <h2> {this.props.employerData} Jobs for 5 Top Companies </h2>
        <ResponsiveContainer>
          <BarChart width={730} height={250} data={this.state.employerData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="numberOfJobs" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <p> name prop </p>
      </div>
    );
  }

  componentDidMount = () => {
    this.mapChartData();
  }

  mapChartData = () => {
    const employerData = this.mapData();
    console.log(employerData);
    this.setState({ employerData, isMapped: true });
  }

  mapData() {
    const employerArr = [];
    console.log('mapData');
    this.props.employer.forEach((element) => {
      const dataObj = {};
      dataObj.name = element.canonical_name;
      dataObj.numberOfJobs = element.count;
      employerArr.push(dataObj);
    });
    console.log(employerArr);
    return employerArr;
  }

  render() {
    return (
      <Container>

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

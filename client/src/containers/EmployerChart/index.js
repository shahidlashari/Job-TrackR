import React, { PureComponent } from 'react';
// import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';


// static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
class EmployerChart extends PureComponent {
  // Logic that renders the Result Chart (Rechart npm package)
state= {
  employerData: [],
  isMapped: false,
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
    </div>
  );
}

componentDidMount = () => {
  this.mapChartData();
}

mapChartData= () => {
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

      { this.state.isMapped ? this.renderEmployerChart() : null }

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

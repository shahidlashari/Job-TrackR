import React, { PureComponent } from 'react';
// import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';


// static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

class RegionalChart extends PureComponent {
  // Logic that renders the Result Chart (Rechart npm package)
  state = {
    isMapped: false,
    regionalData: [],
  }

  renderRegionalChart = () => {
    console.log(this.state.regionalData);
    return (
      <div style={{ width: '100%', height: 350 }}>
        <h2> {this.props.regionalData} Salary view for 12 months Regional Data </h2>
        <ResponsiveContainer>
          <BarChart width={730} height={250} data={this.props.regionalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="salary" fill="#8884d8" />
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
    console.log(regionalData);
    this.setState({ regionalData, isMapped: true });
  }

  mapData() {
    const regionalArr = [];
    for (const key in this.props.regional) {
      regionalArr.push({ month: key });
    }
      // {this.props.location}

    console.log(regionalArr);
    return regionalArr;
    // this.props.regional.forEach((element) => {
    //   console.log(element);
    // });
    // console.log(regionalArr);
    // return regionalArr;
  }

  render() {
    console.log(this.props.regional);
    console.log(this.props.regionalData);
    return (
      <Container>

        {this.state.isMapped ? this.renderRegionalChart() : null}
        {/* { this.props.regional.length && !this.state.isMapped && this.mapChartData() }
      { this.state.isMapped && this.renderRegionalChart()} */}
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

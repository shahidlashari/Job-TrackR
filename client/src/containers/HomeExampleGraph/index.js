import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '2019-05', salary: 137895.85, amt: 2400,
  },
  {
    name: '2019-06', salary: 129616.54, amt: 2210,
  },
  {
    name: '2019-07', salary: 128953.15, amt: 2290,
  },
  {
    name: '2019-08', salary: 130731.09, amt: 2000,
  },
  {
    name: '2019-09', salary: 133637.07, amt: 2181,
  },
  {
    name: '2019-10', salary: 130994.11, amt: 2500,
  },
  {
    name: '2019-11', salary: 131394.52, amt: 2100,
  },
  {
    name: '2019-12', salary: 132797.34, amt: 2100,
  },
  {
    name: '2020-01', salary: 129103, amt: 2100,
  },
  {
    name: '2020-02', salary: 128073.33, amt: 2100,
  },
  {
    name: '2020-03', salary: 128717.65, amt: 2100,
  },
  {
    name: '2020-04', salary: 129883.91, amt: 2100,
  },
];

export default class HomeExampleGraph extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    return (
      <div style={{ width: '100%', height: 370 }}>
        <h2 style={{ marginLeft: '70px', textAlign: 'center', textDecoration: 'underline' }}>Historical Data</h2>
        <h2 style={{ marginLeft: '70px', textAlign: 'center' }}>IT Jobs in US, California for the Past Year </h2>
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
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
}

import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'فروردین',
    سود: 4000,
    ضرر: 2400,
    amt: 2400,
  },
  {
    name: 'اردیبهشت',
    سود: 3000,
    ضرر: 1398,
    amt: 2210,
  },
  {
    name: 'خرداد',
    سود: 2000,
    ضرر: 9800,
    amt: 2290,
  },
  {
    name: 'تیر',
    سود: 2780,
    ضرر: 3908,
    amt: 2000,
  },
  {
    name: 'مرداد',
    سود: 1890,
    ضرر: 4800,
    amt: 2181,
  },
  {
    name: 'شهریور',
    سود: 2390,
    ضرر: 3800,
    amt: 2500,
  },
  {
    name: 'مهر',
    سود: 7490,
    ضرر: 5300,
    amt: 2100,
  },
  {
    name: 'آبان',
    سود: 4490,
    ضرر: 2300,
    amt: 2100,
  },
  {
    name: 'آذر',
    سود: 3490,
    ضرر: 4300,
    amt: 2100,
  },
];
export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={600}
          height={300}
          data={data}
        >
  
          <XAxis dataKey="name" tick={{ fill: 'white'}} />
          <YAxis  orientation='right' tickMargin={45} tick={{ fill: 'white'}}/>
          <Tooltip />

          <Bar dataKey="ضرر" fill="#ffff" radius={4} activeBar={<Rectangle fill="pink" stroke="blue"  />} />
          <Bar dataKey="سود" fill="#475BE8" radius={4} activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import randomColor from 'randomcolor';

const PortfolioValueStackedBarChart = ({ portfolioValuePerDay }) => {
  const data = portfolioValuePerDay.map(({ date, stocks }) => ({
    date,
    ...stocks,
  }));

  const colors = generateColors(Object.keys(data[0]).filter((key) => key !== 'date').length);

  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      {Object.keys(data[0])
        .filter((key) => key !== 'date')
        .map((company, index) => (
          <Bar key={company} dataKey={company} stackId="portfolio" fill={colors[index]} />
        ))}
    </BarChart>
  );
};

// Function to generate vibrant colors
const generateColors = (count) => {
  return randomColor({
    count: count,
    luminosity: 'bright',
    format: 'rgbc',
  });
};

export default PortfolioValueStackedBarChart;

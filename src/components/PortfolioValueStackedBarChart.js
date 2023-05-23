import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PortfolioValueStackedBarChart = ({ portfolioValuePerDay }) => {
  const data = portfolioValuePerDay.map(({ date, stocks }) => ({
    date,
    ...stocks,
  }));

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
          <Bar key={company} dataKey={company} stackId="portfolio" fill={`#${(index + 2) * 333}`} />
        ))}
    </BarChart>
  );
};

export default PortfolioValueStackedBarChart;

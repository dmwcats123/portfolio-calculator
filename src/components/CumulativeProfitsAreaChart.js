import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CumulativeProfitsAreaChart = ({ portfolioValuePerDay }) => {
  const data = portfolioValuePerDay.map(({ date, profits }) => ({
    date,
    ...profits,
  }));

  return (
    <AreaChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      {Object.keys(data[0])
        .filter((key) => key !== 'date')
        .map((company, index) => (
          <Area
            key={company}
            dataKey={company}
            stackId="profits"
            stroke={`#${(index + 2) * 333}`}
            fill={`#${(index + 2) * 333}`}
          />
        ))}
    </AreaChart>
  );
};

export default CumulativeProfitsAreaChart;

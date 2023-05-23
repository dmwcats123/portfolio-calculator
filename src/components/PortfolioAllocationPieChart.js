import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const PortfolioAllocationPieChart = ({ portfolioAllocation }) => {
  const data = Object.entries(portfolioAllocation).map(([company, { allocation }]) => ({
    company,
    allocation: parseFloat(allocation),
  }));

  const colors = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <PieChart width={400} height={300}>
      <Pie data={data} dataKey="allocation" nameKey="company" cx="50%" cy="50%" outerRadius={80}>
        {data.map((entry, index) => (
          <Cell key={entry.company} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default PortfolioAllocationPieChart;

import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const PortfolioAllocationPieChart = (props) => {
  const { portfolioAllocation } = props;
  const data = Object.entries(portfolioAllocation).map(([company, allocation]) => ({
    title: company,
    value: parseFloat(allocation),
  }));

  const colors = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div>
      <h2>Portfolio Allocation</h2>
      <PieChart
        data={data}
        radius={40}
        lineWidth={60}
        paddingAngle={5}
        startAngle={-90}
        viewBoxSize={[200, 200]}
      >
        {data.map((entry, index) => (
          <Pie
            key={entry.title}
            data={entry.value}
            cx={50}
            cy={50}
            startAngle={-90}
            endAngle={90}
            fill={colors[index % colors.length]}
          />
        ))}
      </PieChart>
    </div>
  );
};

export default PortfolioAllocationPieChart;

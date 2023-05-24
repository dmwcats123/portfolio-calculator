import React from "react";
import PortfolioAllocationTable from "./PortfolioAllocationTable";
import PortfolioAllocationPieChart from "./PortfolioAllocationPieChart";
import "../styles/PortfolioAllocationChart.css"; // Import the CSS file

const PortfolioAllocationChartWithLegend = ({ portfolioAllocation }) => {
  return (
    <div>
      <h2>Portfolio Allocation</h2>
      <div className="chart-container">
        <div className="chart-legend">
          <PortfolioAllocationTable portfolioAllocation={portfolioAllocation} />
        </div>
        <div className="chart">
          <PortfolioAllocationPieChart portfolioAllocation={portfolioAllocation} />
        </div>
      </div>
    </div>
  );
};

export default PortfolioAllocationChartWithLegend;

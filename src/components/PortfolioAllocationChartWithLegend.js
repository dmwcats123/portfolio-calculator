import React from "react";
import PortfolioAllocationTable from "./PortfolioAllocationTable";
import PortfolioAllocationPieChart from "./PortfolioAllocationPieChart";
import "../styles/PortfolioAllocationChart.css"; // Import the CSS file

const PortfolioAllocationChartWithLegend = (props) => {
  const { userInputData } = props;
  const initialBalance = userInputData.initialBalance; // 32500
  const portfolioAllocation = userInputData.portfolioAllocation; //AAPL: 0.2,   GOOG: 0.5,  MSFT: 0.3

  const calculatePortfolioAllocation = () => {
    const calculatedAllocation = {};

    Object.keys(portfolioAllocation).forEach((stock) => {
      const allocation = portfolioAllocation[stock];
      const stockSpent = (initialBalance * allocation).toFixed(2);

      calculatedAllocation[stock] = {
        allocation: (allocation * 100).toFixed(1),
        stockSpent: stockSpent,
      };
    });

    return calculatedAllocation;
  };

  const calculatedPortfolioAllocation = calculatePortfolioAllocation();

  return (
    <div>
      {/* <div className="chart-container" > */}
      <div className="chart-legend">
        <PortfolioAllocationTable
          portfolioAllocation={calculatedPortfolioAllocation}
        />
      </div>
      <div className="chart">
        <PortfolioAllocationPieChart
          portfolioAllocation={calculatedPortfolioAllocation}
        />
      </div>
    </div>
  );
};

export default PortfolioAllocationChartWithLegend;

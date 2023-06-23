"use client";
import React from "react";
import PortfolioAllocationTable from "./PortfolioAllocationTable";
import PortfolioAllocationPieChart from "./PortfolioAllocationPieChart";
import "../styles/PortfolioAllocationChart.css"; // Import the CSS file

const PortfolioAllocationChartWithLegend = (props) => {
  const { userInputData, portfolioValuePerDay } = props;
  const initialBalance = userInputData.initialBalance; // 32500
  const portfolioAllocation = userInputData.portfolioAllocation; //AAPL: 0.2,   GOOG: 0.5,  MSFT: 0.3

  const calculatePortfolioAllocation = () => {
    const calculatedAllocation = {};

    Object.keys(portfolioAllocation).forEach((stock) => {
      const allocation = portfolioAllocation[stock];
      const stockPrice = (initialBalance * allocation).toFixed(2);

      calculatedAllocation[stock] = {
        allocation: (allocation * 100).toFixed(2),
        stockPrice: stockPrice,
        total: initialBalance,
      };
    });

    return calculatedAllocation;
  };
  const calculateEndDateAllocation = () => {
    const calculatedEndDateAllocation = {};
    const firstRow = portfolioValuePerDay[0];

    Object.keys(firstRow.stocks).forEach((stock) => {
      const stockAllocation = stock;
      const stockPrice = firstRow.stocks[stock];

      calculatedEndDateAllocation[stockAllocation] = {
        allocation: ((stockPrice * 100) / firstRow.total).toFixed(2),
        stockPrice: stockPrice,
        total: firstRow.total,
      };
    });

    return calculatedEndDateAllocation;
  };

  const calculatedPortfolioAllocation = calculatePortfolioAllocation();
  const calculatedEndDateAllocation = calculateEndDateAllocation();

  return (
    <div>
      <div className="chart-legend">
        <PortfolioAllocationTable
          initialAllocation={calculatedPortfolioAllocation}
          finalAllocation={calculatedEndDateAllocation}
        />
      </div>
      <div className="chart-container">
        <div className="chart">
          <h1 className="chart-title">Initial Allocation</h1>
          <PortfolioAllocationPieChart
            portfolioAllocation={calculatedPortfolioAllocation}
          />
        </div>
        <div className="chart">
          <h1 className="chart-title">End Date Allocation</h1>
          <PortfolioAllocationPieChart
            portfolioAllocation={calculatedEndDateAllocation}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioAllocationChartWithLegend;

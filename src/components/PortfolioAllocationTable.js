"use client";
import React from "react";
import "../styles/PortfolioValueTable.css";

const PortfolioAllocationTable = (props) => {
  const { portfolioAllocation } = props;

  return (
    <div className="portfolio-value-table-container">
      <h2 className="portfolio-value-table-title">Portfolio Allocation</h2>
      <table className="portfolio-value-table">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Allocation</th>
            <th>Stock Spent</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(portfolioAllocation).map((stock) => (
            <tr key={stock}>
              <td>{stock}</td>
              <td>{portfolioAllocation[stock].allocation}%</td>
              <td>${portfolioAllocation[stock].stockSpent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioAllocationTable;

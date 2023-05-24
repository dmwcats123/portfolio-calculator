import React from "react";
import "../styles/PortfolioValueTable.css"; 

const PortfolioValueTable = (props) => {
  const { portfolioValuePerDay } = props;
  const initialBalance = 32500; // Update this with the actual initial balance

  const getProfitColor = (profit) => {
    if (profit < 0) {
      return "red";
    } else if (profit > 0) {
      return "green";
    } else {
      return "black";
    }
  };

  const getTotalColor = (total) => {
    if (total > initialBalance) {
      return "green";
    } else if (total < initialBalance) {
      return "red";
    } else {
      return "black";
    }
  };

  return (
    <div className="portfolio-value-table-container">
      <h2 className="portfolio-value-table-title">Portfolio Value</h2>
      <table className="portfolio-value-table">
        <thead>
          <tr>
            <th>Date</th>
            {Object.keys(portfolioValuePerDay[0].stocks).map((stock) => (
              <React.Fragment key={stock}>
                <th>{stock} Value</th>
                <th>{stock} Profit</th>
              </React.Fragment>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {portfolioValuePerDay.map((item) => (
            <tr key={item.date}>
              <td>{item.date}</td>
              {Object.keys(item.stocks).map((stock) => (
                <React.Fragment key={stock}>
                  <td>{item.stocks[stock]}</td>
                  <td style={{ color: getProfitColor(item.profits[stock]) }}>
                    {item.profits[stock].toFixed(2)}
                  </td>
                </React.Fragment>
              ))}
              <td style={{ color: getTotalColor(item.total) }}>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioValueTable;

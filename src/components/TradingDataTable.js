import React from "react";
import TradingDataRow from "./TradingDataRow";
import "../styles/TradingDataTable.css"; // Import the CSS file for styling

const TradingDataTable = (props) => {
  const { tradingData, userInputData } = props;
  const startDate = userInputData.startDate;
  const endDate = userInputData.endDate;
  const initialBalance = userInputData.initialBalance; // 32500
  const portfolioAllocation = userInputData.portfolioAllocation; // AAPL: 0.2, GOOG: 0.5, MSFT: 0.3

  const portfolioValue = {};

  Object.keys(tradingData.data).forEach((stock) => {
    const stockData = tradingData.data[stock]; // AAPL, GOOG, MSFT
    const stockDates = Object.keys(stockData); // 2019-02-01, 2019-01-31, 2019-01-30

    const defaultStartDate = stockDates[0]; // first available date as the default start date

    stockDates.forEach((date) => {
      if (date >= startDate && date <= endDate) {
        if (!portfolioValue[date]) {
          portfolioValue[date] = {
            total: 0,
            stocks: {},
            profits: {},
          };
        }

        const allocationPercentage = portfolioAllocation[stock];
        const stockPrice = stockData[date].close;
        const sharesCount =
          (initialBalance * allocationPercentage) / stockPrice;
        const stockValue = sharesCount * stockPrice;

        portfolioValue[date].stocks[stock] = stockValue;
        portfolioValue[date].total += stockValue;

        const initialStockPrice = !stockData[startDate]
          ? stockData[defaultStartDate].close // Use the default start date for initial stock price
          : stockData[startDate].close; // Use the specified start date for initial stock price

        const currentStockPrice = stockPrice;
        const profit = sharesCount * (currentStockPrice - initialStockPrice);

        portfolioValue[date].profits[stock] = profit;
      }
    });
  });

  const result = {
    totalPortfolioValue: portfolioValue[endDate].total.toFixed(2),
    portfolioAllocation: Object.keys(portfolioAllocation).reduce(
      (allocationObj, stock) => {
        allocationObj[stock] = {
          allocation: (portfolioAllocation[stock] * 100).toFixed(1), // Multiply by 100 to display as percentage
          stockSpent: (initialBalance * portfolioAllocation[stock]).toFixed(2),
        };
        return allocationObj;
      },
      {}
    ),
    portfolioValuePerDay: Object.keys(portfolioValue).map((date) => {
      const portfolioDateValue = portfolioValue[date];
      const stocks = portfolioDateValue.stocks;
      const stockValues = Object.keys(stocks).reduce(
        (stockValuesObj, stock) => {
          stockValuesObj[stock] = stocks[stock].toFixed(2);
          return stockValuesObj;
        },
        {}
      );

      const profits = Object.keys(portfolioDateValue.profits).reduce(
        (profitsObj, stock) => {
          profitsObj[stock] = portfolioDateValue.profits[stock].toFixed(2);
          return profitsObj;
        },
        {}
      );

      return {
        date,
        stocks: stockValues,
        profits,
        total: portfolioDateValue.total.toFixed(2),
      };
    }),
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          {Object.keys(result.portfolioAllocation).map((stock) => (
            <React.Fragment key={stock}>
              <th>{stock} Value</th>
              <th>{stock} Profit</th>
            </React.Fragment>
          ))}
        </tr>
      </thead>
      <tbody>
        {result.portfolioValuePerDay.map((item) => (
          <TradingDataRow key={item.date} item={item} />
        ))}
        <tr>
          <td>Total Portfolio Value</td>
          <td colSpan={Object.keys(result.portfolioAllocation).length * 2}>
            {result.totalPortfolioValue}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TradingDataTable;

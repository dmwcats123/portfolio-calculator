import React from "react";
import { CartesianGrid, Legend, Tooltip, XAxis, YAxis, CandlestickChart, Candle } from 'recharts';

const StockPriceCandlestickChart = ({ tradingData }) => {
  const stockData = [];

  Object.keys(tradingData).forEach((stock) => {
    const stockDates = Object.keys(tradingData[stock]);

    stockDates.forEach((date) => {
      const { open, high, low, close } = tradingData[stock][date];

      stockData.push({
        stock,
        date,
        open,
        high,
        low,
        close,
      });
    });
  });

  return (
    <CandlestickChart width={600} height={300} data={stockData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Candle dataKey="close" fill="#8884d8" />
    </CandlestickChart>
  );
};

export default StockPriceCandlestickChart;

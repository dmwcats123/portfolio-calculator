import React from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, Candlestick, LineChart, Line } from 'recharts';

const StockPriceCandlestickChart = ({ stockPrices }) => {
  const data = Object.entries(stockPrices).map(([company, prices]) =>
    Object.entries(prices).map(([date, { open, high, low, close }]) => ({
      company,
      date,
      open,
      high,
      low,
      close,
    }))
  ).flat();

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      {Object.keys(stockPrices).map((company, index) => (
        <Candlestick
          key={company}
          dataKey="open"
          data={data.filter((entry) => entry.company === company)}
          name={`Stock Prices - ${company}`}
          fill={`#${(index + 2) * 333}`}
        />
      ))}
    </LineChart>
  );
};

export default StockPriceCandlestickChart;

"use client";
import React from 'react';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import "../styles/StockPriceCandlestickChart.css";

const StockPriceCandlestickChart = ({ tradingData }) => {
  const dataSeries = [];

  Object.keys(tradingData).forEach((stock, index) => {
    const stockDates = Object.keys(tradingData[stock]);

    const dataPoints = stockDates.map((date) => {
      const { open, high, low, close } = tradingData[stock][date];
      const x = new Date(date);
      const y = [open, high, low, close];
      return { x, y };
    });

    dataSeries.push({
      name: stock,
      data: dataPoints,
      // color: `rgba(${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, 0.7)`,
    });
  });

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    series: dataSeries,
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    legend: {
      show: true,
      position: 'top',
    },
  };

  return (
    <div>
    <h2 className="chart-title">Stock Price Candlestick Chart</h2>
      <ReactApexChart options={options} series={options.series} type="candlestick" height={350} />
      <div className="note">
        <div className="note-title">Note:</div>
        <div className="note-description">
          <div className="note-line">
            <span className="green-candle">Green candle:</span> Represents a bullish (positive) movement in the stock
            price. The close price is higher than the open price.
          </div>
          <div className="note-line">
            <span className="red-candle">Red candle:</span> Represents a bearish (negative) movement in the stock
            price. The close price is lower than the open price.
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPriceCandlestickChart;

// Helper function to generate random values
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

"use client"
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import "../styles/PortfolioValueStackedBarChart.css";

const PortfolioValueStackedBarChart = ({ portfolioValuePerDay }) => {
  // Prepare data for the StackedBarChart
  const chartData = {
    categories: [], // Array to store the dates
    series: [], // Array to store the series data
  };

  // Loop through the portfolioValuePerDay data
  portfolioValuePerDay.forEach((item) => {
    const { date, stocks } = item;

    // Add the date to the categories array
    chartData.categories.push(date);

    // Loop through each stock in the stocks object
    Object.keys(stocks).forEach((stock) => {
      // Check if the series for the stock already exists, if not create it
      const existingSeries = chartData.series.find((series) => series.name === stock);
      if (existingSeries) {
        // Add the value for the stock on the specific date
        existingSeries.data.push(stocks[stock]);
      } else {
        // Create a new series for the stock and add the value for the specific date
        chartData.series.push({
          name: stock,
          data: [stocks[stock]],
        });
      }
    });
  });

  // Configure the options for the StackedBarChart
  const options = {
    chart: {
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: chartData.categories,
    },
    legend: {
      position: 'top',
    },
  };

  return (
    <div>
    <h2 className="chart-title">Portfolio Value per Day Stacked Bar Chart</h2>
      {/* <ReactApexChart options={options} series={chartData.series} type="bar" height={350} /> */}
    </div>
  );
};

export default PortfolioValueStackedBarChart;

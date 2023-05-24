import React from 'react';
import ReactApexChart from 'react-apexcharts';
import "../styles/CompanyProfitsBarChart.css"; 

const CompanyProfitsBarChart = ({ portfolioValuePerDay }) => {
  // Prepare data for the StackedBarChart
  const chartData = {
    categories: [], // Array to store the dates
    series: [], // Array to store the series data
  };

  // Loop through the portfolioValuePerDay data
  portfolioValuePerDay.forEach((item) => {
    const { date, profits } = item;

    // Add the date to the categories array
    chartData.categories.push(date);

    // Loop through each stock in the profits object
    Object.keys(profits).forEach((stock) => {
      // Check if the series for the stock already exists, if not create it
      const existingSeries = chartData.series.find((series) => series.name === stock);
      if (existingSeries) {
        // Add the profit for the stock on the specific date
        existingSeries.data.push(profits[stock]);
      } else {
        // Create a new series for the stock and add the profit for the specific date
        chartData.series.push({
          name: stock,
          data: [profits[stock]],
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
      <h2 className="chart-title">Company Profits and Losses per Day</h2>
      <ReactApexChart options={options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default CompanyProfitsBarChart;

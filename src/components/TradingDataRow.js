import React from 'react';

const TradingDataRow = (props) => {
  const { data, allocation, profits } = props;

  return (
    <tr key={data.date}>
      <td>{data.date}</td>
      {/* <td>{data.total}</td> */}
      {Object.keys(allocation).map((stock) => (
        // <td key={stock}>{data.stocks[stock]}</td>
        <React.Fragment key={stock}>
          <td>{data.stocks[stock]}</td>
          <td>{data.profits[stock]}</td>
        </React.Fragment>
      ))}
      {/* {Object.keys(profits).map((stock) => (
        <td key={stock}>{data.profits[stock]}</td>
      ))} */}
    </tr>
  );
};

export default TradingDataRow;

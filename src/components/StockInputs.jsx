import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/InputForm.css";

function StockInputs({ stocks, percentages, updateStocks, updatePercentages }) {
  const [filteredSymbols, setFilteredSymbols] = useState([]);
  const [symbols, setSymbols] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    fetchSymbols();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setFilteredSymbols([]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [stocks]);

  const addStock = () => {
    updateStocks([...stocks, ""]);
    updatePercentages([...percentages, ""]);
  };

  const deleteStock = (index) => {
    const updatedStocks = [...stocks];
    const updatedPercentages = [...percentages];
    console.log(updatedStocks);
    console.log(updatedPercentages);
    updatedStocks.splice(index, 1);
    updatedPercentages.splice(index, 1);
    console.log(updatedStocks);
    console.log(updatedPercentages);
    updateStocks(updatedStocks);
    updatePercentages(updatedPercentages);
  };

  const handleSearchChange = (event, index) => {
    const updatedStocks = [...stocks];
    updatedStocks[index] = event.target.value;
    setSelectedIndex(index);
    updateStocks(updatedStocks);

    if (event.target.value.length !== 0) {
      setFilteredSymbols(
        symbols.filter((symbol) =>
          symbol.toUpperCase().includes(event.target.value.toUpperCase())
        )
      );
    } else {
      setFilteredSymbols([]);
    }
  };

  const handleFilteredSymbolClicked = (event, index) => {
    handleSearchChange(event, index);
    setFilteredSymbols([]);
  };

  const handlePercentageChange = (event, index) => {
    const updatedPercentages = [...percentages];
    updatedPercentages[index] = event.target.value;
    updatePercentages(updatedPercentages);
  };

  const fetchSymbols = async () => {
    fetch("symbols.json")
      .then((response) => response.json())
      .then((data) => setSymbols(Object.keys(data)))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <div className="input-form-row">
        <div className="w-1/2">
          {stocks.map((stock, index) => (
            <input
              key={index}
              type="text"
              value={stock}
              onChange={(event) => handleSearchChange(event, index)}
              className="input-field-text"
              placeholder="Search symbols..."
            />
          ))}
          {filteredSymbols.length > 0 && (
            <ul className="symbol-list">
              {filteredSymbols.map((symbol) => (
                <li
                  className="symbol-list-item"
                  key={symbol}
                  onClick={() =>
                    handleFilteredSymbolClicked(
                      { target: { value: symbol } },
                      selectedIndex
                    )
                  }
                >
                  {symbol}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="w-2/6">
          {percentages.map((percentage, index) => (
            <input
              key={index}
              type="text"
              value={percentage}
              onChange={(event) => handlePercentageChange(event, index)}
              className="input-field-text"
              placeholder="Enter % allocation"
            />
          ))}
        </div>
        <div className="w-1/6">
          {percentages.map((percentage, index) => (
            <button
              key={index}
              type="button"
              onClick={() => deleteStock(index)}
              className="btn-primary float-none w-full h-"
            >
              <div className="p-0.5">Delete</div>
            </button>
          ))}
        </div>
      </div>
      <div className="input-field py-3">
        <button
          type="button"
          onClick={addStock}
          className="btn-primary float-right"
        >
          Add Stock To Portfolio
        </button>
      </div>
    </div>
  );
}

export default StockInputs;

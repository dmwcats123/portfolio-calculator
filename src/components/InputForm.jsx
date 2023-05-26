"use client";
import React from "react";
import { useState, useEffect } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VisualisationTabs from "./VisualisationTabs";
import "../styles/InputForm.css";

const InputForm = () => {
  const today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  let oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const [stockAllocations, setStockAllocations] = useState({});
  const [currSymbol, setCurrSymbol] = useState("");
  const [symbols, setSymbols] = useState([]);
  const [filteredSymbols, setFilteredSymbols] = useState([]);
  const [currPercentage, setCurrPercentage] = useState(0);
  const [initialBalance, setInitialBalance] = useState(0);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [inputError, setInputError] = useState("");
  const [symbolSearch, setSymbolSearch] = useState("");
  const [marketStackResponseData, setMarketStackResponseData] =
    useState(undefined);
  const [inputData, setInputData] = useState(undefined);
  const [remainingAllocation, setRemainingAllocation] = useState(100);

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
  }, []);

  const fetchSymbols = async () => {
    fetch("symbols.json")
      .then((response) => response.json())
      .then((data) => setSymbols(Object.keys(data)))
      .catch((error) => console.error("Error:", error));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (remainingAllocation) {
      setInputError("Total allocation needs to add up to 100%");
      return;
    }
    let symbolsString = Object.keys(stockAllocations).toString();
    let allocationValues = Object.values(stockAllocations);
    let symbol = symbolsString || "AAPL,GOOGL";
    let date_from = "";
    if (fromDate.toString().split(" ")[0] == "Sun") {
      let sundayDate = new Date(fromDate);
      sundayDate.setDate(sundayDate.getDate() - 2);
      date_from = sundayDate.toISOString().split("T")[0].toString();
    } else if (fromDate.toString().split(" ")[0] == "Sat") {
      let saturdayDate = new Date(fromDate);
      saturdayDate.setDate(saturdayDate.getDate() - 1);
      date_from = saturdayDate.toISOString().split("T")[0].toString();
    } else {
      date_from =
        fromDate.toISOString().split("T")[0].toString() || "2023-05-23";
    }

    let date_to = "";
    if (toDate) {
      date_to = toDate.toISOString().split("T")[0].toString() || "2023-05-24";
      if (toDate.toString().split(" ")[0] == "Sun") {
        let sundayDate = new Date(toDate);
        sundayDate.setDate(sundayDate.getDate() - 2);
        date_to = sundayDate.toISOString().split("T")[0].toString();
      } else if (toDate.toString().split(" ")[0] == "Sat") {
        let saturdayDate = new Date(toDate);
        saturdayDate.setDate(saturdayDate.getDate() - 1);
        date_to = saturdayDate.toISOString().split("T")[0].toString();
      } else {
        date_to = toDate.toISOString().split("T")[0].toString() || "2023-05-24";
      }
    } else {
      date_to = yesterday.toISOString().split("T")[0].toString();
    }
    let allocation = allocationValues || [0.5, 0.5];

    const data = { symbol, date_from, date_to, allocation, initialBalance };
    let marketStackData = await fetch("/api", {
      method: "POST",
      body: JSON.stringify(data),
    });
    marketStackData = await marketStackData.json();
    setMarketStackResponseData(marketStackData);
    fetchUserInputJson(date_from, date_to, initialBalance, stockAllocations);
  };

  const handleSymbolChange = (symbol) => {
    setCurrSymbol(symbol);
    setSymbolSearch(symbol);
    setFilteredSymbols([]);
  };

  const handlePercentageChange = (event) => {
    verifyIntegerInput(event);
    setCurrPercentage(event.target.value);
  };

  const handleBalanceChange = (event) => {
    verifyIntegerInput(event);
    setInitialBalance(parseFloat(event.target.value));
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleSearchChange = (event) => {
    setSymbolSearch(event.target.value);
    setFilteredSymbols(
      symbols.filter((symbol) =>
        symbol.toUpperCase().includes(event.target.value.toUpperCase())
      )
    );
  };

  const verifyIntegerInput = (event) => {
    const validInput = /^[0-9.]*$/.test(event.target.value);
    if (!validInput) {
      setInputError(
        `Invalid input for ${event.target.name}. Only numbers and decimals allowed.`
      );
      return;
    }
    setInputError("");
  };

  const addStock = () => {
    if (!symbols.includes(currSymbol)) {
      setInputError(
        "Only symbols which appear in the dropdown menu are valid."
      );
      return;
    }
    if (currPercentage == "") {
      setInputError("Percentage can not be blank.");
      return;
    }

    const nonStateRemainingAllocation = remainingAllocation - currPercentage;
    if (nonStateRemainingAllocation < 0) {
      setInputError("Total Stock Allocation Should Not Exceed 100%.");
      return;
    }
    setRemainingAllocation(nonStateRemainingAllocation);

    setStockAllocations((prevData) => ({
      ...prevData,
      [currSymbol]: (parseFloat(currPercentage) / 100).toFixed(2),
    }));
    setCurrSymbol("");
    setCurrPercentage("");
    setSymbolSearch("");
  };

  const fetchUserInputJson = (
    startDate,
    endDate,
    initialBalance,
    portfolioAllocation
  ) => {
    const inputDataObj = {
      startDate: startDate,
      endDate: endDate,
      initialBalance: initialBalance,
      portfolioAllocation: portfolioAllocation,
    };
    setInputData(inputDataObj);
  };

  const resetState = () => {
    setStockAllocations({});
    setCurrSymbol("");
    setCurrPercentage(0);
    setInitialBalance(0);
    setFromDate(null);
    setToDate(null);
    setInputError(null);
    setSymbolSearch("");
    setInputData(undefined);
    setMarketStackResponseData(undefined);
    setRemainingAllocation(100);
  };

  return (
    // <div className="input-form-container">
    <div>
      <div className="input-form-row">
        <form className="input-form" onSubmit={handleSubmit}>
          <div className="input-form-column">
            <div className="input-field">
              <label>Search symbols:</label>
              <input
                type="text"
                value={symbolSearch}
                onChange={handleSearchChange}
                className="input-field-text"
                placeholder="Search symbols..."
              />
              {filteredSymbols.length > 0 && (
                <ul className="symbol-list">
                  {filteredSymbols.map((symbol) => (
                    <li
                      className="symbol-list-item"
                      key={symbol}
                      onClick={() => handleSymbolChange(symbol)}
                    >
                      {symbol}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="input-field">
              <label>Percentage:</label>
              <input
                type="text"
                name="percentage"
                value={currPercentage ? currPercentage : ""}
                onChange={handlePercentageChange}
                className="input-field-text"
                placeholder="Percentage"
              />
            </div>
            <div className="input-field">
              <button type="button" onClick={addStock} className="btn-primary">
                Add Stock To Portfolio
              </button>
            </div>
            <div className="input-field">
              <label>Initial Balance:</label>
              <input
                type="text"
                name="initial balance"
                value={initialBalance ? initialBalance : ""}
                onChange={handleBalanceChange}
                className="input-field-text"
                placeholder="Initial Balance"
              />
            </div>
            <div className="input-field">
              <label>Start Date:</label>
              <Datepicker
                className="input-field-datepicker"
                dateFormat="yyyy-MM-dd"
                minDate={oneYearAgo}
                maxDate={yesterday}
                placeholderText="Start Date"
                selected={fromDate}
                onChange={handleFromDateChange}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
            <div className="input-field">
              <label>End Date (Optional):</label>
              <Datepicker
                className="input-field-datepicker"
                dateFormat="yyyy-MM-dd"
                minDate={oneYearAgo}
                maxDate={yesterday}
                placeholderText="End Date (Optional)"
                selected={toDate}
                onChange={handleToDateChange}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />
              <p className="input-form-note">
                Note: if no end date is chosen the default is today.
              </p>
            </div>
            <div className="input-field">
              <button type="submit" className="btn-primary">
                Submit
              </button>

              <button
                type="button"
                onClick={resetState}
                className="btn-secondary"
              >
                Reset
              </button>
            </div>
            {inputError && <div className="input-form-error">{inputError}</div>}
          </div>
          <div className="input-form-column">
            <div className="current-allocation">
              <h1 className="input-form-heading">Current Allocation</h1>
              <h1 className="input-form-subheading">
                ({remainingAllocation}% remaining):
              </h1>
              <ul className="stock-allocations">
                {Object.entries(stockAllocations).map(
                  ([symbol, percentage]) => (
                    <li key={symbol}>
                      {symbol}: {percentage * 100}%
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </form>
      </div>
      {marketStackResponseData && inputData && (
        <VisualisationTabs
          tradingData={marketStackResponseData}
          userInputData={inputData}
        />
      )}
    </div>
  );
};

export default InputForm;

"use client";
import React from "react";
import { useState, useEffect } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VisualisationTabs from "./VisualisationTabs";
import "../styles/InputForm.css";
import StockInputs from "./StockInputs";

const InputForm = () => {
  const today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  let oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const [stocks, setStocks] = useState([""]);
  const [percentages, setPercentages] = useState([""]);
  const [initialBalance, setInitialBalance] = useState(0);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [inputError, setInputError] = useState("");
  const [marketStackResponseData, setMarketStackResponseData] =
    useState(undefined);
  const [inputData, setInputData] = useState(undefined);

  useEffect(() => {
    return () => {};
  }, [stocks]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const stockAllocations = stocks.reduce((result, stock, index) => {
      result[stock] = percentages[index] / 100;
      return result;
    }, {});

    let remainingAllocation = 100;
    percentages.map((percentage) => {
      remainingAllocation -= percentage;
    });
    if (remainingAllocation) {
      setInputError("Total allocation needs to add up to 100%");
      return;
    }
    if (!initialBalance) {
      setInputError("Initial Balance can not be blank");
      return;
    }
    if (!fromDate) {
      setInputError("Start Date can not be blank");
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

  const updateStocks = (stocks) => {
    setStocks(stocks);
  };

  const updatePercentages = (percentages) => {
    setPercentages(percentages);
  };

  const handleBalanceChange = (event) => {
    verifyDecimalInput(event); // Use the updated verification function
    setInitialBalance(parseFloat(event.target.value));
  };

  const verifyDecimalInput = (event) => {
    const validInput = /^\d+(\.\d{0,2})?$/.test(event.target.value);
    if (!validInput) {
      setInputError(
        `Invalid input for ${event.target.name}. Only numbers and decimals up to two points are allowed.`
      );
      return;
    }
    setInputError("");
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
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
    setStocks([""]);
    setPercentages([""]);
    setInitialBalance(0);
    setFromDate(null);
    setToDate(null);
    setInputError(null);
    setInputData(undefined);
    setMarketStackResponseData(undefined);
  };

  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="flex flex-wrap justify-center w-full">
        <form className="input-form w-3/4" onSubmit={handleSubmit}>
          <div className="input-form-column">
            <div className="input-field mb-4">
              <div className="w-full">
                <label className="input-label text-lg font-medium w-full">
                  Initial Balance (USD):
                </label>
              </div>
              <input
                type="text"
                name="initial balance"
                value={initialBalance ? initialBalance : ""}
                onChange={handleBalanceChange}
                className="input-field-text bg-white border border-gray-300 rounded-md py-2 px-3 mt-1 w-full"
                placeholder="Initial Balance"
              />
            </div>
            <div className="input-field mb-4">
              <div className="w-full">
                <label className="input-label text-lg font-medium w-full">
                  Start Date:
                </label>
              </div>
              <Datepicker
                className="input-field-datepicker bg-white border border-gray-300 rounded-md py-2 px-3 mt-1 w-full"
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
            <div className="input-field mb-4">
              <div className="w-full">
                <label className="input-label text-lg font-medium">
                  End Date (Optional):
                </label>
              </div>
              <Datepicker
                className="input-field-datepicker bg-white border border-gray-300 rounded-md py-2 px-3 mt-1 w-full"
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
              <p className="input-form-note text-sm text-gray-500 mt-2">
                Note: If no end date is selected, the default value is the last
                available market close.
              </p>
            </div>
            <div className="input-field flex justify-between">
              <button
                type="submit"
                className="btn-primary bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={resetState}
                className="btn-secondary bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md ml-4"
              >
                Reset
              </button>
            </div>
            {inputError && (
              <div className="input-form-error text-red-500 mt-4">
                {inputError}
              </div>
            )}
          </div>
          <div className="input-form-column py-8 px-0.5">
            <StockInputs
              stocks={stocks}
              percentages={percentages}
              updateStocks={updateStocks}
              updatePercentages={updatePercentages}
            />
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

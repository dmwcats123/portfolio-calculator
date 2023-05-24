"use client"
import React from 'react'
import { useState, useEffect } from "react";
import Datepicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

const InputForm = () => {
    const today = new Date();
    let yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const [stockAllocations, setStockAllocations] = useState({});
    const [currSymbol, setCurrSymbol] = useState("");
    const [symbols, setSymbols] = useState([]);
    const [filteredSymbols, setFilteredSymbols] = useState([]);
    const [currPercentage, setCurrPercentage] = useState("");
    const [initialBalance, setInitialBalance] = useState(0);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [inputError, setInputError] = useState("");
    const [symbolSearch, setSymbolSearch] = useState("");
    const [marketStackResponeData, setMarketStackResponseData ] = useState({});
    const [todaysDate, setTodaysDate ] = useState(new Date());


    useEffect(() => {
        fetchSymbols();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
              setFilteredSymbols([]);
            }
          };

          document.addEventListener('keydown', handleKeyDown);

          return () => {
            document.removeEventListener('keydown', handleKeyDown);
          };
    }, []);

    const fetchSymbols = async () => {
        fetch('symbols.json')
        .then(response => response.json())
        .then(data => setSymbols(Object.keys(data)))
        .catch(error => console.error('Error:', error));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let symbolsString= Object.keys(stockAllocations).toString();
        let allocationValues = Object.values(stockAllocations);
        let symbol = symbolsString || 'AAPL,GOOGL';
        let date_from = "";
        if (fromDate.toString().split(" ")[0] == "Sun") {
            let sundayDate = new Date(fromDate);
            sundayDate.setDate(sundayDate.getDate() - 2);
            date_from = sundayDate.toISOString().split("T")[0].toString()
        } else if (fromDate.toString().split(" ")[0] == "Sat") {
            let saturdayDate = new Date(fromDate);
            saturdayDate.setDate(saturdayDate.getDate() - 1);
            date_from = saturdayDate.toISOString().split("T")[0].toString()
        } else {
            date_from = fromDate.toISOString().split("T")[0].toString() || '2023-05-23';

        }
        
        let date_to = "";
        if(toDate) {
            date_to = toDate.toISOString().split("T")[0].toString() || '2023-05-24';
            if (toDate.toString().split(" ")[0] == "Sun") {
                let sundayDate = new Date(toDate);
                sundayDate.setDate(sundayDate.getDate() - 2);
                date_to = sundayDate.toISOString().split("T")[0].toString()
            } else if (toDate.toString().split(" ")[0] == "Sat") {
                let saturdayDate = new Date(toDate);
                saturdayDate.setDate(saturdayDate.getDate() - 1);
                date_to = saturdayDate.toISOString().split("T")[0].toString()
            } else {
                date_to = toDate.toISOString().split("T")[0].toString() || '2023-05-24';
            }
        } else {
            date_to = yesterday.toISOString().split("T")[0].toString()
        }
        let allocation = allocationValues || [0.5, 0.5];

        const data = { symbol, date_from, date_to, allocation, initialBalance}
        let marketStackData = await fetch('/api', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        marketStackData = await marketStackData.json();
        setMarketStackResponseData(JSON.stringify(marketStackData));
    }

    const handleSymbolChange = (symbol) => {
        setCurrSymbol(symbol);
        setSymbolSearch(symbol);
        setFilteredSymbols([]);
    }

    const handlePercentageChange = (event) => {
        verifyIntegerInput(event);
        setCurrPercentage(event.target.value);
    }

    const handleBalanceChange = (event) => {
        verifyIntegerInput(event);
        setInitialBalance(event.target.value);
    }

    const handleFromDateChange = (date) => {
        setFromDate(date);
    }

    const handleToDateChange = (date) => {
        setToDate(date);
    }

    const handleSearchChange = (event) => {
        setSymbolSearch(event.target.value);
        setFilteredSymbols(symbols.filter((symbol) => symbol.toUpperCase().includes(event.target.value.toUpperCase())));
    }

    const verifyIntegerInput = (event) => {
        const validInput = /^[0-9.]*$/.test(event.target.value);
        if(!validInput) {
            setInputError(`Invalid input for ${event.target.name}. Only numbers and decimals allowed.`);
            return;
        }
        setInputError("");
    }

    const addStock = () => {
        if (!symbols.includes(currSymbol)) {
            setInputError("Only symbols which appear in the dropdown menu are valid.")
            return;
        }
        if (currPercentage == "") {
            setInputError("Percentage can not be blank.")
            return;
        }
        const allocationValues = Object.values(stockAllocations)
        let totalAllocation = 0;
        for (let i = 0; i < allocationValues.length; i++) {
            totalAllocation += parseFloat(allocationValues[i]);
        }
        totalAllocation += parseFloat(currPercentage);
        if(totalAllocation > 100) {
            setInputError("Total Stock Allocation Should Not Exceed 100%.")
            return;
        }

        setStockAllocations(prevData => ({
            ...prevData,
            [currSymbol]: parseFloat(currPercentage)
        }));
        setCurrSymbol("");
        setCurrPercentage("");
        setSymbolSearch("");
    }

   useEffect(() => {
     console.log('marketStackResponeData', marketStackResponeData);
   }, [marketStackResponeData]);


    return(
        <div className = "flex flex-row w-full justify-center">
        <form className = "flex flex-row bg-offWhite shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-1/2" onSubmit={handleSubmit}>
            <div className = "flex flex-col w-full">
            <div className = "w-1/2">
                <input
                    type="text"
                    value={symbolSearch}
                    onChange={handleSearchChange}
                    placeholder="Search symbols..."
                    className ="block bg-offWhite border-grey rounded border-2 text-gray-700 text-sm font-bold mb-2 w-full"
                />
                {filteredSymbols.length > 0 && (
                    <ul>
                    {filteredSymbols.map((symbol) => (
                        <li className="text-gray-700 block px-4 py-2 text-sm hover:bg-sky-200 cursor-pointer" key={symbol} onClick={() => handleSymbolChange(symbol)}>
                        {symbol}
                        </li>
                    ))}
                    </ul>
                )}
            </div>
                <label className = "w-1/2">
                <input className ="block bg-offWhite border-grey rounded border-2 text-gray-700 text-sm font-bold mb-2 w-full" placeholder = "Percentage" type = "text" name = "percentage" value = {currPercentage} onChange={handlePercentageChange}/>
                </label>
                <div className ="flex justify-end w-1/2"><button className = "block bg-offWhite border-grey rounded border-2 text-gray-700 text-sm font-bold mb-2 w-auto" type = "button" onClick = {addStock}>Add Stock To Portfolio</button></div>
                <label className = "w-1/2">
                <input className ="block bg-offWhite border-grey rounded border-2 text-gray-700 text-sm font-bold mb-2 w-full" placeholder = "Initial Balance" type = "text" name = "initial balance" value = {initialBalance ? initialBalance : ""} onChange={handleBalanceChange}/>
                </label>
                <label className = "w-1/2">
                    <Datepicker className ="block bg-offWhite border-grey rounded border-2 text-gray-700 text-sm font-bold mb-2 w-full" dateFormat="yyyy-MM-dd"  minDate = {new Date("2022/05/26")} maxDate = {yesterday} placeholderText = "Start Date" selected = {fromDate} onChange={handleFromDateChange} onKeyDown={(e) => {e.preventDefault();}}/>
                </label>
                <label className = "w-1/2">
                    <Datepicker className ="block bg-offWhite border-grey rounded border-2 text-gray-700 text-sm font-bold mb-2 w-full" dateFormat="yyyy-MM-dd" minDate = {new Date("2022/05/26")} maxDate = {yesterday} placeholderText = "End Date (Optional)" selected = {toDate} onChange={handleToDateChange} onKeyDown={(e) => {e.preventDefault();}}/>
                </label>
                <div className ="flex justify-end w-1/2"><button className = "block bg-offWhite border-grey rounded border-2 text-gray-700 text-sm font-bold mb-2 w-auto" type = "submit">Submit</button></div>
                {inputError && (
                <div className ="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{inputError}</div>
                )}
            </div>
            <div className = "w-1/2">
            <h1>Current Allocation:</h1>
                { Object.entries(stockAllocations).map(([symbol, percentage]) => (
                    <li key={symbol}>{symbol}: {percentage}%</li>
                ))}
            </div>
        </form>
        </div>
    );
};

export default InputForm;
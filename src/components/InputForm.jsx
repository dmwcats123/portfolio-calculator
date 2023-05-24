"use client"
import React from 'react'
import { useState, useEffect } from "react";

const InputForm = () => {
    const [stockAllocations, setStockAllocations] = useState({});
    const [currSymbol, setCurrSymbol] = useState("");
    const [symbols, setSymbols] = useState([]);
    const [filteredSymbols, setFilteredSymbols] = useState([]);
    const [currPercentage, setCurrPercentage] = useState("");
    const [initialBalance, setInitialBalance] = useState(0);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [inputError, setInputError] = useState("");
    const [symbolSearch, setSymbolSearch] = useState("");

    useEffect(() => {
        fetchSymbols();
    }, []);

    const fetchSymbols = async () => {
        fetch('symbols.json')
        .then(response => response.json())
        .then(data => setSymbols(Object.keys(data)))
        .catch(error => console.error('Error:', error));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
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

    const handleFromDateChange = (event) => {
        setFromDate(event.target.value);
    }

    const handleToDateChange = (event) => {
        setToDate(event.target.value);
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
        const allocationValues = Object.values(stockAllocations)
        let totalAllocation = 0;
        console.log(allocationValues);
        for (let i = 0; i < allocationValues.length; i++) {
            totalAllocation += parseFloat(allocationValues[i]);
        }
        totalAllocation += parseFloat(currPercentage);
        console.log(totalAllocation);
        if(totalAllocation > 100) {
            setInputError("Total Stock Allocation Should Not Exceed 100%.")
            return;
        }
        setStockAllocations(prevData => ({
            ...prevData,
            [currSymbol]: currPercentage
        }));
        setCurrSymbol("");
        setCurrPercentage("");
        setSymbolSearch("");
    }



    return(
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
                    <ul  >
                    {filteredSymbols.map((symbol) => (
                        <li className="text-gray-700 block px-4 py-2 text-sm hover:bg-sky-200 cursor-pointer" key={symbol} onClick={() => handleSymbolChange(symbol)}>
                        {symbol}
                        </li>
                    ))}
                    </ul>
                )}
            </div>
               {/* <label className = "w-1/2">
                <input
                className ="block bg-offWhite border-grey rounded border-2 text-gray-700 text-sm font-bold mb-2 w-full"
                type="text"
                value={symbolSearch}
                onChange={handleSearchChange}
                placeholder="Search symbols..."
                />
                <select
                className="block bg-offWhite border-grey rounded border-2 text-gray-700 text-sm font-bold mb-2 w-full"
                name="symbol"
                value={currSymbol}
                onChange={handleSymbolChange}
                >
                    <option value="">Select a symbol</option>
                    {symbols.map((symbol) => (
                        <option key={symbol} value={symbol}>
                        {symbol}
                        </option>
                    ))}
                </select>            
                </label> */}
                <label className = "w-1/2">
                <input className ="block bg-offWhite border-grey rounded border-2 text-gray-700 text-sm font-bold mb-2 w-full" placeholder = "Percentage" type = "text" name = "percentage" value = {currPercentage} onChange={handlePercentageChange}/>
                </label>
                <div className ="flex justify-end w-1/2"><button className = "block bg-offWhite border-grey rounded border-2 text-gray-700 text-sm font-bold mb-2 w-auto" type = "button" onClick = {addStock}>Add Stock To Portfolio</button></div>
                <label className = "w-1/2">
                <input className ="block bg-offWhite border-grey rounded border-2 text-gray-700 text-sm font-bold mb-2 w-full" placeholder = "Initial Balance" type = "text" name = "initial balance" value = {initialBalance ? initialBalance : ""} onChange={handleBalanceChange}/>
                </label>
                <label className = "w-1/2">
                    <input className ="block bg-offWhite border-grey rounded border-2 text-gray-700 text-sm font-bold mb-2 w-full" placeholder = "Start Date" type = "text" name = "date" value = {fromDate} onChange={handleFromDateChange}/>
                </label>
                <label className = "w-1/2">
                <input className ="block bg-offWhite border-grey rounded border-2 text-gray-700 text-sm font-bold mb-2 w-full" placeholder = "End Date" type = "text" name = "date" value = {toDate} onChange={handleToDateChange}/>
                </label>
                <div className ="flex justify-end w-1/2"><button className = "block bg-offWhite border-grey rounded border-2 text-gray-700 text-sm font-bold mb-2 w-auto" type = "submit">Submit</button></div>
                
                {inputError && (
                <div className ="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{inputError}</div>
                )}
            </div>
            <div className = "w-1/2">{
                Object.entries(stockAllocations).map(([symbol, percentage]) => (
                    <li>{symbol}: {percentage}%</li>
                ))}
            </div>
        </form>
    );
};

export default InputForm;
import InputForm from '../components/InputForm'
import APIComponent from './APIComponent'
import TradingDataTable from '../components/TradingDataTable'
const tradingData = {
  "pagination": {
    "limit": 100,
    "offset": 0,
    "count": 22,
    "total": 22
  },
  "data": {
    "AAPL": {
      "2019-02-01": {
        "name": "Apple Inc.",
        "open": 166.96,
        "high": 168.98,
        "low": 165.93,
        "close": 166.52,
        "volume": 32668138.0
      },
      "2019-01-31": {
        "name": "Apple Inc.",
        "open": 166.11,
        "high": 169.0,
        "low": 164.56,
        "close": 166.44,
        "volume": 40739649.0
      },
      "2019-01-30": {
        "name": "Apple Inc.",
        "open": 165.38,
        "high": 167.53,
        "low": 164.39,
        "close": 165.25,
        "volume": 32689293.0
      }
    },
    "GOOG": {
      "2019-02-01": {
        "name": "Alphabet Inc.",
        "open": 1125.3,
        "high": 1135.0,
        "low": 1112.0,
        "close": 1119.92,
        "volume": 1462205.0
      },
      "2019-01-31": {
        "name": "Alphabet Inc.",
        "open": 1103.0,
        "high": 1125.0,
        "low": 1103.0,
        "close": 1122.89,
        "volume": 1538317.0
      },
      "2019-01-30": {
        "name": "Alphabet Inc.",
        "open": 1097.99,
        "high": 1112.23,
        "low": 1093.88,
        "close": 1111.41,
        "volume": 1466892.0
      }
    },
    "MSFT": {
      "2019-02-01": {
        "name": "Microsoft Corporation",
        "open": 103.8,
        "high": 104.1,
        "low": 102.35,
        "close": 102.78,
        "volume": 35535691.0
      },
      "2019-01-31": {
        "name": "Microsoft Corporation",
        "open": 104.76,
        "high": 105.22,
        "low": 104.26,
        "close": 104.43,
        "volume": 31593848.0
      },
      "2019-01-30": {
        "name": "Microsoft Corporation",
        "open": 104.79,
        "high": 106.6,
        "low": 104.47,
        "close": 106.38,
        "volume": 49471866.0
      }
    }
  }
};

const userInputData = {
  "startDate": "2013-03-20",
  "endDate": "2019-02-01",
  "initialBalance": 32500,
  "portfolioAllocation": {
    "AAPL": 0.2,
    "GOOG": 0.5,
    "MSFT": 0.3
  }
};

export default async function Home() {
  return (
     <main>
      <h1 className="flex m-5 justify-center text-4xl font-bold">Portfolio Calculator</h1>
      <InputForm />
      {/* We can then pass the props { symbol, allocation, date_from, date_to, initialBalance } to the APIComponent here */}
      <APIComponent />
      <TradingDataTable tradingData={tradingData} userInputData={userInputData} />
    </main>
  )
}

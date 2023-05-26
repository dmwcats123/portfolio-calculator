import InputForm from "../components/InputForm";
import "../styles/Page.css";
// import VisualisationTabs from '../components/VisualisationTabs'
const tradingData = {
  pagination: {
    limit: 100,
    offset: 0,
    count: 22,
    total: 22,
  },
  // "data": {
  //   "AAPL": {
  //     "2019-02-01": {
  //       "name": "Apple Inc.",
  //       "open": 166.96,
  //       "high": 168.98,
  //       "low": 165.93,
  //       "close": 166.52,
  //       "volume": 32668138.0
  //     },
  //     "2019-01-31": {
  //       "name": "Apple Inc.",
  //       "open": 166.11,
  //       "high": 169.0,
  //       "low": 164.56,
  //       "close": 166.44,
  //       "volume": 40739649.0
  //     },
  //     "2019-01-30": {
  //       "name": "Apple Inc.",
  //       "open": 165.38,
  //       "high": 167.53,
  //       "low": 164.39,
  //       "close": 165.25,
  //       "volume": 32689293.0
  //     }
  //   },
  //   "GOOG": {
  //     "2019-02-01": {
  //       "name": "Alphabet Inc.",
  //       "open": 1125.3,
  //       "high": 1135.0,
  //       "low": 1112.0,
  //       "close": 1119.92,
  //       "volume": 1462205.0
  //     },
  //     "2019-01-31": {
  //       "name": "Alphabet Inc.",
  //       "open": 1103.0,
  //       "high": 1125.0,
  //       "low": 1103.0,
  //       "close": 1122.89,
  //       "volume": 1538317.0
  //     },
  //     "2019-01-30": {
  //       "name": "Alphabet Inc.",
  //       "open": 1097.99,
  //       "high": 1112.23,
  //       "low": 1093.88,
  //       "close": 1111.41,
  //       "volume": 1466892.0
  //     }
  //   },
  //   "MSFT": {
  //     "2019-02-01": {
  //       "name": "Microsoft Corporation",
  //       "open": 103.8,
  //       "high": 104.1,
  //       "low": 102.35,
  //       "close": 102.78,
  //       "volume": 35535691.0
  //     },
  //     "2019-01-31": {
  //       "name": "Microsoft Corporation",
  //       "open": 104.76,
  //       "high": 105.22,
  //       "low": 104.26,
  //       "close": 104.43,
  //       "volume": 31593848.0
  //     },
  //     "2019-01-30": {
  //       "name": "Microsoft Corporation",
  //       "open": 104.79,
  //       "high": 106.6,
  //       "low": 104.47,
  //       "close": 106.38,
  //       "volume": 49471866.0
  //     }
  //   }
  // }
  data: {
    AAPL: {
      "2023-05-24": {
        name: "AAPL",
        open: "650.00",
        high: "655.01",
        low: "647.89",
        close: "652.85",
        volume: 44691310,
      },
      "2023-05-23": {
        name: "AAPL",
        open: "650.00",
        high: "650.94",
        low: "643.05",
        close: "644.11",
        volume: 50747300,
      },
      "2023-05-22": {
        name: "AAPL",
        open: "650.00",
        high: "652.73",
        low: "648.02",
        close: "650.82",
        volume: 43570900,
      },
      "2023-05-19": {
        name: "AAPL",
        open: "650.00",
        high: "650.00",
        low: "644.66",
        close: "645.47",
        volume: 55772400,
      },
    },
    GOOG: {
      "2023-05-24": {
        name: "GOOG",
        open: "1625.00",
        high: "1636.60",
        low: "1609.93",
        close: "1621.80",
        volume: 23087925,
      },
      "2023-05-23": {
        name: "GOOG",
        open: "1625.00",
        high: "1631.37",
        low: "1600.55",
        close: "1603.67",
        volume: 24477949,
      },
      "2023-05-22": {
        name: "GOOG",
        open: "1625.00",
        high: "1671.58",
        low: "1624.21",
        close: "1656.05",
        volume: 29760240,
      },
      "2023-05-19": {
        name: "GOOG",
        open: "1625.00",
        high: "1654.82",
        low: "1605.64",
        close: "1612.57",
        volume: 30268859,
      },
    },
    MSFT: {
      "2023-05-24": {
        name: "MSFT",
        open: "975.00",
        high: "980.48",
        low: "968.43",
        close: "972.27",
        volume: 23219600,
      },
      "2023-05-23": {
        name: "MSFT",
        open: "975.00",
        high: "983.20",
        low: "960.44",
        close: "960.47",
        volume: 30797200,
      },
      "2023-05-22": {
        name: "MSFT",
        open: "975.00",
        high: "987.21",
        low: "973.19",
        close: "982.90",
        volume: 24115700,
      },
      "2023-05-19": {
        name: "MSFT",
        open: "975.00",
        high: "981.19",
        low: "973.86",
        close: "979.93",
        volume: 27529500,
      },
    },
  },
  //"data":{"AAPL":{"2023-05-24":{"name":"AAPL","open":"200.00","high":"201.54","low":"199.35","close":"200.88","volume":44691310},"2023-05-23":{"name":"AAPL","open":"200.00","high":"200.29","low":"197.86","close":"198.19","volume":50747300},"2023-05-22":{"name":"AAPL","open":"200.00","high":"200.84","low":"199.39","close":"200.25","volume":43570900},"2023-05-19":{"name":"AAPL","open":"200.00","high":"200.00","low":"198.36","close":"198.61","volume":55772400}},"GOOG":{"2023-05-24":{"name":"GOOG","open":"500.00","high":"503.57","low":"495.36","close":"499.02","volume":23087925},"2023-05-23":{"name":"GOOG","open":"500.00","high":"501.96","low":"492.48","close":"493.44","volume":24477949},"2023-05-22":{"name":"GOOG","open":"500.00","high":"514.33","low":"499.76","close":"509.55","volume":29760240},"2023-05-19":{"name":"GOOG","open":"500.00","high":"509.17","low":"494.04","close":"496.18","volume":30268859}},"MSFT":{"2023-05-24":{"name":"MSFT","open":"300.00","high":"301.69","low":"297.98","close":"299.16","volume":23219600},"2023-05-23":{"name":"MSFT","open":"300.00","high":"302.52","low":"295.52","close":"295.53","volume":30797200},"2023-05-22":{"name":"MSFT","open":"300.00","high":"303.76","low":"299.44","close":"302.43","volume":24115700},"2023-05-19":{"name":"MSFT","open":"300.00","high":"301.90","low":"299.65","close":"301.52","volume":27529500}}}
  // "data":{"AAPL":{"2023-05-24":{"name":"AAPL","open":"650.00","high":"655.01","low":"647.89","close":"652.85","volume":44691310},"2023-05-23":{"name":"AAPL","open":"650.00","high":"650.94","low":"643.05","close":"644.11","volume":50747300},"2023-05-22":{"name":"AAPL","open":"650.00","high":"652.73","low":"648.02","close":"650.82","volume":43570900},"2023-05-19":{"name":"AAPL","open":"650.00","high":"650.00","low":"644.66","close":"645.47","volume":55772400}},"GOOG":{"2023-05-24":{"name":"GOOG","open":"1625.00","high":"1636.60","low":"1609.93","close":"1621.80","volume":23087925},"2023-05-23":{"name":"GOOG","open":"1625.00","high":"1631.37","low":"1600.55","close":"1603.67","volume":24477949},"2023-05-22":{"name":"GOOG","open":"1625.00","high":"1671.58","low":"1624.21","close":"1656.05","volume":29760240},"2023-05-19":{"name":"GOOG","open":"1625.00","high":"1654.82","low":"1605.64","close":"1612.57","volume":30268859}},"MSFT":{"2023-05-24":{"name":"MSFT","open":"975.00","high":"980.48","low":"968.43","close":"972.27","volume":23219600},"2023-05-23":{"name":"MSFT","open":"975.00","high":"983.20","low":"960.44","close":"960.47","volume":30797200},"2023-05-22":{"name":"MSFT","open":"975.00","high":"987.21","low":"973.19","close":"982.90","volume":24115700},"2023-05-19":{"name":"MSFT","open":"975.00","high":"981.19","low":"973.86","close":"979.93","volume":27529500}}}
};

const userInputData = {
  startDate: "2023-05-19",
  endDate: "2023-05-24",
  initialBalance: "1000",
  portfolioAllocation: { AAPL: 0.2, GOOG: 0.5, MSFT: 0.4 },
};

export default async function Home() {
  return (
    <main>
      <h1 className="header">
        <span className="header-title">Portfolio Calculator</span>
      </h1>

      <InputForm />
      {/* {tradingData && userInputData && (
      <VisualisationTabs tradingData={tradingData} userInputData={userInputData} />
    )}
    {!tradingData && console.log('tradingData is blank')}
    {!userInputData && console.log('userInputData is blank')} */}
    </main>
  );
}

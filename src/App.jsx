import React, { useState } from "react";
import useCustomHook from "./assets/CustomHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [From, SetFrom] = useState("USD");
  const [To, setTo] = useState("PKR");
  const [Amount, setAmount] = useState("");
  const [convertedAmount, SetConvertedAmount] = useState(0);

  const fetchdata = useCustomHook(
    `https://api.currencyapi.com/v3/latest?apikey=cur_live_KZRI4hpo4FEsWgGa7VNjkk8xvv8c3VXSFqcRWKEg&base_currency=${From}`
  );
  if (!fetchdata) {
    return <p>Loading......</p>;
  }

  const { data } = fetchdata;
  //  console.log(data)

  const currencyName = Object.keys(data);

  const handleClick = () => {
    CurrencyConversion();
  };

  const CurrencyConversion = () => {
    let totalChange = Amount * data[To].value;
    totalChange = totalChange.toFixed(2);
    SetConvertedAmount(totalChange);

  };

  const ShuffleCurrency = () => {
    let FromCurrency = From;
    SetFrom(To);
    setTo(FromCurrency);

    };
  // console.log(currencyName)
  return (
    <>
      <div className="main">
        <div className="exhangeRate">
          <span>Exhange Rate</span>
          <h1 onChange={CurrencyConversion}>{convertedAmount}</h1>
        </div>
        <div className="conversion">
          <label htmlFor="Amount">Amount</label>
          <input
            type="text"
            id="amount-box"
            value={Amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <div className="currency">
            <label htmlFor="From">From</label>
            <select
              name=""
              id="From"
              value={From}
              onChange={(e) => SetFrom(e.target.value)}
              readOnly
            >
              {currencyName ? (
                currencyName.map((currency) => {
                  return (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  );
                })
              ) : (
                <option value="PKR">PKR</option>
              )}
            </select>

            <div className="swap-icon">
              <FontAwesomeIcon icon={faShuffle} onClick={ShuffleCurrency} />
            </div>
            <label htmlFor="To">To</label>
            <select
              name=""
              id="To"
              value={To}
              onChange={(e) => setTo(e.target.value)}
              readOnly
            >
              {currencyName ? (
                currencyName.map((currency) => {
                  return (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  );
                })
              ) : (
                <option value="PKR">PKR</option>
              )}
            </select>
          </div>
        </div>
        <button className="convert" onClick={handleClick}>
          Convert
        </button>
      </div>
    </>
  );
}

export default App;

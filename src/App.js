import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [loading, setLoading] = useState(true)
  const [coins, setCoins] = useState([])
  const [optionSelected, setOptionSelected] = useState(null)
  const [usdValue, setUsdValue] = useState(0)
  const onOptionSelected= (e)=>{
    setOptionSelected(coins[e.target.value])
    setUsdValue("")
  }
  const onInputChange = (e)=>setUsdValue(e.target.value)

  useEffect(()=>{
    fetch("https://api.coinpaprika.com/v1/tickers")
     .then(res=>res.json())
     .then(data=>{
      setCoins(data)
      setLoading(false)
     })
  }, [])

  return (
    <div className="App">
      <h1>The Coins!({loading ? "0": coins.length})</h1>
      {loading ? <strong>Loading...</strong> : 
      <select onChange={onOptionSelected}>
        <option disabled>---------Select the coin---------</option>
        {coins.map((coin, i)=>
          <option value={i}>{coin.name} ({coin.symbol}): ${coin.quotes.USD.price.toFixed(6)} USD</option>) }
      </select>
      }
      {optionSelected ? <h2>USD to { optionSelected.symbol } Converter</h2> : null}
      {optionSelected ? <div>
                          <input id='usd'
                                 type='number' 
                                 placeholder=''
                                 min='0'
                                 value={usdValue} 
                                 onChange={onInputChange} />
                          <label htmlFor='usd'> USD = </label>
                          
                          <input id='coinValue'
                                 type='number'
                                 min='0' 
                                 value= {optionSelected ? (usdValue / optionSelected.quotes.USD.price).toFixed(5) : null} 
                                 disabled />
                          <label htmlFor='coinValue'> {optionSelected.symbol} </label>
                        </div>: null}
    </div>
  );
}

export default App;
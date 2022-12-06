import axios from "axios";
import { useEffect, useState } from "react";


const Weather = ({ city }) => {
  const [weather, setWeather] = useState("")

  useEffect(
    () => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => setWeather(response.data))
    }
    , []
  )

  if (weather) {
    return (
      <>
        <h4>Weather in {city}</h4>
        <p>temprature {Math.floor(weather.main.temp - 273.15)} celcius</p>
        <img alt="weather-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>wind {weather.wind.speed} m/s</p>
      </>
    )
  }
}

const Display = ({ counteriesDisplay, handleInput }) => {
  if (counteriesDisplay.length > 20) {
    return <p>Too many matches, specify another filter</p>
  } else if (counteriesDisplay.length < 20 && counteriesDisplay.length > 1) {
    return (
      <ul>
        {counteriesDisplay.map(country => <li key={country.name.official}>{country.name.common} <button value={country.name.common} onClick={handleInput}>show</button></li>)}

      </ul>
    )
  } else if (counteriesDisplay.length === 1) {
    const selectedCountry = counteriesDisplay[0]
    return (
      <div>
        <h1>{selectedCountry.name.common}</h1>
        <p>capital {selectedCountry.capital}</p>
        <p>area {selectedCountry.area}</p>
        <p><strong>languages</strong></p>
        <ul>
          {Object.keys(selectedCountry.languages).map(key => <li key={key}>{selectedCountry.languages[key]}</li>)}
        </ul>
        <img src={`${selectedCountry.flags.png}`} />
        {/* {console.log(process.env.REACT_APP_API_KEY)} */}

        <Weather city={selectedCountry.capital} />
      </div>
    )
  }
}
const App = () => {

  const handleInput = (event) => {
    setSearch(event.target.value)
    setCounteriesDisplay(
      countries.filter(country => country.name.common.includes(event.target.value))
    )

    // console.log(counteriesDisplay)
  }
  const [countries, setCounteries] = useState([])
  const [search, setSearch] = useState("")
  const [counteriesDisplay, setCounteriesDisplay] = useState([])

  useEffect(
    () => {
      axios.get("https://restcountries.com/v3.1/all")
        .then(res => {
          setCounteries(res.data)
        })
    }, []
  )
  return (

    <div>
      find countries: <input value={search} onChange={handleInput} />
      <Display counteriesDisplay={counteriesDisplay} handleInput={handleInput} />

    </div>
  );
}

export default App;

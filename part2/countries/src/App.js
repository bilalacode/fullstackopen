import axios from "axios";
import { useEffect, useState } from "react";


const Display = ({counteriesDisplay}) => {
  if(counteriesDisplay.length > 20){
    return <p>Too many matches, specify another filter</p>
  } else if(counteriesDisplay.length < 20 && counteriesDisplay.length > 1){
    return(
      <ul>
        {counteriesDisplay.map(country => <li key={country.name.official}>{country.name.common}</li>)}
      </ul>
    )
  } else if(counteriesDisplay.length === 1){
    const selectedCountry = counteriesDisplay[0]
    return(
      <div>
        <h1>{selectedCountry.name.common}</h1>
        <p>capital {selectedCountry.capital}</p>
        <p>area {selectedCountry.area}</p>
        <p><strong>languages</strong></p>
        <ul>
        {Object.keys(selectedCountry.languages).map(key => <li key={key}>{selectedCountry.languages[key]}</li>)}
        </ul>
        <img src={`${selectedCountry.flags.png}`}/>
      </div>
    )
  }
}
const App = () => {

  const handleInput = (event) => {
    setSearch(event.target.value)
    setCounteriesDisplay(
      countries.filter(country => country.name.common.includes(search))
    )
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
      <Display counteriesDisplay={counteriesDisplay} />

    </div>
  );
}

export default App;

import {useState, useEffect} from 'react'
import axios from 'axios'

const Search = (props) => {
  return (
    <div>
      Find Countries: <input
        value={props.value}
        onChange={props.onChange}
        />
    </div>
  )
}

const CountryList = ({countries}) => {

  if (countries.length === 0) {
    return (
      <div>No matches found, specify another filter</div>
    )
  }

  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (countries.length === 1) {
    return (
      <ul>
        {countries.map(country => 
            // <li>{country.name}</li>
            <CountryDisplay 
              key={country.name.common} 
              country={country}
              displayed={true}
            />
        )}
      </ul>
    )
  }

  return (
    <ul>
      {countries.map(country => 
          // <li>{country.name}</li>
          <CountryDisplay key={country.name.common} country={country}/>
      )}
    </ul>
  )
}

const CountryDisplay = ({country, displayed=false}) => {

  const api_key = process.env.REACT_APP_API_KEY
  // variable api_key has now the value set in startup
  let [weather, setWeather] = useState({})

  const hook = () => {
    console.log('effect')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`)
      .then(response => {
        console.log('weather promise fulfilled')
        setWeather(response.data)
      })
  }
  
  useEffect(hook, [])

  if (!displayed) displayed=false;

  const [showFull, setShowFull] = useState(false)

  if (displayed && !showFull) {
    setShowFull(true);
  }

  const toggleDisplay = () => {
    setShowFull(!showFull)
  }



  if (!showFull) {
    return (
      <div>
        {country.name.common}
        <button onClick={toggleDisplay}>Show</button>
      </div>
    )
  } 
  else return (
    <div>
      <h2>
        {country.name.common}
        <button onClick={toggleDisplay}>Hide</button>
      </h2>
      <div>Capital: </div>
      <ul>
        {country.capital.map(capital =>
          <li key={capital}>{capital}</li>
        )}
      </ul>
      <div>Area: {country.area}</div>
      <b>Languages:</b>
      <ul>
        {Object.keys(country.languages).map(lang =>
          <li key={lang}>{country.languages[lang]}</li>
        )}
      </ul>
      <img src={country.flags.png} alt="logo"/>
      <Weather country={country} weather={weather}/>
    </div>
  )
}

const Weather = ({country, weather}) => {

  const kelvinToC = (k) => {
    return  (9/5 * (k - 273) + 32)
  }

  const temp = kelvinToC(weather?.main.temp)

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <div>Temperature (F): {temp}</div>

    </div>


  )

}


// {name: "Sweden", languages:["Swedish"]}, 
// {name:"Ireland", languages:["English", "Gaelic"]},
// {name:"Australia", languages:["English"]}

function App() {

  const api_key = process.env.REACT_APP_API_KEY
  // variable api_key has now the value set in startup


  const [countries, setCountries] = useState([
  ])
  const [searchValue, setSearchValue] = useState('')


  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

  const searchValueChange = (e) => {
    setSearchValue(e.target.value)
  }

  const shownCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchValue.toLowerCase()))

  // const shownCountries = countries
  return (

    <div className="App">
      <Search value={searchValue} onChange={searchValueChange}/>
      <CountryList countries={shownCountries}/>
    </div>
  );
}

export default App;

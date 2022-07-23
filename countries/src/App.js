import { useState, useEffect } from "react";
import axios from "axios";

const CountriesFilter = ({ setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      find countries <input onChange={handleFilterChange} />
    </div>
  );
};

const Country = ({ country }) => {

  //for more information on formatting, see this link https://github.com/chubin/wttr.in#one-line-output

  const [weather, setWeather] = useState([])
  const weatherApiUrl = "http://wttr.in/"
  const url = `https://wttr.in/${country.capital}?format=3`
  useEffect(() => {
    axios.get(url)
    .then(response => {
      const weatherData = response.data
      console.log("Received weather data!", weatherData)
      setWeather(weatherData)
    })
  },[])

  console.log("Country: ", country);
  return (
    <div key={country.name.common}>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <img src={country.flags.png} />
      <h2>Weather in {country.capital}</h2>
      {weather ? weather : ""}
    </div>
  );
};

const CountryListItem = ({ country }) => {
  const [show, setShow] = useState(false);
  const handleToggle = (e) => {
    setShow(!show);
  };

  return (
    <div key={country.cca2}>
      <p>{country.name.common}</p>
      <button id={country.name.common} onClick={handleToggle} value={country}>
        show
      </button>
      <div>{show ? <Country country={country} /> : ""}</div>
    </div>
  );
};

const Countries = ({ countries, filter }) => {

  const countriesToShow = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : countries;

  console.log("Countries to filter...", countriesToShow);

  const amountOfCountriesLessThan10 =
    countriesToShow.length <= 10 && countriesToShow.length > 1;
  console.log("Amount of countries var: ", amountOfCountriesLessThan10);

  const singleMatchedCountry = countriesToShow.length === 1;

  return (
    <div>
      {singleMatchedCountry ? (
        <Country country={countriesToShow[0]} />
      ) : amountOfCountriesLessThan10 ? (
        countriesToShow.map((country) => {
          return <CountryListItem country={country} />;
        })
      ) : (
        "Too many matches, try another filter."
      )}
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const restCountriesUrl = "https://restcountries.com/v3.1/all";

  // https://www.reddit.com/r/AutoHotkey/comments/unspt6/update_text_file_based_on_weather_is_it_possible/
  

  useEffect(() => {
    axios.get(restCountriesUrl).then((response) => {
      console.log("Received!");
      const listOfCountries = response.data;
      console.log("First one: ", listOfCountries[0]);
      setCountries(listOfCountries);
    });
  }, []);

  return (
    <div>
      <CountriesFilter setFilter={setFilter} />
      <Countries countries={countries} filter={filter} />
    </div>
  );
}
export default App;

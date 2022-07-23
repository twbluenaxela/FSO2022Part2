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

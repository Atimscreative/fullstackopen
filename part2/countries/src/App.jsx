import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY;

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState({});

  const filteredCountries =
    search.length > 0
      ? countries.filter((country) => {
          return country.name.common
            .toLowerCase()
            .includes(search.toLowerCase());
        })
      : [];

  console.log(api_key);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
        console.log(response.data.length);
      });
  }, []);

  useEffect(() => {
    if (!search) return;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${filteredCountries[0].capital}&APPID=${api_key}`,
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [filteredCountries, search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleShowCountry = (countryName) => {
    setSearch(countryName);
  };

  return (
    <>
      <section>
        <div>
          <span>find countries </span>
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div>
          {filteredCountries.length > 10 && (
            <p>Too many matches, specify another filter</p>
          )}

          <div className="country-list">
            {filteredCountries.length <= 10 &&
              filteredCountries.length > 1 &&
              filteredCountries.map((country) => (
                <div key={country.name.common}>
                  <span>{country.name.common} </span>
                  <button
                    onClick={() => handleShowCountry(country.name.common)}
                  >
                    show
                  </button>
                </div>
              ))}
          </div>

          <div>
            {filteredCountries.length === 1 && (
              <div>
                <h2>{filteredCountries[0].name.common}</h2>
                <p>capital {filteredCountries[0].capital}</p>
                <p>area {filteredCountries[0].area}</p>
                <h3>languages:</h3>
                <ul>
                  {Object.values(filteredCountries[0].languages).map(
                    (language) => (
                      <li key={language}>{language}</li>
                    ),
                  )}
                </ul>
                <img
                  src={filteredCountries[0].flags.png}
                  alt={`Flag of ${filteredCountries[0].name.common}`}
                />

                {weather && (
                  <>
                    <h2>Weather in {filteredCountries[0].name.common}</h2>
                    <p>temperature {weather?.main?.temp} Celsius</p>
                    <img
                      src={`https://openweathermap.org/payload/api/media/file/${weather?.weather[0].icon}.png`}
                      alt={`Weather in ${filteredCountries[0].name.common}`}
                    />
                    <p>wind {weather.wind.speed} m/s</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;

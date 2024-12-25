"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]); // Suggestions state

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setCity(cityName);

    // Trigger auto-suggestions if the city name length is greater than 2
    if (cityName.length > 2) {
      fetchCitySuggestions(cityName);
    }
  };

  const fetchCitySuggestions = async (cityName) => {
    if (!cityName || cityName.length < 2) return; // Only fetch suggestions if city name is sufficiently long

    const apiUrl = process.env.NEXT_AUTO_SUGG_API.replace("{city}", cityName);

    try {
      const response = await axios.get(apiUrl);
      setSuggestions(response.data); // Set suggestions from API
    } catch (err) {
      console.error("Error fetching city suggestions", err);
    }
  };


 const handleSearch = async () => {
   if (!city) {
     setError("Please enter a city name");
     return;
   }

   const apiUrl = process.env.NEXT_PUBLIC_API_URL.replace("{city}", city);

   try {
     const response = await axios.get(apiUrl);
     const kelvinTemp = response.data.main.temp;
     const celsiusTemp = Math.round(kelvinTemp - 273.15);

     setWeatherData({
       ...response.data,
       main: { ...response.data.main, temp: celsiusTemp }, // Updated temp in Celsius
     });
     setError(""); // Reset error on successful fetch
   } catch (err) {
     setError("City not found. Please try again.");
     setWeatherData(null); // Clear weather data on error
   }
 };


  return (
    <div className="container">
      <h1 className="title">Weather Application</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
        className="input"
      />
      <button onClick={handleSearch} className="button">
        Get Weather
      </button>

      {error && <p className="error-message">{error}</p>}

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => setCity(suggestion.name)} // Set city on suggestion click
              className="suggestion-item"
            >
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}

      {weatherData && (
        <div className="weather-data">
          <h2 className="weather-title">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p className="weather-info">Temperature: {weatherData.main.temp}°C</p>
          <p className="weather-info">Humidity: {weatherData.main.humidity}%</p>
          <p className="weather-info">
            Weather: {weatherData.weather[0].description}
          </p>
          <p className="weather-info">
            Wind Speed: {weatherData.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
}

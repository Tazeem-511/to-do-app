"use client";
import { useState } from "react";
import axios from "axios";
import "./styles.css"; // Import the advanced CSS file

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const handleCityChange = (e) => setCity(e.target.value);

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
        main: { ...response.data.main, temp: celsiusTemp },
      });
      setError("");
    } catch {
      setError("City not found. Please try again.");
      setWeatherData(null);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Weather Finder</h1>
      <p className="subtitle">Get real-time weather updates for your city</p>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
          className="city-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="weather-data">
          <h2 className="location">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p className="temperature">{weatherData.main.temp}°C</p>
          <div className="details">
            <p>🌧️ {weatherData.weather[0].description}</p>
            <p>💧 Humidity: {weatherData.main.humidity}%</p>
            <p>🌬️ Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

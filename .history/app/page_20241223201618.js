// Home.js
"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

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
      <h1 className="title">Weather Application</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
        className="input"
      />
      <button onClick={handleSearch} className="button">Get Weather</button>

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="weather-data">
          <h2 className="weather-title">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <Image
            src={`https://flagcdn.com/w320/${weatherData.sys.country.toLowerCase()}.png`}
            alt={`Flag of ${weatherData.sys.country}`}
            width={120}
            height={80}
            className="flag"
          />
          <p className="weather-info">Temperature: {weatherData.main.temp}°C</p>
          <p className="weather-info">Humidity: {weatherData.main.humidity}%</p>
          <p className="weather-info">Weather: {weatherData.weather[0].description}</p>
          <p className="weather-info">Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}


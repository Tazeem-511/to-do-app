"use client";
import { useState } from "react";
import axios from "axios";

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
      <h1>Weather Application</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
      />
      <button onClick={handleSearch}>Get Weather</button>

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="weather-data">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          {/* Display country flag */}
          <Image
            src={`https://flagcdn.com/w320/${weatherData.sys.country.toLowerCase()}.png`}
            alt={`Flag of ${weatherData.sys.country}`}
            className="flag"
          />
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

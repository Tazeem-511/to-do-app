"use client";
import { useState } from "react";
import WeatherData from "./pages/weatherdata/page";
import ForecastData from "./pages/forecast/page";
import AirQualityData from "./pages/airquality/page";



export default function Home() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleCityChange = (e) => setCity(e.target.value);

  const handleSearch = () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }
    setError(""); // Reset error if city is entered
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

      {city && (
        <div className="main-content">
          <WeatherData city={city} />
          <ForecastData city={city} />
          <AirQualityData city={city} />
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [error, setError] = useState("");

  const handleCityChange = (e) => setCity(e.target.value);

  const handleSearch = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    // Get Coordinates for Air Quality and Historical Data (Latitude and Longitude)
    const coordinatesUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}`;

    try {
      // Fetch current weather and coordinates
      const weatherResponse = await axios.get(coordinatesUrl);
      const lat = weatherResponse.data.coord.lat;
      const lon = weatherResponse.data.coord.lon;

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      // Fetch air quality
      const airQualityResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      // Fetch historical weather data (using current timestamp)
      const historicalResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${Math.floor(
          Date.now() / 1000
        )}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      // Process weather data
      const kelvinTemp = weatherResponse.data.main.temp;
      const celsiusTemp = Math.round(kelvinTemp - 273.15);

      setWeatherData({
        ...weatherResponse.data,
        main: { ...weatherResponse.data.main, temp: celsiusTemp },
      });

      setForecastData(forecastResponse.data.list); // Store 5-day forecast
      setAirQualityData(airQualityResponse.data.list[0].main); // Store air quality data
      setHistoricalData(historicalResponse.data); // Store historical data

      setError(""); // Reset error message
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
      setForecastData(null);
      setAirQualityData(null);
      setHistoricalData(null);
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

      {weatherData && (
        <div className="weather-data">
          <Image
            src={`https://flagcdn.com/w320/${weatherData.sys.country.toLowerCase()}.png`}
            alt={`Flag of ${weatherData.sys.country}`}
            width={120}
            height={80}
            className="flag"
          />
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

      {forecastData && (
        <div className="forecast-data">
          <h3>5-Day Forecast</h3>
          {forecastData.map((forecast, index) => (
            <div key={index}>
              <p>
                {forecast.dt_txt}: {Math.round(forecast.main.temp - 273.15)}°C
              </p>
            </div>
          ))}
        </div>
      )}

      {airQualityData && (
        <div className="air-quality">
          <h3>Air Quality</h3>
          <p>AQI: {airQualityData.aqi}</p>
        </div>
      )}

      {historicalData && (
        <div className="historical-data">
          <h3>Historical Weather</h3>
          <p>
            Temperature: {Math.round(historicalData.current.temp - 273.15)}°C
          </p>
        </div>
      )}
    </div>
  );
}

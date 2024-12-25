"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [error, setError] = useState("");

  const handleCityChange = (e) => setCity(e.target.value);

  const handleSearch = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    // Get Coordinates for Air Quality and Historical Data (Latitude and Longitude)
    const coordinatesUrl = `${process.env.NEXT_PUBLIC_WEATHER_API_URL.replace(
      "{city}",
      city
    )}`;

    try {
      console.log("Fetching weather data from:", coordinatesUrl); // Log the URL being called

      // Fetch current weather and coordinates
      const weatherResponse = await axios.get(coordinatesUrl);
      console.log("Weather Data Response:", weatherResponse.data); // Log the response data

      const lat = weatherResponse.data.coord.lat;
      const lon = weatherResponse.data.coord.lon;

      // Fetch 5-day forecast
      const forecastUrl = `${process.env.NEXT_PUBLIC_FORECAST_API_URL.replace(
        "{city}",
        city
      )}`;
      console.log("Fetching forecast data from:", forecastUrl);
      const forecastResponse = await axios.get(forecastUrl);
      console.log("Forecast Data Response:", forecastResponse.data); // Log forecast data

      // Fetch air quality
      const airQualityUrl = `${process.env.NEXT_PUBLIC_AIR_QUALITY_API_URL.replace(
        "{lat}",
        lat
      ).replace("{lon}", lon)}`;
      console.log("Fetching air quality data from:", airQualityUrl);
      const airQualityResponse = await axios.get(airQualityUrl);
      console.log("Air Quality Data Response:", airQualityResponse.data); // Log air quality data

      // Process weather data
      const kelvinTemp = weatherResponse.data.main.temp;
      const celsiusTemp = Math.round(kelvinTemp - 273.15);

      setWeatherData({
        ...weatherResponse.data,
        main: { ...weatherResponse.data.main, temp: celsiusTemp },
      });

      setForecastData(forecastResponse.data.list); // Store 5-day forecast
      setAirQualityData(airQualityResponse.data.list[0].main); // Store air quality data

      setError(""); // Reset error message
    } catch (err) {
      console.error("Error:", err); // Log the error
      setError("City not found. Please try again.");
      setWeatherData(null);
      setForecastData(null);
      setAirQualityData(null);
    }
  };

  return (
    <div className="container">
      <Imag src="/path-to-logo.png" alt="Logo" className="logo" />
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

      <div className="main-content">
        {weatherData && (
          <div className="weather-data">
            <Image
              src={`https://flagcdn.com/w320/${weatherData.sys.country.toLowerCase()}.png`}
              alt={`Flag of ${weatherData.sys.country}`}
              width={90}
              height={auto}
              className="flag"
            />
            <h2 className="weather-title">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p className="weather-info">
              Temperature: {weatherData.main.temp}°C
            </p>
            <p className="weather-info">
              Humidity: {weatherData.main.humidity}%
            </p>
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
      </div>
    </div>
  );
}

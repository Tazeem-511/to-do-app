"use client"; // Ensure this is added at the top to mark this file as a client component

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation"; // Use this instead of useRouter
import Image from "next/image"; // Import Image component to handle images in Next.js
import "./weather.css";

const WeatherDataPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const searchParams = useSearchParams(); // This will provide query parameters

  const city = searchParams.get("city"); // Get city from query params

  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        const coordinatesUrl = `${process.env.NEXT_PUBLIC_WEATHER_API_URL.replace(
          "{city}",
          city
        )}`;
        try {
          const response = await axios.get(coordinatesUrl);
          const kelvinTemp = response.data.main.temp;
          const celsiusTemp = Math.round(kelvinTemp - 273.15);
          const feelsLikeTemp = Math.round(
            response.data.main.feels_like - 273.15
          );
          setWeatherData({
            ...response.data,
            main: {
              ...response.data.main,
              temp: celsiusTemp,
              feels_like: feelsLikeTemp,
            },
          });
          setError("");
        } catch (err) {
          setError("City not found. Please try again.");
          setWeatherData(null);
        }
      };
      fetchWeather();
    }
  }, [city]); // Dependency on city, it will refetch when city changes

  // Render the weather data or error message
  return (
    <div className="weather-data">
      {/* Add a logo */}
      <div className="weather-logo">
        <h1>Weather App</h1>
        {/* Logo from a free source (you can replace this with your own logo) */}
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Weather_icon_-_cloudy.svg"
          alt="Weather Logo"
          width={50}
          height={50}
        />
      </div>
      {weatherData ? (
        <div className="weather-info">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>

          {/* Flag image */}
          <div className="weather-flag">
            <Image
              src={`https://flagcdn.com/w320/${weatherData.sys.country.toLowerCase()}.png`}
              alt={`${weatherData.sys.country} Flag`}
              width={50}
              height={30}
            />
          </div>

          {/* Current Time */}
          <div className="weather-time">
            <p>Local Time: {new Date().toLocaleString()}</p>
          </div>

          {/* Weather Icon */}
          <div className="weather-icon">
            <Image
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              width={50}
              height={50}
            />
          </div>

          {/* Temperature */}
          <p>Temperature: {weatherData.main.temp}°C</p>
          {/* Feels Like Temperature */}
          <p>Feels Like: {weatherData.main.feels_like}°C</p>
          {/* Humidity */}
          <p>Humidity: {weatherData.main.humidity}%</p>
          {/* Pressure */}
          <p>Pressure: {weatherData.main.pressure} hPa</p>
          {/* Weather description */}
          <p>Weather: {weatherData.weather[0].description}</p>
          {/* Wind Speed */}
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      ) : (
        <p className="error-message">{error}</p>
      )}
    </div>
  );
};

export default WeatherDataPage;

"use client"; // Ensure this is added at the top to mark this file as a client component

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation"; // Use this instead of useRouter
import ""

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
          setWeatherData({
            ...response.data,
            main: { ...response.data.main, temp: celsiusTemp },
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
      {weatherData ? (
        <>
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </>
      ) : (
        <p className="error-message">{error}</p>
      )}
    </div>
  );
};

export default WeatherDataPage;

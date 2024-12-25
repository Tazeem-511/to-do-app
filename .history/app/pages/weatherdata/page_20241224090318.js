// "use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router"; // Import the useRouter hook

const WeatherDataPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const { city } = router.query; // Get the city parameter from the query

  // We need to ensure that we only fetch data after the page has mounted.
  useEffect(() => {
    if (!city) return; // If the city is not defined, don't fetch data yet.

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
  }, [city]);

  if (!city) {
    return <p>Please provide a city name.</p>;
  }

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

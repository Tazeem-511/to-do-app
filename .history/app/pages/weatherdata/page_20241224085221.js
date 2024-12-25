"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const WeatherData = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

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
  }, [city]);

  return (
    <div className="weather-data">
      {weatherData ? (
        <>
          <Image
            src={`https://flagcdn.com/w320/${weatherData.sys.country.toLowerCase()}.png`}
            alt={`Flag of ${weatherData.sys.country}`}
            width={90}
            height={90}
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
        </>
      ) : (
        <p className="error-message">{error}</p>
      )}
    </div>
  );
};

export default WeatherData;

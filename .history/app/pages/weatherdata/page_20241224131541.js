"use client"; // Ensure this is added at the top to mark this file as a client component

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation"; // Use this instead of useRouter
import Image from "next/image";
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

  // Map weather conditions to icons
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return "https://image.freepik.com/free-icon/sunny-weather_14881568.png"; // Replace with actual Freepik URL for sunny
      case "Clouds":
        return "https://image.freepik.com/free-icon/cloudy-weather_14881568.png"; // Replace with actual Freepik URL for cloudy
      case "Rain":
        return "https://image.freepik.com/free-icon/rainy-weather_14881568.png"; // Replace with actual Freepik URL for rainy
      case "Snow":
        return "https://image.freepik.com/free-icon/snow-weather_14881568.png"; // Replace with actual Freepik URL for snow
      default:
        return "https://image.freepik.com/free-icon/weather-icon_14881568.png"; // Default icon
    }
  };

  // Render the weather data or error message
  return (
    <div className="weather-data">
      {/* Add a main logo */}
      <div className="weather-logo">
        <Image
          src="https://image.freepik.com/free-icon/weather-icon_14881568.png" // Replace with actual image URL
          alt="Weather App Logo"
          width={100}
          height={100}
        />
        <h1>Weather App</h1>
      </div>
      {weatherData ? (
        <div className="weather-info">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <div className="weather-item">
            <Image
              src={getWeatherIcon(weatherData.weather[0].main)} // Dynamically get the correct icon based on weather condition
              alt="Weather Icon"
              width={30}
              height={30}
            />
            <p>Temperature: {weatherData.main.temp}°C</p>
          </div>
          <div className="weather-item">
            <Image
              src="https://image.freepik.com/free-icon/humidity-icon_14881568.png" // Replace with actual Freepik URL for humidity icon
              alt="Humidity Icon"
              width={30}
              height={30}
            />
            <p>Humidity: {weatherData.main.humidity}%</p>
          </div>
          <div className="weather-item">
            <Image
              src="https://image.freepik.com/free-icon/wind-icon_14881568.png" // Replace with actual Freepik URL for wind icon
              alt="Wind Speed Icon"
              width={30}
              height={30}
            />
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      ) : (
        <p className="error-message">{error}</p>
      )}
    </div>
  );
};

export default WeatherDataPage;

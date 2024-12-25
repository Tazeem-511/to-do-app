"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const handleCityChange = (e) => {
    setCity(e.target.value);
    console.log("City Input Changed:", e.target.value); // Log city input change
  };

  const handleSearch = async () => {
    if (!city) {
      setError("Please enter a city name");
      console.log("Error: City name is empty.");
      return;
    }

    // Fetch the API URL from .env file
    const apiUrl = process.env.NEXT_PUBLIC_API_URL.replace("{city}", city);
    console.log("API URL:", apiUrl); // Log API URL to check if the URL is correct

    try {
      const response = await axios.get(apiUrl);
      console.log("API Response:", response.data); // Log the API response

      // Convert temperature from Kelvin to Celsius
      const kelvinTemp = response.data.main.temp;
      const celsiusTemp = kelvinTemp - 273.15; // Kelvin to Celsius conversion

      // Update the weather data with converted temperature
      setWeatherData({
        ...response.data,
        main: {
          ...response.data.main,
          temp: celsiusTemp.toFixed(2), // Show temperature with two decimal points
        },
      });
      setError("");
    } catch (err) {
      console.error("API Error:", err); // Log the error details
      setError("City not found. Please try again.");
      setWeatherData(null);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Weather Application</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
        style={{ padding: "10px", marginRight: "10px", fontSize: "16px" }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "10px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
        }}
      >
        Get Weather
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div style={{ marginTop: "20px" }}>
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

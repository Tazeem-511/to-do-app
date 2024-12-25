// Home.js
"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

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
      <h1 className="title">Weather Application</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
        className="input"
      />
      <button onClick={handleSearch} className="button">Get Weather</button>

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
          <p className="weather-info">Weather: {weatherData.weather[0].description}</p>
          <p className="weather-info">Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

// styles.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #1d2b64, #f8cdda);
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  max-width: 600px;
  width: 90%;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  text-align: center;
  backdrop-filter: blur(20px);
}

.title {
  margin-bottom: 25px;
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #f9fafb;
  letter-spacing: 2px;
}

.input {
  width: 75%;
  padding: 15px;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
  outline: none;
  background: rgba(255, 255, 255, 0.85);
  color: #333;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out;
}

.input:focus {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.button {
  padding: 15px 30px;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
  background: #ff5722;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
}

.button:hover {
  transform: translateY(-3px);
  background-color: #e64a19;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.error-message {
  color: #ff6b6b;
  margin: 20px 0;
  font-weight: bold;
  font-size: 1.1rem;
}

.weather-data {
  margin-top: 30px;
  padding: 20px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  position: relative;
}

.weather-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #f9fafb;
}

.weather-info {
  margin: 10px 0;
  font-size: 1.2rem;
  font-weight: 500;
  color: #f3f4f6;
}

.flag {
  width: 120px;
  height: auto;
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

@media (max-width: 480px) {
  .title {
    font-size: 2.5rem;
  }

  .input, .button {
    width: 100%;
    font-size: 1rem;
  }

  .button {
    margin-top: 10px;
  }

  .weather-title {
    font-size: 1.8rem;
  }

  .weather-info {
    font-size: 1rem;
  }
}

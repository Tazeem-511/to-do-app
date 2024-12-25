"use client";
import { useState } from "react";
import Link from "next/link";
imp

export default function Home() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleCityChange = (e) => setCity(e.target.value);

 

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
     

      {error && <p className="error-message">{error}</p>}

      {city && (
        <div className="links">
          <Link href={`/pages/weatherdata?city=${city}`} passHref>
            <button className="button">Weather Data</button>
          </Link>
          <Link href={`/pages/forecast?city=${city}`} passHref>
            <button className="button">5-Day Forecast</button>
          </Link>
          <Link href={`/pages/airquality?city=${city}`} passHref>
            <button className="button">Air Quality</button>
          </Link>
        </div>
      )}
    </div>
  );
}

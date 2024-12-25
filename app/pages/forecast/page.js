"use client"; // Make sure to add this to mark it as a client-side component

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation"; // Use useSearchParams instead of useRouter

const ForecastDataPage = () => {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState("");
  const searchParams = useSearchParams(); // Get the search parameters from the URL

  const city = searchParams.get("city"); // Extract 'city' query parameter

  useEffect(() => {
    if (city) {
      const fetchForecast = async () => {
        const forecastUrl = `${process.env.NEXT_PUBLIC_FORECAST_API_URL.replace(
          "{city}",
          city
        )}`;
        try {
          const response = await axios.get(forecastUrl);
          setForecastData(response.data.list);
          setError("");
        } catch (err) {
          setError("Could not fetch forecast data. Please try again.");
          setForecastData(null);
        }
      };
      fetchForecast();
    }
  }, [city]); // Trigger the effect when 'city' changes

  return (
    <div className="forecast-data">
      {forecastData ? (
        <>
          <h3>5-Day Forecast</h3>
          {forecastData.map((forecast, index) => (
            <div key={index}>
              <p>
                {forecast.dt_txt}: {Math.round(forecast.main.temp - 273.15)}°C
              </p>
            </div>
          ))}
        </>
      ) : (
        <p className="error-message">{error}</p>
      )}
    </div>
  );
};

export default ForecastDataPage;

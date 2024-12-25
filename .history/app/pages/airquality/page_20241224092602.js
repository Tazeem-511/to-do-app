"use client"; // Ensure it's a client-side component

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation"; // Use useSearchParams instead of useRouter

const AirQualityDataPage = () => {
  const [airQualityData, setAirQualityData] = useState(null);
  const [error, setError] = useState("");
  const searchParams = useSearchParams(); // Get search parameters
  const city = searchParams.get("city"); // Extract 'city' from query parameters

  useEffect(() => {
    if (city) {
      const fetchAirQuality = async () => {
        const coordinatesUrl = `${process.env.NEXT_PUBLIC_WEATHER_API_URL.replace(
          "{city}",
          city
        )}`;
        try {
          const weatherResponse = await axios.get(coordinatesUrl);
          const lat = weatherResponse.data.coord.lat;
          const lon = weatherResponse.data.coord.lon;

          const airQualityUrl = `${process.env.NEXT_PUBLIC_AIR_QUALITY_API_URL.replace(
            "{lat}",
            lat
          ).replace("{lon}", lon)}`;
          const airQualityResponse = await axios.get(airQualityUrl);
          setAirQualityData(airQualityResponse.data.list[0].main);
          setError("");
        } catch (err) {
          setError("Could not fetch air quality data. Please try again.");
          setAirQualityData(null);
        }
      };
      fetchAirQuality();
    }
  }, [city]);

  return (
    <div className="air-quality">
      {airQualityData ? (
        <>
          <h3>Air Quality</h3>
          <p>AQI: {airQualityData.aqi}</p>
        </>
      ) : (
        <p className="error-message">{error}</p>
      )}
    </div>
  );
};

export default AirQualityDataPage;
import { useState } from "react";

const ForecastDataPage = () => {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const { city } = router.query; // Extract city from query params

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
  }, [city]);

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

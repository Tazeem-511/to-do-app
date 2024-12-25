const AirQualityDataPage = () => {
  const [airQualityData, setAirQualityData] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const { city } = router.query; // Extract city from query params

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

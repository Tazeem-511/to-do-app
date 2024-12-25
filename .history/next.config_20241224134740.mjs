/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "freepik.com", // Allow Freepik domain
      "flagcdn.com", // Allow Flag CDN domain
      "openweathermap.org", // Allow OpenWeatherMap domain
    ],
  },
};

module.exports = nextConfig;

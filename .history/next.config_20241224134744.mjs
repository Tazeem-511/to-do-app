/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      
      "flagcdn.com", // Allow Flag CDN domain
      "openweathermap.org", // Allow OpenWeatherMap domain
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["flagcdn.com"],
    "flagcdn.com", 
      "openweathermap.org", // Allow OpenWeatherMap domain// Allow flagcdn.com for external images
  },
};

export default nextConfig;

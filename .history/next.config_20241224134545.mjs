/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["flagcdn.com"],
    "flagcdn.com", // Allow Flag CDN domain
      "openweathermap.org", // Allow OpenWeatherMap domain// Allow flagcdn.com for external images
  },
};

export default nextConfig;

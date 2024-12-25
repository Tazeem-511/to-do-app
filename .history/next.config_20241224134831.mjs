/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "flagcdn.com", // Allow flagcdn.com for external images
      "openweathermap.org", // Allow openweathermap.org for weather icons
      "freepik.com", // Add other domains as needed
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "flagcdn.com", // Existing domain
      "example.com", // Add the domain of your external images
    ],
  },
};

module.exports = nextConfig;

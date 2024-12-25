/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "flagcdn.com", // Existing domain
      ".com", // Add the domain of your external images
    ],
  },
};

module.exports = nextConfig;

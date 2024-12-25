/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "example.com", // Allow your custom domain
      "freepik.com", // Allow Freepik domain
      "flagcdn.com", // Example of other allowed domains
    ],
  },
};

module.exports = nextConfig;

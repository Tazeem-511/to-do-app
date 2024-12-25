/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "freepik.com", // Allow Freepik domain for general use
      "image.freepik.com", // Allow image subdomain of Freepik for loading images
      "flagcdn.com", // Example of other allowed domains
    ],
  },
};

export default nextConfig;

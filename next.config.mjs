/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com", // IMDb poster images
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", // fallback placeholder images
      },
    ],
  },
};

export default nextConfig;

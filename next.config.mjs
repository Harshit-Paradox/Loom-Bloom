/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "haatbazaar-data.s3.ap-south-1.amazonaws.com", // Your S3 bucket
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Allow Unsplash images
      },
    ],
  },
};

export default nextConfig;

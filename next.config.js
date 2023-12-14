/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "apiquizmaster.swedencentral.cloudapp.azure.com",
        
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

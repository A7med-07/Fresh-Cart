import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // عشان NextAuth يشتغل صح على Production
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/*/**',
      },
    ],
  },
};

export default nextConfig;


 // https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*', // This will allow images from all domains
          },
        ],
      },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    reactCompiler: true,
  },
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 31_536_000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.yandex.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;

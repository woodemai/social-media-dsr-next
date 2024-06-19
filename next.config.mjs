/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  // Adds custom WebPack configuration to our Next.hs setup
  webpack: function (config, { webpack }) {
    // Next.js WebPack Bundler does not know how to handle `.mjs` files on `node_modules`
    // This is not an issue when using TurboPack as it uses SWC and it is ESM-only
    // Once Next.js uses Turbopack for their build process we can remove this
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: { fullySpecified: false },
    });

    // Ignore Sentry's Critical Dependency from Open Telemetry
    // (which is genuinely a cause of concern, but there is no work around at the moment)
    config.ignoreWarnings = [
      {
        module: /@opentelemetry\/instrumentation/,
        message: /Critical dependency/,
      },
    ];

    return config;
  },
  experimental: {
    ppr: true,
    reactCompiler: true,
    optimizePackageImports: [
      '@radix-ui/react-avatar',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-icons',
      '@radix-ui/react-label',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-toast',
      'tailwindcss',
    ],
  },
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

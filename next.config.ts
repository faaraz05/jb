// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   cacheComponents: true,
//   partialPrefetching: true,
//   turbopack: {
//     rules: {
//       '*.css': {
//         loaders: ['@tailwindcss/turbopack'],
//         as: '*.css',
//       },
//     },
//   },
//   images: {
//     // Add remote domains here if you source images from external URLs
//     // remotePatterns: [{ protocol: 'https', hostname: 'example.com' }],
//   },
// };

// export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  images: {
    // Add remote domains here if you source images from external URLs
    // remotePatterns: [{ protocol: 'https', hostname: 'example.com' }],
  },
};

export default nextConfig;


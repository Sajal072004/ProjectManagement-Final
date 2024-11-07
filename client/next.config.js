// next.config.js

export default {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com', // replace with your image host
        pathname: '/**',
      },
    ],
  },
};

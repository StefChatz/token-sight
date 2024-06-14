const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true', // Allows credentials to be sent with cross-origin requests
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Allows all domains to access your resources
          },
          {
            key: 'Access-Control-Expose-Headers',
            value: 'X-Auth', // Exposes X-Auth header to the frontend
          },
        ],
      },
    ];
  },
};

export default nextConfig;

const securityHeaders = [
  {
    key: 'Referrer-Policy',
    value: 'no-referrer-when-downgrade',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const cspHeader = `
    default-src '*';
    script-src '*';
    style-src '*';
    img-src '*';
    font-src '*';
    object-src '*';
    base-uri '*';
    form-action '*';
    frame-ancestors '*';
    upgrade-insecure-requests;
`.replace(/\n/g, '');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/(.*)',
          headers: [
            ...securityHeaders,
            {
              key: 'Content-Security-Policy',
              value: cspHeader,
            },
          ],
        },
      ];
    }
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
}

export default nextConfig;
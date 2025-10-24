import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
};

export default nextConfig;

// Payload will be added later
// import { withPayload } from '@payloadcms/next/withPayload'
// export default withPayload(nextConfig);

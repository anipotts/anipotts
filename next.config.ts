import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
};

export default withNextVideo(nextConfig);

// Payload will be added later
// import { withPayload } from '@payloadcms/next/withPayload'
// export default withPayload(nextConfig);
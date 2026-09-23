import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // যেকোনো এক্সটারনাল ডোমেনের ইমেজ অ্যালাও করবে
      },
    ],
  },
};

export default nextConfig;
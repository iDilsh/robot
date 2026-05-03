import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-2d3e414e-5df8-4b9e-a939-10be840ed437.space-z.ai",
    ".space-z.ai",
    ".space.chatglm.site",
    ".chatglm.site",
  ],
};

export default nextConfig;

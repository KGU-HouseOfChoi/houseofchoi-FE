import type { NextConfig } from "next";
import type { WebpackConfigContext } from "next/dist/server/config-shared";

const nextConfig: NextConfig = {
  images: {
    domains: ["house-of-choi.s3.ap-northeast-2.amazonaws.com"],
  },
  webpack(config, options: WebpackConfigContext) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;

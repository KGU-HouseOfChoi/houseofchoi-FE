import type { NextConfig } from "next";
import type { WebpackConfigContext } from "next/dist/server/config-shared";

const nextConfig: NextConfig = {
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

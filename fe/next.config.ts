// @ts-ignore
import withPWA from "next-pwa";
import type { Configuration } from "webpack";
import type { WebpackConfigContext } from "next/dist/server/config-shared";

const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["house-of-choi.s3.ap-northeast-2.amazonaws.com"],
  },

  experimental: {
    serverActions: true,
  },

  metadataBase: new URL("https://houseofchoi-fe.vercel.app"),

  webpack(config: Configuration, _options: WebpackConfigContext) {
    config.module?.rules?.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default withPWA(nextConfig, {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDev,
});

import type { NextConfig } from "next"
import config from "./config"

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  publicRuntimeConfig: {
    api: config.downstream.api,
    debug: config.debug,
  },
  serverRuntimeConfig: {
    apiUrl: config.downstream.api,
    debug: config.debug,
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.29.149:3000"
  ]
}

export default nextConfig

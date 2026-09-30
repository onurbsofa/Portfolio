import path from "node:path";
import type { NextConfig } from "next";

// GitHub Pages sirve el sitio en https://onurbsofa.github.io/Portfolio/
const BASE_PATH = "/Portfolio";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
  transpilePackages: ["three"],
  turbopack: { root: path.join(__dirname, "..") },
};

export default nextConfig;

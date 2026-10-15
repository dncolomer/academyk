import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: { root },
  async rewrites() {
    return [
      { source: "/p/11945f6d", destination: "/p/11945f6d/index.html" },
      { source: "/p/11945f6d/notebook", destination: "/p/11945f6d/notebook.html" },
    ];
  },
  async headers() {
    return [
      { source: "/p/11945f6d/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/p/11945f6d", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

export default nextConfig;

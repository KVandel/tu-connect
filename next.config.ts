import type { NextConfig } from "next";
//this is for cache if something wrong with cache change this into @type
const nextConfig: NextConfig = {
  /* config options here */
    experimental:{
        staleTimes: {
            dynamic:30,
        }
    },
    serverExternalPackages: ["@node-rs/argon2"],
};

export default nextConfig;

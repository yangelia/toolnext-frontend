
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  trailingSlash: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ftp.goit.study",
        pathname: "/img/**",
      },
    ],
  },
};

module.exports = nextConfig;

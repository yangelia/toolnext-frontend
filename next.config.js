/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  trailingSlash: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ftp.goit.study", pathname: "/img/**" },
      { protocol: "https", hostname: "ac.goit.global", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
};

module.exports = nextConfig;

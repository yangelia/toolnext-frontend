// const nextConfig = {
//   output: "standalone",
//   trailingSlash: false,
// };

// module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ftp.goit.study"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/:path*", 
      },
    ];
  },
};




module.exports = nextConfig;

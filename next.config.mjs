/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
    ],
  },

  experimental: {
    optimizeCss: true,
  },

  assetPrefix: "/", // 정적 자원 경로를 명확하게 설정
};

export default nextConfig;

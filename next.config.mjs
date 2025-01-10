/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  experimental: {
    taint: true,
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
}

export default nextConfig

import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'freepik.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.freepik.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'img.b2bpic.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.b2bpic.net',
        pathname: '/**',
      },
    ],
  },
  staticPageGenerationTimeout: 120,
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);

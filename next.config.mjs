import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Disable ESLint during builds
	eslint: {
		ignoreDuringBuilds: true,
	},
	// Disable TypeScript type checking during builds
	typescript: {
		ignoreBuildErrors: true,
	},
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

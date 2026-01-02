import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				hostname: "**.dunhill.com",
				protocol: "https",
				port: "",
				search: "",
			},
		],
	},
};

export default nextConfig;

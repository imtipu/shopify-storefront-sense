"use client";
import FullScreenBanner from "@/components/home/FullScreenBanner";
import FullScreenGrid from "@/components/collections/FullScreenGrid";
import FeaturedCollection from "@/components/sections/FeaturedCollection";

export default function PageContent() {
	return (
		<>
			<FullScreenBanner />
			<FullScreenGrid />

			<FeaturedCollection />
		</>
	);
}

"use client";
import FullScreenBanner from "@/components/home/FullScreenBanner";
import FullScreenGrid from "@/components/collections/FullScreenGrid";
import GridList from "@/components/products/GridList";

export default function PageContent() {
	return (
		<>
			<FullScreenBanner />
			<FullScreenGrid />
			<div className="flex flex-col w-full relative px-2 py-3">
				<GridList />
			</div>
		</>
	);
}

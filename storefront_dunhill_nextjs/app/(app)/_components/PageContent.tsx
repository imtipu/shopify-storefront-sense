'use client';
import FullScreenBanner from "@/components/home/FullScreenBanner";
import FullScreenGrid from "@/components/collections/FullScreenGrid";
import GridList from "@/components/products/GridList";

export default function PageContent() {
    return (
			<>
				<FullScreenBanner />
            <FullScreenGrid />
            <GridList />
			</>
		);
}
'use client';

import { ClothingProducts } from "@/constants/products";
import GridList from "@/components/products/GridList";

export default function FeaturedCollection() {
    return (
			<div className="flex flex-col w-full relative py-8 items-center justify-center">
				<div className="flex flex-col w-full relative px-2 py-3 xl:px-0 max-w-7xl gap-4"> 
					<h1 className="text-xl font-medium tracking-wide">Featured Collection</h1>
					<div className="flex flex-col w-full">
						<GridList products={ClothingProducts} />
					</div>
				</div>
			</div>
		);
}

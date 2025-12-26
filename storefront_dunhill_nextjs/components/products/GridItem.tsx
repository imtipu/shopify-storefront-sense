'use client';

import Image from "next/image";

import type { Product } from "@/interfaces/products";

interface Props {
	product: Product;
}

export default function GridItem({ product }: Props) {
	return (
		<div className="flex flex-col w-full relative">
			<div className="flex flex-col items-center justify-center max-h-100 relative">
				<Image
					src={product.image}
					alt={product.title}
					width={1000}
					height={1000}
					className="w-full h-full object-cover object-center z-0"
				/>
			</div>
			<div className="flex flex-col z-10 py-2">
				<h2 className="text-lg font-normal tracking-wide">{product.title}</h2>
				<p className="text-sm font-normal">{product.price}</p>
			</div>
		</div>
	);
}
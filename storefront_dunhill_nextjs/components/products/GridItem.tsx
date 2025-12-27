'use client';

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/interfaces/products";

interface Props {
	product: Product;
}

export default function GridItem(props: Props) {
	const { product } = props;

	const images = product?.images || [];
	const image = images.length > 0 ? images[0] : "";
	return (
		<Link
			href={`/products/${product.slug}`}
			className="flex flex-col w-full relative"
		>
			<div className="flex flex-col items-center justify-center max-h-100 relative">
				{image ? (
					<Image
						src={image}
						alt={product.title}
						width={1000}
						height={1000}
						className="w-full h-full object-cover object-center z-0"
					/>
				) : (
					<div className="w-full h-40 object-cover object-center z-0"></div>
				)}
			</div>
			<div className="flex flex-col z-10 py-2">
				<h2 className="text-lg font-normal tracking-wide">{product.title}</h2>
				<p className="text-sm font-normal">{product.price}</p>
			</div>
		</Link>
	);
}
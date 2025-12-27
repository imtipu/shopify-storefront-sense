'use client';

import { motion } from "motion/react";

import GridItem from "./GridItem";
// import { products } from "@/constants/products";

interface Props {
	products: any[];
}

export default function GridList(props: Props) {
	const { products } = props;
    return (
			<div className="flex flex-col w-full relative">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					exit={{ opacity: 0 }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative"
				>
					{products.map((product) => (
						<GridItem key={product.id} product={product} />
					))}
				</motion.div>
			</div>
		);
}
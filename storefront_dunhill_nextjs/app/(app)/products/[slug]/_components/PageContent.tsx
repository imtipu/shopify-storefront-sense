"use client";
import { useEffect } from "react";

import { usePathname, useParams } from "next/navigation";
import Image from "next/image";

import { motion } from "motion/react";

import {
    Tabs,
    Tab,
    Card,
    CardBody,
} from '@heroui/react';

import { ClothingProducts } from "@/constants/products";
import ProductMediaGallery from "@/components/products/ProductMediaGallery";
import VariantPicker from "@/components/products/VariantPicker";

export default function PageContent() {
	const { slug } = useParams();
	const product =
		ClothingProducts.find((product) => product.slug === slug) || null;

	if (!product) {
		return (
			<div className="flex flex-col w-full">
				<h1>Product not found</h1>
			</div>
		);
	}

	useEffect(() => {
		if (product) {
			console.log(product);
			document.title = product.title;
		}
	}, [slug]);

	const images = product?.images || [];
	const image = images.length > 0 ? images[0] : "";

	return (
		<div className="flex flex-col items-center w-full">
			{/* product main content */}
			<div className="flex flex-col w-full max-w-7xl py-8 gap-5">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* product image */}
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="flex flex-col relative"
					>
						<ProductMediaGallery />
					</motion.div>
					{/* product info */}
					<div className="flex flex-col w-full gap-3 px-3 xl:px-0">
						<motion.h1
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="text-xl font-medium tracking-wide"
						>
							{product.title}
						</motion.h1>
						{/* pricing */}
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="flex items-center gap-2"
						>
							<span className="text-lg font-medium tracking-wide">
								{product.price}
								<sup className="text-sm font-normal tracking-wide line-through">
									{product.compare_at_price}
								</sup>
							</span>
							<span className="text-sm font-medium tracking-wide">
								{product.currency}
							</span>
						</motion.div>
						<VariantPicker />
					</div>
				</div>
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="flex flex-col w-full gap-y-2 gap-x-3 px-3 xl:px-0"
				>
					<Tabs
						radius="sm"
						variant="light"
						// className="gap-y-1"
						classNames={{
							tab: "text-sm font-normal tracking-wide px-2 py-1",
							tabContent: "px-2 py-1",
							panel: "py-0",
							tabWrapper: "gap-y-1",
						}}
					>
						<Tab key={"description"} title="Description">
							<Card radius="sm">
								<CardBody>
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5 }}
										className="text-sm font-normal tracking-wide"
									>
										{product?.description}
									</motion.p>
								</CardBody>
							</Card>
						</Tab>
						<Tab key={"shipping"} title="Shipping">
							<Card radius="sm">
								<CardBody>
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5 }}
										className="text-sm font-normal tracking-wide"
									>
										Shipping
									</motion.p>
								</CardBody>
							</Card>
						</Tab>
					</Tabs>
				</motion.div>
			</div>
		</div>
	);
}

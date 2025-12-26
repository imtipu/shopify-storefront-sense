"use client";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { useHeaderStore } from "@/stores/header";

export default function FullScreenBanner() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const headerHeight = useHeaderStore((state) => state.height);

	return (
		<div
			ref={sectionRef}
			className="w-full flex flex-col items-center justify-end relative"
			style={{
				minHeight: "100dvh",
				marginTop: `-${headerHeight}px`,
			}}
		>
			<motion.div
				initial={{ opacity: 0.5 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				exit={{ opacity: 0 }}
				className="absolute top-0 left-0 w-full h-dvh"
			>
				<Image
					src="/banners/home_main_banner.jpg"
					alt="Full Screen Banner"
					width={1000}
					height={1000}
					loading="lazy"
					className="absolute top-0 left-0 w-full h-full object-cover z-0"
				/>
			</motion.div>
			<div className="flex flex-col items-center justify-center z-10 pb-10">
				<motion.h3
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					exit={{ opacity: 0, y: 10 }}
					className="text-white text-lg font-semibold uppercase"
				>
					The gift of time
				</motion.h3>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					exit={{ opacity: 0, y: 10 }}
					className="text-white text-sm font-normal"
				>
					<Link href="/collections" className="text-white text-sm font-normal">
						Discover precious gifts.
					</Link>
				</motion.div>
			</div>
		</div>
	);
}

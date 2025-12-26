"use client";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";

export default function FullScreenBanner() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [bannerTopPosition, setBannerTopPosition] = useState(0);
	const [marginTop, setMarginTop] = useState(0);

	useEffect(() => {
		if (sectionRef.current) {
			const position = sectionRef.current.getBoundingClientRect().top;
			console.log(position);
			setBannerTopPosition(position);
			setMarginTop(position);
		}
	}, [
	]);

	// set sectionRef margin top on scroll
	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		if (sectionRef.current) {
	// 			const position = window.scrollY;
	// 			setMarginTop(position);
	// 		}
	// 	};
	// 	window.addEventListener("scroll", handleScroll);
	// 	return () => {
	// 		window.removeEventListener("scroll", handleScroll);
	// 	};
	// }, []);
	return (
		<div
			ref={sectionRef}
			className="w-full flex flex-col items-center justify-end sticky top-0"
			style={{
				// height: `calc(100dvh - ${bannerTopPosition}px)`,
				minHeight: "100dvh",
				marginTop: `-${marginTop}px`,
			}}
		>
			<motion.div
				initial={{ opacity: 0 }}
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
					The gift of time - height {bannerTopPosition}, margin top {marginTop}
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

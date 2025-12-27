"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import BrandLogo from "@/assets/logo/brand-logo.svg";
import BrandLogoWhite from "@/assets/logo/brand-logo-white.svg";
import Link from "next/link";

import { LeftMenu, RightMenu } from "@/constants/menu/header";
import AnnouncementBar from "./AnnouncementBar";
import { useHeaderStore } from "@/stores/header";
import MenuDrawer from "../sidebars/MenuDrawer";


export default function SiteHeader() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const topPosition = useHeaderStore((state) => state.topPosition);
	const height = useHeaderStore((state) => state.height);
	const setHeight = useHeaderStore((state) => state.setHeight);

	console.log(topPosition, height);

	useEffect(() => {
		if (sectionRef.current) {
			// get height of the section
			const height = sectionRef.current.offsetHeight;
			setHeight(height);
		}
	}, []);
	return (
		<div ref={sectionRef} className="flex flex-col w-full z-50 sticky top-0">
			<AnnouncementBar />
			<div className="flex flex-col w-full bg-transparent py-2 z-50 relative">
				{/* left and right menu with logo in center */}
				<div className="grid grid-cols-3 items-cente">
					<div className="flex flex-col">
						<div className="items-center hidden md:flex">
							<MenuDrawer />
							{LeftMenu.map((item, index) => (
								<motion.div
									initial={{ y: -10, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									exit={{ y: 10, opacity: 0 }}
									key={index}
								>
									<Link href={item.href} className="text-white px-2 py-1">
										{item.label}
									</Link>
								</motion.div>
							))}
						</div>
					</div>

					<div className="flex items-center justify-center">
						<motion.div
							initial={{ y: -10, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.5 }}
							exit={{ y: 10, opacity: 0 }}
						>
							<Image
								src={BrandLogoWhite}
								alt="Logo"
								width={100}
								height={100}
								className="filter invert-100"
							/>
						</motion.div>
					</div>
					<div className="ml-auto">
						<div className="items-center hidden md:flex">
							{/* Right Menu motion index reverse delay */}
							{RightMenu.map((item, index) => (
								<motion.div
									initial={{ y: -10, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{
										duration: 0.5,
										delay: (RightMenu.length - index) * 0.1,
									}}
									exit={{ y: 10, opacity: 0 }}
									key={index}
								>
									<Link
										href={item.href}
										className="text-white px-2 py-1 hover:scale-105 transition-all duration-100"
									>
										{item.label}
									</Link>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import BrandLogo from "@/assets/logo/brand-logo.svg";
import BrandLogoWhite from "@/assets/logo/brand-logo-white.svg";
import Link from "next/link";
import { Button } from "@heroui/react";
import { LeftMenu, RightMenu } from "@/constants/menu/header";
import AnnouncementBar from "./AnnouncementBar";
import { useHeaderStore, useSidebarMenu } from "@/stores/header";
import { useCartStore } from "@/stores/cart";
import { useRouter, usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa6";

export default function SiteHeader() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const pathname = usePathname();
	const { onOpen } = useSidebarMenu();
	const setHeight = useHeaderStore((state) => state.setHeight);
	const onOpenCart = useCartStore((state) => state.onOpen);

	useEffect(() => {
		if (sectionRef.current) {
			// get height of the section
			const height = sectionRef.current.offsetHeight;
			setHeight(height);
		}
	}, []);

	const sectionBackground = () => {
		if (pathname !== "/") {
			return "white";
		}
		return "transparent";
	};

	const linkColor = () => {
		if (pathname !== "/") {
			return "black";
		}
		return "white";
	};

	const logoClass = () => {
		if (pathname !== "/") {
			return "";
		}
		return "filter invert-100";
	};

	return (
		<div ref={sectionRef} className="flex flex-col w-full z-50 sticky top-0">
			<AnnouncementBar />
			<div
				className="flex flex-col w-full py-2 z-50 relative"
				style={{ backgroundColor: sectionBackground() }}
			>
				{/* left and right menu with logo in center */}
				<div className="grid grid-cols-3 items-cente">
					<div className="flex flex-col">
						<div className="items-center hidden md:flex">
							<Button
								onPress={onOpen}
								startContent={<FaBars />}
								isIconOnly
								variant="flat"
								size="md"
								className="bg-transparent"
								style={{ color: linkColor() }}
							></Button>
							{LeftMenu.map((item, index) => (
								<motion.div
									initial={{ y: -10, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									exit={{ y: 10, opacity: 0 }}
									key={index}
								>
									<Link
										href={item.href}
										className="px-2 py-1"
										style={{ color: linkColor() }}
									>
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
							onClick={() => router.push("/")}
							className="cursor-pointer"
						>
							<Image
								src={BrandLogoWhite}
								alt="Logo"
								width={100}
								height={100}
								className={logoClass()}
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
										className="px-2 py-1 hover:scale-105 transition-all duration-100"
										onClick={(e) => {
											if (item.label === "Cart") {
												e.preventDefault();
												onOpenCart();
											}
										}}
										style={{ color: linkColor() }}
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

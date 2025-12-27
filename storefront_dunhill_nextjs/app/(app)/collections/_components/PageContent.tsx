"use client";

import Image from "next/image";
import { CATEGORIES } from "@/constants/categories";
import Link from "next/link";

export default function PageContent() {
	return (
		<div className="flex flex-col w-full">
			{/* header content */}
			<div className="flex flex-col w-full max-w-7xl mx-auto pt-5 pb-2">
				<h1 className="text-2xl font-medium tracking-tight">Collections</h1>
			</div>
			{/* main content */}
			<div className="flex flex-col w-full max-w-7xl mx-auto pt-2 pb-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-2">
                    {CATEGORIES.map((category, index) => (
                        <Link key={index} href={`/collections/${category.slug}`} className="group flex flex-col relative">
							{category?.image ? (
								<div className="flex items-center justify-center w-full h-48 relative overflow-hidden">
									<Image
										src={category.image}
										alt={category.title}
										width={600}
										height={600}
										className="w-full h-full object-cover object-center opacity-70 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
									/>
								</div>
							) : (
								<div className="w-full h-48 bg-gray-100"></div>
							)}
							<h2 className="text-base font-medium tracking-tight">
								{category.title}
							</h2>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

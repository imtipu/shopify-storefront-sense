// product media gallery with featured image and thumbnail images

"use client";
import { useState } from "react";
import Image from "next/image";
import { Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ProductGalleryImages } from "@/constants/media/products";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Button } from "@heroui/react";

export default function ProductMediaGallery() {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
	const [controlledSwiper, setControlledSwiper] = useState(null);

	return (
		<div className="flex flex-col gap-4 w-full">
			<div className="relative group w-full aspect-4/5 max-h-[500px]">
				<Swiper
					spaceBetween={10}
					navigation={{
						prevEl: ".swiper-button-prev-custom",
						nextEl: ".swiper-button-next-custom",
					}}
					thumbs={{
						swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
					}}
					modules={[FreeMode, Navigation, Thumbs]}
					observer={true}
					observeParents={true}
					className="w-full h-full bg-gray-50 rounded-lg overflow-hidden"
				>
					{ProductGalleryImages.images.map((image, index) => (
						<SwiperSlide key={index} className="relative w-full h-full bg-white">
							<Image
								src={image.src}
								alt={image.alt}
								fill
								className="object-cover object-center"
								priority={index === 0}
							/>
						</SwiperSlide>
					))}
				</Swiper>

				{/* Custom Navigation Arrows */}
				<Button
					isIconOnly
					className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm text-black shadow-lg transition-all hover:bg-white hover:scale-110 disabled:opacity-0 group-hover:opacity-100 lg:opacity-0">
					<HiChevronLeft className="w-6 h-6" />
				</Button>
				<Button
					isIconOnly
					className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm text-black shadow-lg transition-all hover:bg-white hover:scale-110 disabled:opacity-0 group-hover:opacity-100 lg:opacity-0">
					<HiChevronRight className="w-6 h-6" />
				</Button>
			</div>

			<Swiper
				onSwiper={setThumbsSwiper}
				spaceBetween={10}
				slidesPerView={2}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className="w-full thumbs-gallery"
			>
				{ProductGalleryImages.images.map((image, index) => (
					<SwiperSlide
						key={index}
						className="relative aspect-square cursor-pointer rounded-md overflow-hidden border-2 border-transparent transition-all hover:border-black/50 [&.swiper-slide-thumb-active]:border-black max-h-[100px] max-w-[100px] flex flex-col items-center justify-center"
					>
						<Image
							src={image.src}
							alt={image.alt}
							fill
							className="object-cover object-center w-full"
						/>
					</SwiperSlide>
				))}
            </Swiper>
		</div>
	);
}

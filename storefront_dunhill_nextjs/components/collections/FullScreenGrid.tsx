// section height full screen
// grid 1 column on mobile and 3 column on desktop
// each row height full screen

'use client';

import Image from "next/image";

export default function FullScreenGrid() {
    return (
			<div className="flex flex-col w-full h-dvh relative">
				<div className="grid grid-cols-1 grid-cols-2 h-full">
					<div className="flex flex-col h-full relative items-center justify-center">
						<Image
							src="/images/dunhill-gifting-1.jpg"
							alt="Full Screen Banner"
							width={1000}
							height={1000}
							className="absolute top-0 left-0 w-full h-dvh object-cover z-0"
						/>
						<div className="flex flex-col items-center justify-center z-10">
							<h3 className="text-white text-lg font-semibold uppercase">
								The gift of time
							</h3>
							<p className="text-white text-sm font-normal">
								Discover precious gifts.
							</p>
						</div>
					</div>
					<div className="flex flex-col h-full relative items-center justify-center">
						<Image
							src="/images/dunhill-gifting-2.jpg"
							alt="Full Screen Banner"
							width={1000}
							height={1000}
							className="absolute top-0 left-0 w-full h-dvh object-cover z-0"
						/>
						<div className="flex flex-col items-center justify-center z-10">
							<h3 className="text-white text-lg font-semibold uppercase">
								The gift of time
							</h3>
							<p className="text-white text-sm font-normal">
								Discover precious gifts.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
}
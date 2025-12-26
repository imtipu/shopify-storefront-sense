"use client";

import Link from "next/link";

export default function MainFooter() {
	return (
		<div className="flex flex-col w-full bg-black items-center justify-center py-10">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl">
				<div className="flex flex-col gap-2">
					<h3 className="text-white text-md font-medium">Customer Service</h3>
					<div className="flex flex-col gap-1">
						<Link
							href={"#"}
							className="text-white text-sm hover:pl-0.5 transition-all duration-300"
						>
							Shipping
						</Link>
						<Link
							href={"#"}
							className="text-white text-sm hover:pl-0.5 transition-all duration-300"
						>
							Returns and Refunds
						</Link>
						<Link
							href={"#"}
							className="text-white text-sm hover:pl-0.5 transition-all duration-300"
						>
							Contact Us
						</Link>
						<Link
							href={"#"}
							className="text-white text-sm hover:pl-0.5 transition-all duration-300"
						>
							Track Your Order
						</Link>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<h3 className="text-white text-md font-medium">Legal</h3>
					<div className="flex flex-col gap-1">
						<Link
							href={"#"}
							className="text-white text-sm hover:pl-0.5 transition-all duration-300"
						>
							Privacy Policy
						</Link>
						<Link
							href={"#"}
							className="text-white text-sm hover:pl-0.5 transition-all duration-300"
						>
							Terms and Conditions
						</Link>
						<Link
							href={"#"}
							className="text-white text-sm hover:pl-0.5 transition-all duration-300"
						>
							Cookie Policy
						</Link>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<h3 className="text-white text-md font-medium">Social</h3>
					<div className="flex flex-col gap-1">
						<Link
							href={"#"}
							className="text-white text-sm hover:pl-0.5 transition-all duration-300"
						>
							Facebook
						</Link>
						<Link
							href={"#"}
							className="text-white text-sm hover:pl-0.5 transition-all duration-300"
						>
							Instagram
						</Link>
						<Link
							href={"#"}
							className="text-white text-sm hover:pl-0.5 transition-all duration-300"
						>
							Twitter
                        </Link>
                        <Link
                            href={"#"}
                            className="text-white text-sm hover:pl-0.5 transition-all duration-300"
                        >
                            YouTube
                        </Link>
					</div>
				</div>
			</div>
		</div>
	);
}

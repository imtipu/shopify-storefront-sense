"use client";

import { motion } from "motion/react";
import { Button, Image, Divider } from "@heroui/react";
import { IoAddOutline, IoRemoveOutline, IoArrowForward } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi2";
import Link from "next/link";
import { MotionButton } from "@/components/motion/button";

const MOCK_CART_ITEMS = [
	{
		id: "1",
		name: "Belgrave Leather Tote",
		price: 1250,
		quantity: 1,
		color: "Oxford Blue",
		image: "/images/product-1.jpg",
	},
	{
		id: "2",
		name: "Signature Canvas Portfolio",
		price: 695,
		quantity: 1,
		color: "Black",
		image: "/images/product-2.jpg",
	},
];

export default function PageContent() {
	const subtotal = MOCK_CART_ITEMS.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	if (MOCK_CART_ITEMS.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
				<h1 className="text-2xl font-medium uppercase tracking-widest">
					Your Bag is Empty
				</h1>
				<p className="text-gray-500 max-w-md">
					Explore our latest collections and find something exceptional to add
					to your bag.
				</p>
				<Button
					as={Link}
					href="/"
					variant="bordered"
					radius="none"
					className="uppercase tracking-widest text-xs border-black text-black px-12 h-12"
				>
					Start Shopping
				</Button>
			</div>
		);
	}

	return (
		<div className="flex flex-col w-full items-center px-3 md:px-4 lg:px-5">
			<div className="flex flex-col w-full max-w-7xl py-6 md:py-10">
				<div className="flex flex-col gap-2 mb-4">
					<h1 className="text-md md:text-lg font-medium tracking-tight uppercase">
						Your Bag ({MOCK_CART_ITEMS.length})
					</h1>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
					{/* Cart Items */}
					<div className="lg:col-span-8 flex flex-col gap-4">
						<div className="flex flex-col">
							{MOCK_CART_ITEMS.map((item, index) => (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									key={item.id}
									className="flex flex-col"
								>
									<div className="flex gap-3 md:gap-4 py-6 first:pt-0 border-b border-gray-100 last:border-0 group">
										<div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 relative overflow-hidden">
											<Link
												href={`/products/${item.id}`}
												className="flex flex-col items-center justify-center h-full w-full"
											>
												<Image
													src={item.image}
													alt={item.name}
													className="object-cover object-center w-full h-full hover:scale-105 transition-transform duration-500"
													radius="none"
												/>
											</Link>
										</div>
										<div className="flex flex-col flex-1 py-1">
											<div className="flex justify-between items-start">
												<div className="flex flex-col gap-1">
													<Link
														href={`/products/${item.id}`}
														className="hover:text-gray-600 transition-colors"
													>
														<h3 className="font-medium text-sm md:text-base tracking-wide uppercase">
															{item.name}
														</h3>
													</Link>
													<p className="text-xs text-gray-500 uppercase tracking-widest">
														{item.color}
													</p>
												</div>
												<Button
													isIconOnly
													variant="light"
													color="danger"
													className="transition-colors"
												>
													<HiOutlineTrash size={18} />
												</Button>
											</div>

											<div className="flex justify-between items-center mt-auto">
												<div className="flex items-center border border-gray-200 overflow-hidden rounded-md h-8">
													<Button
														isIconOnly
														radius="none"
														variant="flat"
														className="min-w-7 max-w-7 h-full"
													>
														<IoRemoveOutline size={14} />
													</Button>
													<span className="px-3 py-0.5 text-sm">
														{item.quantity}
													</span>
													<Button
														isIconOnly
														variant="flat"
														radius="none"
														className="min-w-7 max-w-7 h-full"
													>
														<IoAddOutline size={14} />
													</Button>
												</div>
												<p className="font-medium text-sm">
													${item.price.toLocaleString()}
												</p>
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>

					{/* Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-4 flex flex-col gap-2 md:gap-3 lg:gap-4">
						<div className="bg-gray-50/50 px-3 py-2 flex flex-col gap-2 md:gap-3 lg:gap-4 sticky top-32">
							<h2 className="text-sm font-medium uppercase tracking-widest border-b border-black/10 pb-4">
								Order Summary
							</h2>
							<div className="flex flex-col gap-4">
								<div className="flex justify-between items-center w-full">
									<span className="text-xs font-medium uppercase tracking-tight text-gray-600">
										Subtotal
									</span>
									<span className="text-lg font-medium">
										${subtotal.toLocaleString()}
									</span>
								</div>
								<div className="flex justify-between items-center w-full">
									<span className="text-xs font-medium uppercase tracking-tight text-gray-600">
										Shipping
									</span>
									<span className="text-xs font-medium uppercase tracking-tight">
										Calculated at checkout
									</span>
								</div>
							</div>

							<Divider className="bg-black/5" />

							<div className="flex justify-between items-center w-full">
								<span className="text-sm font-semibold uppercase tracking-widest">
									Total
								</span>
								<span className="text-xl font-semibold">
									${subtotal.toLocaleString()}
								</span>
							</div>

							<p className="text-xs text-gray-400 leading-relaxed italic">
								Complimentary shipping on all orders over $500. Secure checkout
								guaranteed.
							</p>

							<div className="flex flex-col gap-3">
								<MotionButton
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5 }}
									className="w-full bg-black text-white rounded-none uppercase tracking-widest text-sm font-medium group"
								>
									Proceed to Checkout
									<IoArrowForward className="group-hover:translate-x-1 transition-transform" />
								</MotionButton>
								<MotionButton
									as={Link}
									href="/"
									variant="bordered"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.1 }}
									className="w-full rounded-none uppercase tracking-widest text-xs text-black border-black"
								>
									Continue Shopping
								</MotionButton>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}

"use client";

import { useEffect } from "react";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Button,
	Image,
	Divider,
} from "@heroui/react";
import { useCartStore } from "@/stores/cart";
import { IoAddOutline, IoRemoveOutline, IoArrowForward } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi2";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function CartDrawer() {
	const { isOpen, onClose, onOpenChange } = useCartStore();
	const pathname = usePathname();

	const subtotal = MOCK_CART_ITEMS.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	useEffect(() => {
		onClose();
	}, [pathname]);

	return (
		<Drawer
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			placement="right"
			size="md"
			backdrop="blur"
			classNames={{
				base: "bg-white text-black max-w-[450px]",
				header: "border-b border-gray-100 py-4 px-5",
				body: "px-4 py-6",
				footer: "border-t border-gray-100 p-4 flex-col gap-4",
				closeButton: "hover:bg-gray-100 transition-colors",
			}}
		>
			<DrawerContent>
				{(onClose) => (
					<>
						<DrawerHeader className="flex items-center justify-between">
							<div className="flex flex-col">
								<h2 className="text-base font-medium tracking-tight uppercase">
									Your Bag ({MOCK_CART_ITEMS.length})
								</h2>
								<Link
									href="/cart"
									className="flex items-center gap-1 text-xs font-normal text-gray-500"
								>
									View Cart{" "}
									<IoArrowForward size={12} className="animate-pulse" />
								</Link>
							</div>
						</DrawerHeader>
						<DrawerBody>
							<div className="flex flex-col gap-4">
								{MOCK_CART_ITEMS.map((item) => (
									<div key={item.id} className="flex gap-3 group">
										<div className="w-20 h-20 bg-gray-50 relative overflow-hidden flex flex-col items-center justify-center">
											<Image
												src={item.image}
												alt={item.name}
												className="object-cover object-center w-full h-full"
												radius="none"
											/>
										</div>
										<div className="flex flex-col flex-1 py-1">
											<div className="flex justify-between items-start mb-1">
												<div className="flex flex-col">
													<h3 className="font-normal text-sm lg:text-sm tracking-wide">
														{item.name}
													</h3>
													<p className="text-xs text-gray-500">{item.color}</p>
												</div>
												<Button
													isIconOnly
													variant="light"
													color="danger"
													className="text-gray-400 hover:text-black transition-colors"
												>
													<HiOutlineTrash size={16} />
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
								))}
							</div>

							{MOCK_CART_ITEMS.length === 0 && (
								<div className="flex flex-col items-center justify-center h-full gap-4 text-center">
									<p className="text-gray-500 italic">Your bag is empty</p>
									<Button
										variant="light"
										radius="none"
										onPress={onClose}
										className="uppercase tracking-widest text-xs underline underline-offset-4"
									>
										Start Shopping
									</Button>
								</div>
							)}
						</DrawerBody>
						<DrawerFooter>
							<div className="w-full flex flex-col gap-4">
								<div className="flex justify-between items-center w-full">
									<span className="text-sm font-medium uppercase tracking-tight">
										Subtotal
									</span>
									<span className="text-base font-medium">
										${subtotal.toLocaleString()}
									</span>
								</div>
								<p className="text-xs text-gray-400 leading-relaxed">
									Shipping and taxes calculated at checkout.
								</p>
								<div className="flex flex-col gap-2">
									<Button
										className="w-full bg-black text-white rounded-none uppercase tracking-widest text-sm font-medium "
										onPress={onClose}
									>
										Checkout
									</Button>
									<Button
										as={Link}
										href="/"
										variant="bordered"
										className="w-full rounded-none uppercase tracking-widest text-xs text-gray-800 border-gray-800"
									>
										Continue Shopping
									</Button>
								</div>
							</div>
						</DrawerFooter>
					</>
				)}
			</DrawerContent>
		</Drawer>
	);
}

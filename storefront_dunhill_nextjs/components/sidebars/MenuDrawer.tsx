'use client';

import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Button,
	Tabs,
	Tab,
} from "@heroui/react";
import { FaBars } from "react-icons/fa6";
import Link from "next/link";
import { DrawerMenu, RightMenu } from "@/constants/menu/header";
import { useSidebarMenu } from "@/stores/header";

export default function MenuDrawer() {
	const { isOpen, onOpen, onClose, onOpenChange } = useSidebarMenu();
	return (
		<Drawer
			placement="left"
			isOpen={isOpen}
			onClose={onClose}
			onOpenChange={onOpenChange}
			classNames={{
				base: "max-w-[400px]",
			}}
		>
			<DrawerContent>
				<DrawerHeader></DrawerHeader>
				<DrawerBody>
					<div className="flex flex-col w-full">
						<Tabs>
							<Tab key={"menu"} title="Menu">
								<div className="flex flex-col w-full">
									{DrawerMenu.map((item, index) => (
										<Link key={index} href={item.href}>
											{item.label}
										</Link>
									))}
								</div>
							</Tab>
							<Tab key={"account"} title="Account">
								<div className="flex flex-col w-full">
									{RightMenu.map((item, index) => (
										<Link key={index} href={item.href}>
											{item.label}
										</Link>
									))}
								</div>
							</Tab>
						</Tabs>
					</div>
				</DrawerBody>
				<DrawerFooter>
					<div className="flex flex-col w-full">
						{RightMenu.map((item, index) => (
							<Link key={index} href={item.href}>
								{item.label}
							</Link>
						))}
					</div>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}



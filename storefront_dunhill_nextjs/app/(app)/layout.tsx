
import SiteHeader from "@/components/headers/SiteHeader";
import MainFooter from "@/components/footers/MainFooter";
import MenuDrawer from "@/components/sidebars/MenuDrawer";
import CartDrawer from "@/components/sidebars/cart/CartDrawer";


export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-dvh w-full">
			<SiteHeader />
			<MenuDrawer />
			<CartDrawer />
			{children}
			<MainFooter />
		</div>
	);
}

import SiteHeader from "@/components/headers/SiteHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-dvh w-full">
            <SiteHeader />
            {children}
        </div>
    );
}
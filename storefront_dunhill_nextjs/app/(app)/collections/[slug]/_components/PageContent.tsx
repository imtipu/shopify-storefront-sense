'use client';
import { useEffect } from "react";
import GridList from "@/components/products/GridList";
import { ClothingProducts } from "@/constants/products";
import { CATEGORIES } from "@/constants/categories";
import { usePathname, useParams } from "next/navigation";

export default function PageContent() {
    const { slug } = useParams();
    const category = CATEGORIES.find((category) => category.slug === slug);

    // update the title
    useEffect(() => {
        document.title = category?.title || "Dunhill";
    }, [category]);
    
    return (
        <div className="flex flex-col w-full">
            {/* header */}
            <div className="flex flex-col w-full max-w-7xl mx-auto py-5">
                <h1 className="text-2xl font-bold tracking-wide">{category?.title}</h1>
            </div>
            
            {/* main content */}
            <div className="flex flex-col w-full max-w-7xl mx-auto">
                <GridList products={ClothingProducts} />
            </div>
        </div>
    )
}

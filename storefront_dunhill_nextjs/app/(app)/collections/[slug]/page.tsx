import type { Metadata } from "next";
import PageContent from "./_components/PageContent";

export const metadata: Metadata = {
    title: "Collection - Products",
    description: "Products in collection",
}

export default function Page() {
    return (
        <PageContent />
    )
}
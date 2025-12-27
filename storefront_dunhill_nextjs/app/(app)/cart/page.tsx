import type { Metadata } from "next";

import PageContent from "./_components/PageContent";

export const metadata: Metadata = {
    title: "Cart",
    description: "Cart",
};

export default function CartPage() {
    return (
        <PageContent />
    );
}

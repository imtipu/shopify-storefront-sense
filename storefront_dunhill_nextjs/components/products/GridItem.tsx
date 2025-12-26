'use client';

import type { Product } from "@/interfaces/products";

interface Props {
    product: Product;
}

export default function GridItem({ product }: Props) {
    return (
        <div>
            <h2>{product.title}</h2>
            <p>{product.price}</p>
            <img src={product.image} alt={product.title} />
        </div>
    );
}
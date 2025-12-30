import {Suspense} from 'react';
import type {ProductFragment} from 'storefrontapi.generated';
import {ProductPrice} from './ProductPrice';
import {ProductForm} from './ProductForm';
import {ProductMedia} from './ProductMedia';
import {Await} from 'react-router';

export function MainProduct({
  product,
  selectedVariant,
  productOptions,
}: {
  product: ProductFragment;
  selectedVariant: any;
  productOptions: any;
}) {
  const {title, descriptionHtml} = product;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Media Column */}
        <div className="w-full">
            <div className="lg:sticky lg:top-24">
                <ProductMedia 
                    image={selectedVariant?.image} 
                    selectedVariant={selectedVariant}
                />
            </div>
        </div>

        {/* Product Details Column */}
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900">
                    {title}
                </h1>
                <ProductPrice
                    price={selectedVariant?.price}
                    compareAtPrice={selectedVariant?.compareAtPrice}
                />
            </div>

            <div className="h-px bg-zinc-200 w-full" />

            <ProductForm
                productOptions={productOptions}
                selectedVariant={selectedVariant}
            />

            <div className="h-px bg-zinc-200 w-full" />

            <div className="prose prose-zinc max-w-none">
                <h3 className="text-lg font-semibold text-zinc-900 mb-4">Description</h3>
                <div 
                    dangerouslySetInnerHTML={{__html: descriptionHtml}} 
                    className="text-zinc-600 leading-relaxed"
                />
            </div>
        </div>
      </div>
    </div>
  );
}

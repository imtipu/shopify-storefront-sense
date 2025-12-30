import {Suspense} from 'react';
import type { ProductFragment } from 'storefrontapi.generated';
import { ProductImage } from '~/components/ProductImage';
import { ProductPrice } from '~/components/ProductPrice';
import { ProductForm } from '~/components/ProductForm';

export function MainProduct({
    product,
    selectedVariant,
    productOptions,
}: {
    product: ProductFragment;
    selectedVariant: any;
    productOptions: any;
}) {
    const { title, descriptionHtml } = product;

    return (
      <div className="flex flex-col w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto py-10 px-4 overflow-hidden">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col w-full h-full max-w-[500px] max-h-[500px] relative">
              <ProductImage
                image={selectedVariant?.image}
                baseClassName="w-full h-full max-w-[500px] max-h-[500px] relative rounded-2xl shadow-lg"
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl lg:text-2xl font-medium tracking-wide text-zinc-900">
              {title}
            </h1>

            <div className="flex flex-col w-full py-5">
              <ProductPrice
                price={selectedVariant?.price}
                compareAtPrice={selectedVariant?.compareAtPrice}
              />
                    </div>
                    <div className="flex flex-col w-full py-5">
                         <ProductForm
                                    productOptions={productOptions}
                                    selectedVariant={selectedVariant}
                                  />
                    </div>
          </div>
        </div>
      </div>
    );
}

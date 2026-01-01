import {Suspense} from 'react';
import type { ProductFragment } from 'storefrontapi.generated';
import { Image } from '@shopify/hydrogen';
import { ProductImage } from '~/components/ProductImage';
import { ProductPrice } from '~/components/ProductPrice';
import { ProductForm } from '~/components/ProductForm';
import {MotionImage} from '~/components/motion/Image';
import {MediaGallery} from '~/components/media/ProductMedia';

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
  
  const hasProductImages = product?.images?.nodes?.length ?? 0 > 0;

    return (
      <div className="flex flex-col w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto py-10 px-4 relative">
          <div className="flex flex-col items-center justify-center">
            
            {hasProductImages && (
              <MediaGallery
                selectedVariant={selectedVariant}
                images={product?.images?.nodes || []}
                enableZoom={true}
              />
            )}

          </div>
          <div className="product-info flex flex-col lg:sticky lg:top-20 h-fit">
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

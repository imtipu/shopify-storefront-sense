import {Suspense} from 'react';
import type { ProductFragment as ProductFragment } from 'storefrontapi.generated';
import { Image } from '@shopify/hydrogen';
import { ProductImage } from '~/components/ProductImage';
import { ProductPrice } from '~/components/ProductPrice';
import { ProductForm } from '~/components/products/ProductForm';
import {MotionImage} from '~/components/motion/Image';
import {MediaGallery} from '~/components/media/ProductMedia';
import {ProductInfo} from './ProductInfo';

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

  const hasProductImages = product?.images?.nodes?.length ?? 0 > 0;

  return (
    <div className="flex flex-col w-full relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto py-10 px-4 relative">
        <div className="product-gallery flex flex-col lg:sticky lg:top-30 h-fit">
          {hasProductImages && (
            <MediaGallery
              selectedVariant={selectedVariant}
              images={product?.images?.nodes || []}
              enableZoom={true}
            />
          )}
        </div>
        <div className="flex flex-col">
          <ProductInfo
            product={product}
            selectedVariant={selectedVariant}
            productOptions={productOptions}
          />
        </div>
      </div>
    </div>
  );
}

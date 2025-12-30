import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import MotionNavLink from '~/components/motion/NavLink';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <MotionNavLink
      className="product-item flex flex-col w-full overflow-hidden rounded-xl bg-white shadow-md"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {image && (
        <Image
          alt={image.altText || product.title}
          aspectRatio="1/1"
          data={image}
          loading={loading}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}
      <div className="flex flex-col w-full gap-3 justify-center items-center py-6 px-3">
        <h4 className="text-md font-medium text-center text-zinc-700">
          {product.title}
        </h4>
        <p className="text-sm font-medium text-zinc-500">
          <Money data={product.priceRange.minVariantPrice} />
        </p>
      </div>
    </MotionNavLink>
  );
}

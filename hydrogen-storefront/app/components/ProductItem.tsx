import {Image, Money} from '@shopify/hydrogen';
import {MotionNavLink} from '~/components/motion/NavLink';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
  ProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {useUIStore} from '~/stores/store';
import {FaEye} from 'react-icons/fa6';

export function ProductItem({
  product,
  loading,
  index,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment
    | ProductFragment;
  loading?: 'eager' | 'lazy';
  index?: number;
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage || null;
  const price = Number(product.priceRange?.minVariantPrice?.amount ?? 0);
  const compareAtPrice = Number(
    product.compareAtPriceRange?.minVariantPrice?.amount ?? 0,
  );

  const isOnSale = price < compareAtPrice;

  const salePercentage =
    compareAtPrice > price
      ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
      : 0;

  const {openQuickView} = useUIStore();
  return (
    <MotionNavLink
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.2, delay: index ? index * 0.01 : 0}}
      className="product-item group flex flex-col w-full overflow-hidden rounded-xl bg-white shadow-md relative"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {isOnSale && (
        <div className="absolute top-0 left-0 rounded-br-2xl bg-zinc-800/80 text-white px-2 py-1">
          {isOnSale ? `${salePercentage}%` : 'Sale'}
        </div>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          // parent element click event will not trigger
          // prevent default behavior
          e.preventDefault();
          openQuickView(product.handle);
        }}
        className="absolute top-60 right-0 bg-white/40 rounded-l-full pl-4 py-2 pr-3 text-zinc-600 border-l border-t border-b border-zinc-600 shadow opacity-0 translate-x-full group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
      >
        <FaEye size={16} />
      </button>
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

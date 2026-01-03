import {NavLink} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  CollectionItemFragment,
  ProductItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useUIStore} from '~/stores/store';
import {motion} from 'motion/react';
import {FiEye} from 'react-icons/fi';

interface Props {
  product:
    | ProductItemFragment
    | CollectionItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}

export default function ProductGridItem(props: Props) {
  const {product, loading} = props;
  const {openQuickView} = useUIStore();

  return (
    <div className="group flex flex-col items-center justify-start bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full overflow-hidden bg-zinc-100">
        <NavLink
          to={`/products/${product.handle}`}
          className="w-full h-full block"
        >
          {product.featuredImage && (
            <Image
              data={product.featuredImage}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              aspectRatio="4/5"
              loading={loading}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
          )}
        </NavLink>

        <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => {
              e.preventDefault();
              openQuickView(product.handle);
            }}
            className="w-full bg-white text-zinc-900 font-medium py-3 rounded-lg shadow-lg hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2"
          >
            <FiEye size={16} />
            Quick View
          </button>
        </div>
      </div>

      <div className="flex flex-col items-start justify-start gap-1 w-full px-4 py-4">
        <h4 className="text-[15px] font-medium text-zinc-900 tracking-tight leading-snug line-clamp-1">
          {product.title}
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-semibold text-zinc-800 tracking-wide">
            <Money data={product.priceRange.minVariantPrice} />
          </span>
          {product.compareAtPriceRange?.minVariantPrice && (
            <span className="text-sm text-zinc-400 line-through">
              <Money data={product.compareAtPriceRange?.minVariantPrice} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
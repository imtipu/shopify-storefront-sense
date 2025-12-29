import {NavLink} from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import type { CollectionItemFragment, ProductItemFragment, RecommendedProductFragment } from 'storefrontapi.generated';


interface Props {
  product:
    | ProductItemFragment
    | CollectionItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}

export default function ProductGridItem(props: Props) {
    const {product, loading} = props;
    return (
      <div className="flex flex-col items-center justify-start bg-white/40 overflow-hidden rounded-lg shadow-xl shadow-zinc-400/10">
        <NavLink
          to={`/products/${product.handle}`}
          className={
            'flex flex-col w-full min-h-40 md:min-h-60 relative overflow-hidden'
          }
        >
          {product.featuredImage && (
            <Image
              data={product.featuredImage}
              sizes="100vw"
              aspectRatio="1/1"
              loading={loading}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          )}
        </NavLink>
        <div className="flex flex-col items-center justify-center gap-2.5 px-3 py-5">
          <h4 className="text-[14px] font-medium text-zinc-700 text-center tracking-wide flex-wrap">
            {product.title}
          </h4>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-sm font-light text-zinc-500 line-through tracking-wide">
              {product.compareAtPriceRange?.minVariantPrice && (
                <Money data={product.compareAtPriceRange?.minVariantPrice} />
              )}
            </span>
            <span className="text-md font-normal text-zinc-700 tracking-wider">
              <Money data={product.priceRange.minVariantPrice} />
            </span>
          </div>
        </div>
      </div>
    );
}
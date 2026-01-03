import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import type {CartLayout} from '~/components/CartMain';
import {Image, type OptimisticCartLine} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {Link} from 'react-router';
import {ProductPrice} from './ProductPrice';
// import {useAside} from './Aside';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {
  CartLineQuantity,
  CartLineRemoveButton,
} from '~/components/cart/CartLineQuantity';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 */
export function CartLineItem({
  layout,
  line,
}: {
  layout?: CartLayout;
  line: CartLine;
}) {
  if (layout === 'page') {
    return <PageItem line={line} />;
  }

  return <AsideItem line={line} />;
}

function PageItem({line}: {line: CartLine}) {
  const {id, merchandise, isOptimistic} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);

  return (
    <div key={id} className={`flex gap-1.5 w-full`}>
      {image ? (
        <div className="w-full h-full max-w-20 max-h-20 md:max-w-24 md:max-h-24 flex flex-col items-center justify-center relative overflow-hidden border border-zinc-300/70 rounded-md">
          <Image
            alt={title}
            aspectRatio="1/1"
            data={image}
            height={100}
            loading="lazy"
            width={100}
            className="h-full w-full object-center object-cover"
          />
        </div>
      ) : (
        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200"></div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-9 gap-1.5 w-full relative">
        <div className="col-span-1 md:col-span-6 flex flex-col">
          <Link
            prefetch="intent"
            to={lineItemUrl}
            className="font-normal text-md text-zinc-700 tracking-wide"
          >
            {product.title}
          </Link>
          <ProductPrice price={line?.cost?.totalAmount} />
          <ul className="flex items-center gap-1">
            {selectedOptions.map((option) => (
              <li key={option.name} className="flex items-center gap-1">
                <span className="text-sm text-zinc-500 tracking-wide font-light">
                  {option.name}: {option.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1 md:col-span-2 flex flex-col md:items-center md:justify-center">
          <CartLineQuantity line={line} showLabel={false} />
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center absolute right-0 top-0 md:relative">
          <CartLineRemoveButton lineIds={[line.id]} disabled={!!isOptimistic} />
        </div>
      </div>
    </div>
  );
}

function AsideItem({line}: {line: CartLine}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  return (
    <div key={id} className={`flex gap-1.5 w-full`}>
      {image ? (
        <div className="w-24 h-24 max-w-24 max-h-24 relative overflow-hidden border border-zinc-300/70 rounded-md">
          <Image
            alt={title}
            aspectRatio="1/1"
            data={image}
            height={100}
            loading="lazy"
            width={100}
            className="w-full h-full object-center object-cover"
          />
        </div>
      ) : (
        <div className="w-24 h-24 bg-gray-200"></div>
      )}

      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col">
          <Link
            prefetch="intent"
            to={lineItemUrl}
            className="font-normal text-sm text-zinc-700 tracking-wide"
          >
            {product.title}
          </Link>
          <ProductPrice price={line?.cost?.totalAmount} />
          <ul className="flex items-center gap-0.5">
            {selectedOptions.map((option) => (
              <li key={option.name} className="flex items-center gap-0.5">
                <span className="text-xs text-zinc-500 tracking-wide font-light">
                  {option.name}: {option.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <CartLineQuantity line={line} layout="aside" />
      </div>
    </div>
  );
}

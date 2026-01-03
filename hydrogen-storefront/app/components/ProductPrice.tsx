import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

export function ProductPrice({
  price,
  compareAtPrice,
}: {
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
}) {
  return (
    <div className="product-price flex flex-col gap-3">
      {compareAtPrice ? (
        <div className="flex">
          <span className="text-md text-zinc-700 tracking-wide">
            {price ? <Money data={price} /> : null}
          </span>
          <s className="ml-2">
            <span className="text-md text-zinc-500 tracking-wide">
              {compareAtPrice ? <Money data={compareAtPrice} /> : null}
            </span>
          </s>
        </div>
      ) : price ? (
        <Money data={price} className="text-sm text-zinc-700 tracking-wide" />
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}

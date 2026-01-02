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
    <div className="flex items-center gap-2 text-lg">
      {compareAtPrice ? (
        <div className="flex items-center gap-2">
          {price ? (
            <span className="font-semibold text-zinc-900">
              <Money data={price} />
            </span>
          ) : null}
          <s className="text-zinc-400 text-sm">
            <Money data={compareAtPrice} />
          </s>
        </div>
      ) : price ? (
        <span className="font-semibold text-zinc-900">
          <Money data={price} />
        </span>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}

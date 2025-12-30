import {Link, useNavigate} from 'react-router';
import {type MappedProductOptions} from '@shopify/hydrogen';
import type {
  Maybe,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import type {ProductFragment} from 'storefrontapi.generated';

export function ProductForm({
  productOptions,
  selectedVariant,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
}) {
  const navigate = useNavigate();
  const {open} = useAside();

  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => {
        if (option.optionValues.length === 1) return null;

        return (
          <div className="flex flex-col gap-3" key={option.name}>
            <h5 className="text-sm font-medium text-zinc-900">{option.name}</h5>
            <div className="flex flex-wrap gap-2">
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;

                const commonClasses = `
                  relative flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition-all
                  ${selected 
                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm' 
                    : 'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300 hover:shadow-sm'}
                  ${!available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `;

                if (isDifferentProduct) {
                  return (
                    <Link
                      className={commonClasses}
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  );
                } else {
                  return (
                    <button
                      type="button"
                      className={commonClasses}
                      key={option.name + name}
                      disabled={!exists}
                      onClick={() => {
                        if (!selected) {
                          void navigate(`?${variantUriQuery}`, {
                            replace: true,
                            preventScrollReset: true,
                          });
                        }
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </button>
                  );
                }
              })}
            </div>
          </div>
        );
      })}
      
      <div className="mt-4">
        <AddToCartButton
          disabled={!selectedVariant || !selectedVariant.availableForSale}
          onClick={() => {
            open('cart');
          }}
          lines={
            selectedVariant
              ? [
                  {
                    merchandiseId: selectedVariant.id,
                    quantity: 1,
                    selectedVariant,
                  },
                ]
              : []
          }
        >
          <div className={`
             w-full rounded-full py-4 px-8 font-bold text-base tracking-wide transition-all shadow-md hover:shadow-lg
             ${selectedVariant?.availableForSale 
                ? 'bg-zinc-900 text-white hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98]' 
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}
          `}>
             {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
          </div>
        </AddToCartButton>
      </div>
    </div>
  );
}

function ProductOptionSwatch({
  swatch,
  name,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return name;

  return (
    <div
      aria-label={name}
      className="w-6 h-6 rounded-full border border-black/10"
      style={{
        backgroundColor: color || 'transparent',
      }}
    >
      {!!image && <img src={image} alt={name} className="w-full h-full object-cover rounded-full" />}
    </div>
  );
}

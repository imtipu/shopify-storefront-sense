import {Link, useNavigate} from 'react-router';
import {type MappedProductOptions} from '@shopify/hydrogen';
import type {
  Maybe,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';
import {AddToCartButton} from '~/components/products/AddToCartButton';
import type {ProductFragment} from 'storefrontapi.generated';
import {useCartDrawer} from '~/stores/cart';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

export function ProductForm({
  productOptions,
  selectedVariant,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
}) {
  const navigate = useNavigate();
  const { openCart: openCartDrawer } = useCartDrawer();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleQuantityPlus = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="product-form flex flex-col">
      {productOptions.map((option) => {
        // If there is only a single value in the option values, don't display the option
        if (option.optionValues.length === 1) return null;

        return (
          <div className="product-options" key={option.name}>
            <h5 className="text-sm font-normal text-zinc-600 tracking-wider mb-1.5">
              {option.name}
            </h5>
            <div className="product-options-grid">
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

                if (isDifferentProduct) {
                  // SEO
                  // When the variant is a combined listing child product
                  // that leads to a different url, we need to render it
                  // as an anchor tag
                  return (
                    <Link
                      className="product-options-item"
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                      // style={{
                      //   border: selected
                      //     ? '1px solid black'
                      //     : '1px solid transparent',
                      //   opacity: available ? 1 : 0.3,
                      // }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  );
                } else {
                  // SEO
                  // When the variant is an update to the search param,
                  // render it as a button with javascript navigating to
                  // the variant so that SEO bots do not index these as
                  // duplicated links
                  return (
                    <button
                      type="button"
                      className={`rounded-lg border px-3 py-2 text-sm tracking-wide ${
                        exists && !selected
                          ? ' link bg-zinc-200 text-zinc-700'
                          : 'bg-zinc-700 text-zinc-100'
                      }`}
                      key={option.name + name}
                      // style={{
                      //   border: selected
                      //     ? '1px solid black'
                      //     : '1px solid transparent',
                      //   opacity: available ? 1 : 0.3,
                      // }}
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
            <br />
          </div>
        );
      })}
      <div className="flex flex-col mb-3">
        <div className="flex items-center h-10 border border-gray-400 bg-gray-50 rounded-lg w-full max-w-[130px] overflow-hidden">
          <button
            onClick={handleQuantityMinus}
            type="button" className="w-16 h-full flex items-center justify-center text-zinc-600">
            <MinusIcon size={16}/>
          </button>
          <input type="number"
            value={quantity}
            min={1}
            step={1}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            className="px-2 border-l text-sm text-zinc-600 text-center border-r border-gray-400 h-full w-full outline-none" />
          <button
            onClick={handleQuantityPlus}
            type="button" className="w-16 h-full flex items-center justify-center text-zinc-600">
            <PlusIcon size={16}/>
          </button>
        </div>

      </div>
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          // open('cart');
          openCartDrawer();
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: quantity,
                  selectedVariant,
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
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
      className="product-option-label-swatch"
      style={{
        backgroundColor: color || 'transparent',
      }}
    >
      {!!image && <img src={image} alt={name} />}
    </div>
  );
}

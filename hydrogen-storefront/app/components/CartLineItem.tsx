import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, Image, type OptimisticCartLine} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {Link} from 'react-router';
import {ProductPrice} from './ProductPrice';
import {useAside} from './Aside';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {MinusIcon, PlusIcon, TrashIcon} from 'lucide-react';

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
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  // const {close} = useAside();

  const className =
    layout === 'page'
      ? 'border rounded-lg bg-zinc-50/70 border-zinc-300/70 px-3 py-1.5'
      : '';

  return (
    <li key={id} className={`cart-line flex gap-1.5 w-full ${className}`}>
      {image ? (
        <div className="w-24 h-24 relative overflow-hidden">
          <Image
            alt={title}
            aspectRatio="1/1"
            data={image}
            height={100}
            loading="lazy"
            width={100}
            className="object-center object-cover"
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
        <CartLineQuantity line={line} />
      </div>
    </li>
  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 */
function CartLineQuantity({line}: {line: CartLine}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="cart-line-quantity flex flex-col gap-1.5">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-zinc-500 font-normal tracking-wide">
          Quantity
        </p>
        <div className="flex items-center w-[100px] border border-gray-300 rounded-md h-8">
          <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
            <button
              aria-label="Decrease quantity"
              disabled={quantity <= 1 || !!isOptimistic}
              name="decrease-quantity"
              value={prevQuantity}
              className="w-7 h-full flex items-center justify-center text-zinc-700"
            >
              <MinusIcon size={16} />
            </button>
          </CartLineUpdateButton>
          <span className="w-full h-full text-center text-zinc-700 px-1 flex items-center justify-center border-l border-r border-gray-300">
            {quantity}
          </span>
          <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
            <button
              aria-label="Increase quantity"
              name="increase-quantity"
              value={nextQuantity}
              disabled={!!isOptimistic}
              className="w-7 h-full flex items-center justify-center text-zinc-700"
            >
              <PlusIcon size={16} />
            </button>
          </CartLineUpdateButton>
        </div>
      </div>
      <div>
        <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
      </div>
    </div>
  );
}

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 */
function CartLineRemoveButton({
  lineIds,
  disabled,
}: {
  lineIds: string[];
  disabled: boolean;
}) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button
        disabled={disabled}
        type="submit"
        className="flex items-center gap-2 text-sm font-normal tracking-wide text-zinc-500 bg-red-100/50 px-2 py-1 rounded-md border border-red-200/50"
      >
        <TrashIcon size={16} />
        Remove
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

/**
 * Returns a unique key for the update action. This is used to make sure actions modifying the same line
 * items are not run concurrently, but cancel each other. For example, if the user clicks "Increase quantity"
 * and "Decrease quantity" in rapid succession, the actions will cancel each other and only the last one will run.
 * @param lineIds - line ids affected by the update
 * @returns
 */
function getUpdateKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}

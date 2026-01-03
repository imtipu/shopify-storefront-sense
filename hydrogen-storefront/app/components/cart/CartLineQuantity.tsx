import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import {CartForm, type OptimisticCartLine} from '@shopify/hydrogen';

import { FaMinus, FaPlus } from 'react-icons/fa6';
import {FiTrash2} from 'react-icons/fi';
import { useState } from 'react';
import type { CartApiQueryFragment } from 'storefrontapi.generated';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 */
export function CartLineQuantity({
  line,
  showRemoveButton,
  showLabel,
  layout
}: {
  line: CartLine;
  showRemoveButton?: boolean;
  showLabel?: boolean;
  layout?: 'aside' | 'page';
}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));
  const [newQuantity, setNewQuantity] = useState(quantity);

  const quantityClassName = layout === 'aside' ? 'h-7' : 'h-10';
  const inputClassName = layout === 'aside' ? 'text-xs' : 'text-sm';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    setNewQuantity(newQuantity);
  }

  return (
    <div className="cart-line-quantity flex flex-col gap-1.5">
      <div className="flex flex-col gap-1">
        {showLabel && (
          <p className="text-sm text-zinc-500 font-normal tracking-wide">
            Quantity
          </p>
        )}
        <div className={`flex items-center w-[120px] border border-gray-300 rounded-md ${quantityClassName}`}>
          <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
            <button
              aria-label="Decrease quantity"
              disabled={quantity <= 1 || !!isOptimistic}
              name="decrease-quantity"
              value={prevQuantity}
              className={`w-7 h-full flex items-center justify-center text-center text-zinc-700 ${quantityClassName}`}
            >
              <FaMinus size={layout === 'aside' ? 12 : 16} />
            </button>
          </CartLineUpdateButton>
          <CartLineQuantityInput lines={[{id: lineId, quantity: newQuantity}]}>
            <input
              type="number"
              name="quantity"
              value={newQuantity}
              onChange={handleChange}
              onBlur={(e) => {
                if (newQuantity !== quantity) {
                  e.currentTarget.form?.requestSubmit();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.currentTarget.blur();
                }
              }}
              onKeyUp={(e) => {
                if (newQuantity !== quantity) {
                  e.currentTarget.form?.requestSubmit();
                }
              }}
              className="w-full h-full text-center text-zinc-700 px-1 flex items-center justify-center border-l border-r border-gray-300 outline-none"
            />
          </CartLineQuantityInput>
          <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
            <button
              aria-label="Increase quantity"
              name="increase-quantity"
              value={nextQuantity}
              disabled={!!isOptimistic}
              className="w-7 h-full flex items-center justify-center text-zinc-700"
            >
              <FaPlus size={layout === 'aside' ? 12 : 16} />
            </button>
          </CartLineUpdateButton>
        </div>
      </div>
      {showRemoveButton && (
        <div>
          <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
        </div>
      )}
    </div>
  );
}


/**
 
 * cart line quantity input component
 
 */

export function CartLineQuantityInput({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
  }) {
    const lineIds = lines.map((line) => line.id);
  return <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>;
}

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 */
export function CartLineRemoveButton({
  lineIds,
    disabled,
  showLabel
}: {
  lineIds: string[];
  disabled: boolean;
  showLabel?: boolean;
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
        <FiTrash2 size={16} />
        {showLabel && 'Remove'}
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

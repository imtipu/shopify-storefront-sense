import {useOptimisticCart} from '@shopify/hydrogen';
import {Link, NavLink} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import CartDrawerLineItem from './CartDrawerLineItem';
import {IoClose} from 'react-icons/io5';
import {FiArrowRight} from 'react-icons/fi';

import {CartLineItem} from '~/components/CartLineItem';

import {useCartDrawer} from '~/stores/cart';
import {CartSummary} from '../CartSummary';

interface Props {
  cart: CartApiQueryFragment | null;
}

const CartEmpty = ({hidden = false}: {hidden: boolean}) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 px-3 py-10 min-h-[200px] w-full"
      hidden={hidden}
    >
      <p className="text-sm text-gray-600 text-center">
        Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
        started!
      </p>
      <Link
        to="/collections/all"
        prefetch="viewport"
        className="text-sm text-white font-normal bg-black/80 px-4 py-2 rounded-full flex items-center gap-2"
      >
        Continue shopping <FiArrowRight size={14} />
      </Link>
    </div>
  );
};

export default function DrawerContent(props: Props) {
  const cart = useOptimisticCart(props.cart);
  const {closeCart} = useCartDrawer();

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);

  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-between items-center w-full py-4 px-3 border-b border-gray-200">
        <div className="flex flex-col gap-1">
          <h2 className="text-md font-medium tracking-wide text-gray-800">
            Your Cart {cart?.totalQuantity ? `(${cart?.totalQuantity})` : null}
          </h2>
          <NavLink
            to="/cart"
            className="flex items-center gap-1 text-xs text-gray-600"
          >
            View Cart <FiArrowRight size={12} />
          </NavLink>
        </div>
        <button
          onClick={closeCart}
          type="button"
          className="text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          <IoClose size={24} />
        </button>
      </div>
      <CartEmpty hidden={linesCount} />
      {linesCount && (
        <div className="flex flex-col gap-4 px-2 py-4">
          {(cart?.lines?.nodes ?? []).map((line) => (
            <CartLineItem key={line.id} line={line} layout="aside" />
          ))}
        </div>
      )}
      <div className="flex flex-col w-full">
        {cartHasItems && <CartSummary cart={cart} layout="aside" />}
      </div>
    </div>
  );
}
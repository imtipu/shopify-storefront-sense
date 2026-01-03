import {motion} from 'motion/react';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {FiArrowRight} from 'react-icons/fi';
import {HiOutlineShoppingBag} from 'react-icons/hi';

import {CartLineItem} from '../CartLineItem';
import {CartPageSummary} from '~/components/cart/CartPageSummary';

interface Props {
  cart: CartApiQueryFragment | null;
}

const CartEmptyContent = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-5">
      <div className="flex items-center justify-center mb-4">
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient
              id="cart-icon-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#84cc16" /> {/* lime-500 */}
              <stop offset="100%" stopColor="#eab308" /> {/* yellow-500 */}
            </linearGradient>
          </defs>
        </svg>
        <HiOutlineShoppingBag
          size={56}
          stroke="url(#cart-icon-gradient)"
          strokeWidth={1.5}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-zinc-500">
          Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
          started!
        </p>
        <Link
          to="/collections"
          prefetch="viewport"
          className="flex items-center justify-center text-sm font-normal tracking-wide gap-2 border-2 border-zinc-700 px-4 py-2 text-zinc-50 bg-zinc-700 hover:bg-zinc-600"
        >
          Continue shopping <FiArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default function PageContent({cart: originalCart}: Props) {
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.3}}
      className="flex flex-col w-full items-center py-10 px-3 xl:px-0"
    >
      <div className="container flex flex-col w-full max-w-6xl gap-2">
        <h1
          className={`text-lg font-medium ${cartHasItems ? 'text-left text-zinc-700' : 'text-center text-zinc-500'}`}
        >
          Your Cart
          {cart?.totalQuantity ? ` (${cart.totalQuantity} items)` : null}
        </h1>

        {cartHasItems && (
          <div className="grid grid-cols-1 lg:grid-cols-9 gap-4 w-full">
            <div className="lg:col-span-6 flex flex-col gap-4">
              {(cart?.lines?.nodes ?? []).map((line) => (
                <CartLineItem key={line.id} line={line} layout="page" />
              ))}
            </div>
            <div className="lg:col-span-3">
              <CartPageSummary cart={cart} />
            </div>
          </div>
        )}

        {!cartHasItems && <CartEmptyContent />}
      </div>
    </motion.div>
  );
}

import {Suspense} from 'react';

import {NavLink, useAsyncValue} from 'react-router';

import {MotionNavLink} from '~/components/motion/NavLink';
import {FaBars, FaCartShopping} from 'react-icons/fa6';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {Await} from 'react-router-dom';
import {motion} from 'motion/react';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';

import {FaCircleUser, FaRegCircleUser} from 'react-icons/fa6';

import MainMenu from './MainMenu';

interface Props {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

export const CartBadge = ({count}: {count: number | null}) => {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <Await resolve={cart}>
      {(cart) => {
        return (
          <MotionNavLink
            initial={{opacity: 0, x: 10}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5}}
            to="/cart"
            onClick={(e) => {
              e.preventDefault();
              open('cart');
              publish('cart_viewed', {
                cart,
                prevCart,
                shop,
                url: window.location.href || '',
              } as CartViewPayload);
            }}
            className="flex gap-0.5 items-center justify-center p-2 cursor-pointer"
          >
            <FaCartShopping />
            {count === null ? <sup>&nbsp;</sup> : <sup>{count}</sup>}
          </MotionNavLink>
        );
      }}
    </Await>
  );
};

function CartToggle({cart}: {cart: Promise<CartApiQueryFragment | null>}) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

export default function MainHeader(props: Props) {
  const {header, cart, publicStoreDomain, isLoggedIn} = props;
  const {menu, shop} = header;

  return (
    <header className="flex flex-col w-full justify-center items-center bg-gradient-to-b from-white to-gray-100">
      <div className="flex flex-col w-full max-w-6xl">
        <div className="grid grid-cols-3 w-full h-16">
          <div className="flex flex-col items-start justify-center">
            <motion.button
              initial={{opacity: 0, x: -10}}
              animate={{opacity: 1, x: 0}}
              transition={{duration: 0.5}}
              className="p-2 cursor-pointer">
              <FaBars />
            </motion.button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <MotionNavLink
              initial={{opacity: 0, y: -10}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5}}
              to="/"
              className="text-lg font-bold cursor-pointer uppercase tracking-wider"
            >
              {shop.name}
            </MotionNavLink>
          </div>
          <div className="flex flex-col items-end justify-center">
            <div
              className="flex items-center">
              <NavLink
                prefetch="intent"
                to="/account"
                className="p-2 cursor-pointer"
              >
                <Suspense fallback="Sign in">
                  <Await resolve={isLoggedIn} errorElement="Sign in">
                    {(isLoggedIn) => (isLoggedIn ? <FaCircleUser /> : <FaRegCircleUser />)}
                  </Await>
                </Suspense>
              </NavLink>
              <CartToggle cart={cart} />
            </div>
          </div>
        </div>
        <MainMenu
          menu={menu}
          publicStoreDomain={publicStoreDomain}
          primaryDomainUrl={''}
        />
      </div>
    </header>
  );
}

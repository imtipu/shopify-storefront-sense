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
import {AnimatePresence, motion} from 'motion/react';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';

import {DynamicIcon} from 'lucide-react/dynamic';
import {useState} from 'react';
import {useSearchStore} from '~/stores/search';
import MainMenu from './MainMenu';
import MobileMenu from './MobileMenu';
import SearchBar from '~/components/search/SearchBar';

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
            className="flex gap-0.5 items-center justify-center p-2 cursor-pointer text-zinc-600 hover:text-zinc-800"
          >
            <DynamicIcon name="shopping-bag" size={18} />
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
  const {open} = useAside();
  const {isOpen: isSearchOpen, setOpen: setSearchOpen} = useSearchStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="flex flex-col w-full justify-center items-center relative z-20 bg-white/80 backdrop-blur-md">
      <div className="flex flex-col w-full container relative">
        <div className="grid grid-cols-3 w-full h-16 px-4 md:px-0">
          <div className="flex items-center justify-start">
            <div className="flex items-center">
              <motion.button
                initial={{opacity: 0, x: -10}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
                className="p-2 cursor-pointer text-zinc-500/80 hover:text-zinc-700 md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <DynamicIcon name="menu" size={20} />
              </motion.button>
              <motion.button
                initial={{opacity: 0, x: -10}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
                className="p-2 cursor-pointer text-zinc-500/80 hover:text-zinc-700"
                onClick={() => setSearchOpen(!isSearchOpen)}
              >
                <DynamicIcon name="search" size={20} />
              </motion.button>
            </div>
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
            <div className="flex items-center">
              <NavLink
                prefetch="intent"
                to="/account"
                className="p-2 cursor-pointer text-zinc-500/80 hover:text-zinc-700"
              >
                <Suspense fallback="Sign in">
                  <Await resolve={isLoggedIn} errorElement="Sign in">
                    {(isLoggedIn) =>
                      isLoggedIn ? (
                        <DynamicIcon name="user" size={20} />
                      ) : (
                        <DynamicIcon name="user" size={20} />
                      )
                    }
                  </Await>
                </Suspense>
              </NavLink>
              <CartToggle cart={cart} />
            </div>
          </div>
        </div>

        <AnimatePresence>{isSearchOpen && <SearchBar />}</AnimatePresence>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenu
              menu={menu}
              publicStoreDomain={publicStoreDomain}
              primaryDomainUrl={''}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        <div className="hidden md:block">
          <MainMenu
            menu={menu}
            publicStoreDomain={publicStoreDomain}
            primaryDomainUrl={''}
          />
        </div>
      </div>
    </header>
  );
}


import {useEffect, Suspense} from 'react';
import {Await, NavLink} from 'react-router';

import {AnimatePresence, motion} from 'motion/react';

import {useCartDrawer} from '~/stores/cart';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

import DrawerContent from './DrawerContent';

export default function CartDrawer({
  cart,
}: {
  cart: Promise<CartApiQueryFragment | null>;
}) {
  const {isOpen, openCart, closeCart} = useCartDrawer();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      return () => {
        document.body.style.overflow = 'auto';
        document.body.style.position = 'relative';
      };
    }
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{opacity: 0, x: 100}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: 100}}
            transition={{duration: 0.3}}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm min-w-xs h-full bg-white overflow-y-auto shadow-lg shadow-gray-500/50"
          >
            <Suspense fallback={<DrawerContent cart={null} />}>
              <Await resolve={cart}>
                {(cart) => {
                  return <DrawerContent cart={cart} />;
                }}
              </Await>
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

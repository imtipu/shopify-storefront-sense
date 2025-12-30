import {useState, useEffect, Suspense} from 'react';
import {Await, NavLink} from 'react-router';

import {AnimatePresence, motion} from 'motion/react';

import {useCartDrawer} from '~/stores/cart';
import {DynamicIcon} from 'lucide-react/dynamic';
import type { CartApiQueryFragment } from 'storefrontapi.generated';
import { CartMain } from '../CartMain';

export default function CartDrawer({cart}: {cart: Promise<CartApiQueryFragment | null>;}) {
  const {isOpen, openCart, closeCart} = useCartDrawer();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
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
            <div className="flex flex-col h-full w-full">
              <div className="flex justify-between items-center w-full py-4 px-3 border-b border-gray-200">
                <div className='flex flex-col gap-1'>
                  <h2 className="text-md font-medium tracking-wide text-gray-800">
                    Your Cart
                  </h2>
                  <NavLink to="/cart" className="flex items-center gap-1 text-xs text-gray-600">
                    View Cart <DynamicIcon name="arrow-right" size={12} />
                  </NavLink>
                </div>
                <button
                  onClick={closeCart}
                  type="button"
                  className="text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  <DynamicIcon name="x" size={24} />
                </button>
              </div>
              <div className="flex flex-col w-full">
                <Suspense fallback={<p>Loading cart ...</p>}>
                  <Await resolve={cart}>
                    {(cart) => {
                      return <CartMain cart={cart} layout="aside" />;
                    }}
                  </Await>
                </Suspense>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

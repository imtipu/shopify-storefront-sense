import {motion, AnimatePresence} from 'motion/react';
import {useOverlayStore} from '~/stores/overlay';
import {useMobileMenuStore} from '~/stores/menu';
import {useCartDrawer} from '~/stores/cart';

export function BackgroundOverlay() {
  const {isOpen} = useOverlayStore();
  const {closeMenu} = useMobileMenuStore();
  const {closeCart} = useCartDrawer();

  const handleCloseAll = () => {
    closeMenu();
    closeCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.3, ease: 'easeInOut'}}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] cursor-pointer"
          onClick={handleCloseAll}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}


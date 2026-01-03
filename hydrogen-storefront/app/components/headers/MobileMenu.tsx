import {motion} from 'motion/react';
import type {HeaderQuery} from 'storefrontapi.generated';
// import {FALLBACK_HEADER_MENU} from '~/constants/menu';
import {MotionNavLink} from '~/components/motion/NavLink';
import {useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import {IoClose} from 'react-icons/io5';
import {useMobileMenuStore} from '~/stores/menu';

interface Props {
  menu: HeaderQuery['menu'];
  publicStoreDomain: string;
  primaryDomainUrl: string;
}

export default function MobileMenu(props: Props) {
  const {menu, publicStoreDomain, primaryDomainUrl} = props;
  const {closeMenu, isOpen} = useMobileMenuStore();
  const location = useLocation();

  // Prevent closing on mount
  const lastPathname = useRef(location.pathname);
  useEffect(() => {
    if (lastPathname.current !== location.pathname) {
      closeMenu();
      lastPathname.current = location.pathname;
    }
  }, [location, closeMenu]);

  // Robust body scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        const savedScrollY = document.body.style.top;
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        window.scrollTo(0, parseInt(savedScrollY || '0') * -1);
      };
    }
  }, [isOpen]);

  return (
    <>
      <motion.div
        initial={{opacity: 0, x: '-100%'}}
        animate={{opacity: 1, x: 0}}
        exit={{opacity: 0, x: '-100%'}}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
          type: 'spring',
          damping: 30,
          stiffness: 300,
          mass: 0.8,
        }}
        className="fixed top-0 z-100 flex flex-col md:hidden bg-white min-h-screen min-w-xs max-w-sm w-full"
      >
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
            delay: 0.1,
          }}
          className="flex justify-between items-center w-full py-3 px-4"
        >
          <div>
            <h2 className="font-medium text-md">Menu</h2>
          </div>
          <button type="button" onClick={closeMenu}>
            <IoClose size={24} />
          </button>
        </motion.div>
        <div className="flex flex-col gap-2 px-4">
          {menu?.items?.map((item, index) => {
            if (!item.url) return null;
            const url =
              item.url.includes('myshopify.com') ||
              item.url.includes(publicStoreDomain) ||
              item.url.includes(primaryDomainUrl)
                ? new URL(item.url).pathname
                : item.url;
            return (
              <MotionNavLink
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 10}}
                transition={{duration: 0.3, delay: index * 0.1}}
                key={item.id}
                to={url}
                className={
                  'flex w-full text-sm text-zinc-600 hover:text-zinc-800 hover:scale-105 transition-all duration-200 ease-in-out tracking-wide'
                }
              >
                {item.title}
              </MotionNavLink>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}

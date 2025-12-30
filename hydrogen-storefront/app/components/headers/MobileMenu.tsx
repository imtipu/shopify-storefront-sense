import {AnimatePresence, motion} from 'motion/react';
import type {HeaderQuery} from 'storefrontapi.generated';
import {FALLBACK_HEADER_MENU} from '~/constants/menu';
import {MotionNavLink} from '~/components/motion/NavLink';
import {DynamicIcon} from 'lucide-react/dynamic';
import {useEffect} from 'react';

interface Props {
  menu: HeaderQuery['menu'];
  publicStoreDomain: string;
  primaryDomainUrl: string;
  onClose: () => void;
}

export default function MobileMenu(props: Props) {
  const {menu, publicStoreDomain, primaryDomainUrl, onClose} = props;

  useEffect(() => {
    // Lock scroll when menu is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-100 flex md:hidden min-h-screen">
      {/* Backdrop */}
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
      />

      {/* Sidebar */}
      <motion.div
        initial={{x: '-100%'}}
        animate={{x: 0}}
        exit={{x: '-100%'}}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
          mass: 0.8,
        }}
        className="relative w-[85%] max-w-[340px] h-full bg-white shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Menu
          </span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-zinc-500 hover:text-black transition-colors"
          >
            <DynamicIcon name="x" size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col">
            {(menu || FALLBACK_HEADER_MENU).items.map((item, index) => {
              if (!item.url) return null;

              const url =
                item.url.includes('myshopify.com') ||
                item.url.includes(publicStoreDomain) ||
                item.url.includes(primaryDomainUrl)
                  ? new URL(item.url).pathname
                  : item.url;

              return (
                <motion.li
                  key={index}
                  initial={{opacity: 0, x: -20}}
                  animate={{opacity: 1, x: 0}}
                  transition={{delay: index * 0.05 + 0.1, duration: 0.3}}
                >
                  <MotionNavLink
                    to={url}
                    onClick={onClose}
                    className={({isActive}) =>
                      `flex items-center justify-between px-6 py-4 text-[15px] font-medium transition-colors ${
                        isActive
                          ? 'text-black bg-zinc-50'
                          : 'text-zinc-600 hover:text-black hover:bg-zinc-50/50'
                      }`
                    }
                  >
                    {item.title}
                    <DynamicIcon name="chevron-right" size={14} className="opacity-40" />
                  </MotionNavLink>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-100 bg-zinc-50/50">
          <div className="flex flex-col gap-4">
             {/* Additional links could go here if needed */}
             <div className="text-[10px] text-zinc-400 uppercase tracking-tighter">
                Dunhill London
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
    
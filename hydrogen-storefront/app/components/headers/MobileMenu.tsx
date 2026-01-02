import {AnimatePresence, motion} from 'motion/react';
import type {HeaderQuery} from 'storefrontapi.generated';
import {FALLBACK_HEADER_MENU} from '~/constants/menu';
import {MotionNavLink} from '~/components/motion/NavLink';
import {useEffect} from 'react';

interface Props {
  menu: HeaderQuery['menu'];
  publicStoreDomain: string;
  primaryDomainUrl: string;
  onClose: () => void;
}

export default function MobileMenu(props: Props) {
  const {menu, publicStoreDomain, primaryDomainUrl, onClose} = props;

  // useEffect(() => {
  //   // Lock scroll when menu is open
  //   document.body.style.overflow = 'hidden';
  //   return () => {
  //     document.body.style.overflow = 'unset';
  //   };
  // }, []);

  return (
    
    <>
      <motion.div
        initial={{x: '-100%'}}
        animate={{x: 0}}
        exit={{x: '-100%'}}
        // transition={{
        //   type: 'spring',
        //   damping: 30,
        //   stiffness: 300,
        //   mass: 0.8,
        // }}
        className="fixed top-0 z-100 flex md:hidden bg-white min-h-screen min-w-xs max-w-sm w-full"
      >
        <div className='fixed top-o flex flex-col min-w-xs max-w-sm w-full z-100 bg-white h-screen'>
          Test
        </div>

      </motion.div>
    </>
  );
}

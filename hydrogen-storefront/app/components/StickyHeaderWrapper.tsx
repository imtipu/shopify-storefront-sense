import {motion, useScroll, useMotionValueEvent} from 'motion/react';
import {useState} from 'react';

export function StickyHeaderWrapper({children}: {children: React.ReactNode}) {
  const {scrollY} = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide if scrolling down and past 50px
    if (latest > previous && latest > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.div
        variants={{
          visible: {y: 0},
          hidden: {y: '-100%'},
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{duration: 0.3, ease: 'easeInOut'}}
        className="sticky top-0 left-0 right-0 z-20 flex flex-col w-full"
      >
        {children}
      </motion.div>
      {/* Spacer to prevent content jump */}
       {/* 
         Approximate height: 
         AnnouncementBar (variable, usually ~40px) + MainHeader (~80px) = ~120px.
         Ideally we measure this, but a fixed spacer is a good start.
         Or we can just rely on 'pt-[120px]' in PageLayout.
       */}
    </>
  );
}

import {motion} from 'motion/react';

export function AnnouncementBar() {
  return (
    <div className="announcement-bar bg-linear-to-br from-lime-200 via-yellow-100 to-lime-200 justify-center items-center flex flex-col overflow-hidden relative">
      <div className="flex flex-col gap-2 justify-center items-center text-center py-2">
        <motion.p
          initial={{opacity: 0, y: -10}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
          className="text-zinc-700 font-medium family-poppins tracking-wide text-[16px] text-center"
        >
          Save 15% on orders over $50 ♡ Use code{' '}
          <span className="font-semibold">15OFF</span> at checkout
        </motion.p>
      </div>
    </div>
  );
}

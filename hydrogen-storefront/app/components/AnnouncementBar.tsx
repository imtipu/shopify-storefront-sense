import { motion } from 'motion/react';

export function AnnouncementBar() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="announcement-bar bg-gradient-to-r from-green-200 to-sky-200 justify-center items-center flex flex-col">
        <div className="flex justify-center items-center py-1.5">
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="font-medium tracking-widest text-sm">
            Save 15% on orders over $50 ♡ Use code <span className="font-semibold">15OFF</span> at checkout
          </motion.p>
        </div>
      </motion.div>
    );
}
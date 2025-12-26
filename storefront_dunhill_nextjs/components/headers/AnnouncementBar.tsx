'use client';

import { motion } from "motion/react";

export default function AnnouncementBar() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }} 
            exit={{ opacity: 0 }}
            className="flex flex-col w-full bg-red-900 dark:bg-red-900/70 items-center justify-center z-50 relative">
            <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col px-3 py-1">
                <p className="text-white">Free shipping on orders over $50</p>
            </motion.div>
        </motion.div>
    );
}
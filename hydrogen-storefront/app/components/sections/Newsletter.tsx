import {motion} from 'motion/react';
import {DynamicIcon} from 'lucide-react/dynamic';

export default function Newsletter() {
  return (
    <section className="w-full py-20 bg-zinc-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-lifestyle-1_large.png?v=1613161131')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.6}}
          className="max-w-2xl mx-auto flex flex-col items-center gap-6"
        >
          <DynamicIcon name="mail" size={48} className="text-zinc-400 mb-2" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Subscribe to our emails
          </h2>
          <p className="text-zinc-400 text-lg">
            Be the first to know about new collections and exclusive offers.
          </p>

          <form className="w-full max-w-md flex flex-col md:flex-row gap-3 mt-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-zinc-900 font-medium rounded-lg hover:bg-zinc-100 transition-colors uppercase tracking-wide"
            >
              Sign Up
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

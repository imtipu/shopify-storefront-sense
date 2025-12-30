import {Image} from '@shopify/hydrogen';
import BannerImageSrc from '~/assets/images/main-banner.webp';
import MotionNavLink from '~/components/motion/NavLink';
import {motion} from 'motion/react';

export default function MainBanner() {
  return (
    <div className="flex flex-col items-center justify-center w-full relative">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full container relative py-10 px-5">
        <div className="flex flex-col items-center md:items-end justify-center w-full h-full order-last md:order-first px-8 md:px-0">
          <div className="flex flex-col justify-center px-10 py-12 rounded-3xl bg-linear-to-br from-lime-200 via-yellow-100 to-lime-200 z-10 gap-6 relative flex-wrap w-full md:max-w-xs lg:max-w-sm min-h-[200px] lg:min-h-[600px] -mt-15 md:mt-0">
            <motion.h3
              initial={{opacity: 0, y: -5}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.3}}
              className="text-5xl text-zinc-700 font-medium tracking-wide leading-16"
            >
              Glowing skin, naturally
            </motion.h3>
            <motion.p
              initial={{opacity: 0, y: -5}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.3}}
              className="text-[calc(1rem * 1.2)] text-zinc-500"
            >
              Indulge in plant-based skin care for naturally radiant results.
            </motion.p>
            <MotionNavLink
              initial={{opacity: 0, y: 5}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.3}}
              to="/"
              className="font-medium text-sm text-lime-100 flex items-center justify-center tracking-wide bg-zinc-800 px-8 py-3 rounded-lg w-fit"
            >
              Shop Now
            </MotionNavLink>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-full h-full relative lg:py-10">
          <div className="w-full h-full max-h-100 md:max-h-200 flex flex-col items-start justify-center overflow-hidden rounded-xl shadow-lg md:-ml-15 lg:-ml-20">
            <Image
              data={{
                url: BannerImageSrc,
                altText: 'Main Banner',
                width: 1000,
                height: 1250,
              }}
              className="w-full h-full object-cover object-center rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

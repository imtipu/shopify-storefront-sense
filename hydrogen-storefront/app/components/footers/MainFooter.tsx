import {NavLink} from 'react-router';
import {motion} from 'motion/react';
import MotionNavLink from '~/components/motion/NavLink';
import { DynamicIcon } from 'lucide-react/dynamic';
import FooterEmailSubscribe from './FooterEmailSubscribe';

export default function MainFooter() {
  return (
    <footer className="flex flex-col items-center justify-center w-full bg-linear-to-br from-lime-200 via-yellow-100 to-lime-200 py-8 md:py-12 lg:py-16">
      <motion.div
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        initial={{
          opacity: 0,
          y: -5,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
          //   delay: 0.3,
        }}
        viewport={{
          amount: 0.1,
          once: true,
        }}
        className="container"
      >
        <FooterEmailSubscribe />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          <div className="flex flex-col items-start justify-center">
            <motion.h2
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className="text-2xl text-zinc-700 font-medium tracking-wide leading-16"
            >
              Menu
            </motion.h2>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className="flex flex-col"
            >
              <MotionNavLink
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                to="/"
                className="text-zinc-700 font-normal hover:font-medium hover:text-zinc-900 tracking-wide py-2"
              >
                Skin Care
              </MotionNavLink>
              <MotionNavLink
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                to="/"
                className="text-zinc-700 font-normal hover:font-medium hover:text-zinc-900 tracking-wide py-2"
              >
                Hair Care
              </MotionNavLink>
              <MotionNavLink
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                to="/"
                className="text-zinc-700 font-normal hover:font-medium hover:text-zinc-900 tracking-wide py-2"
              >
                Body Care
              </MotionNavLink>

              <MotionNavLink
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                to="/"
                className="text-zinc-700 font-normal hover:font-medium hover:text-zinc-900 tracking-wide py-2"
              >
                Nail Polish
              </MotionNavLink>
              <MotionNavLink
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                viewport={{
                  amount: 0.1,
                  //   once: true,
                }}
                to="/"
                className="text-zinc-700 font-normal hover:font-medium hover:text-zinc-900 tracking-wide py-2"
              >
                Blog
              </MotionNavLink>
              <MotionNavLink
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                to="/"
                className="text-zinc-700 font-normal hover:font-medium hover:text-zinc-900 tracking-wide py-2"
              >
                About
              </MotionNavLink>
            </motion.div>
          </div>
          <div className="flex flex-col">
            <motion.h2
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className="text-2xl text-zinc-700 font-medium tracking-wide leading-16"
            >
              Our Store
            </motion.h2>
            <div className="flex flex-col gap-2">
              <p className="text-md text-zinc-600 font-normal tracking-wide leading-7">
                3455 St Laurent Blvd Montreal, Quebec H2X 2T6
              </p>
              <div className="flex gap-1 items-center text-md text-zinc-600 font-normal tracking-wide leading-7">
                <span className="font-semibold">Mon - Fri</span>
                <span>9 a.m. - 7 p.m</span>
              </div>
              <div className="flex gap-1 items-center text-md text-zinc-600 font-normal tracking-wide leading-7">
                <span className="font-semibold">Sat - Sun</span>
                <span>10 a.m. - 6 p.m</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <motion.h2
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className="text-2xl text-zinc-700 font-medium tracking-wide leading-16"
            >
              Our Promise
            </motion.h2>
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className="text-md text-zinc-600 font-normal tracking-wide leading-7"
            >
              To create high quality, plant-based products that are safe for
              people and the planet.
            </motion.p>
          </div>
          <div className="flex flex-col">
            <motion.h2
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className="text-2xl text-zinc-700 font-medium tracking-wide leading-16"
            >
              Social
            </motion.h2>
            <div className="flex gap-2">
              <a
                target="_blank"
                              href="https://www.facebook.com/"
                              rel="noopener noreferrer"
                              aria-label="Facebook"
                              className="text-zinc-700 hover:text-zinc-900 p-1"
                          >
                <DynamicIcon name="facebook" />
              </a>  
              <a target="_blank" href="https://www.instagram.com/" rel="noopener noreferrer" aria-label="Instagram" className="text-zinc-700 hover:text-zinc-900 p-1">
                <DynamicIcon name="instagram" />
              </a>
              <a target="_blank" href="https://www.twitter.com/" rel="noopener noreferrer" aria-label="Twitter" className="text-zinc-700 hover:text-zinc-900 p-1">
                <DynamicIcon name="twitter" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

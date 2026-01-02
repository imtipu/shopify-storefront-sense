import { motion } from 'motion/react';
import { MotionImage } from '~/components/motion/Image';
import { MotionNavLink } from '~/components/motion/NavLink';
import type {CollectionFragment} from 'storefrontapi.generated';

interface Props {
    collection: CollectionFragment;
    index: number;
}

export default function CollectionGridItem({collection, index}: Props) {
    return (
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='relative'
      >
        <MotionNavLink
          to={`/collections/${collection.handle}`}
          prefetch="intent"
          className={
            'flex flex-col items-center justify-center w-full bg-zinc-50 relative overflow-hidden rounded-2xl'
          }
            >
          {collection?.image ? (
                    <MotionImage
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: index * 0.1}}
              alt={collection.image.altText || collection.title}
                        aspectRatio="1/1"
                        width={300}
                        height={300}
                        
              data={collection.image}
              loading={index < 3 ? 'eager' : undefined}
                        sizes="(min-width: 45em) 400px, 100vw"
                        className='w-full max-h-[300px] object-cover object-center'
                        
            />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[300px] lg:min-h-[300px] w-full bg-zinc-200 max-h-[300px]"></div>
          )}
          <div className={'flex flex-col items-center justify-center w-full py-5'}>
            <h2 className='text-lg font-medium text-zinc-700'>{collection.title}</h2>
          </div>
        </MotionNavLink>
      </motion.div>
    );
}

import type {ApiProductVariantFragment} from 'storefrontapi.generated';
import { Image } from '@shopify/hydrogen';
import { motion } from 'motion/react';

import { MotionImage } from '~/components/motion/Image';

export function ProductImage({
  image,
  baseClassName,
  className,
  onClick,
}: {
  image: ApiProductVariantFragment['image'];
    baseClassName?: string;
  className?: string;
    onClick?: (image: ApiProductVariantFragment['image']) => void;
}) {
  if (!image) {
    return <div className="product-image" />;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={baseClassName + ' product-image flex flex-col relative'}>
      <MotionImage
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        alt={image.altText || 'Product Image'}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        sizes="(min-width: 45em) 50vw, 100vw"
        className={className}
        onClick={() => onClick?.(image)}
      />
    </motion.div>
  );
}

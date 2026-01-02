import type {ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';
import {motion} from 'motion/react';

export function ProductMedia({
  image,
  selectedVariant,
  variants, // Pass variants if we want to show a gallery/carousel
}: {
  image: ProductVariantFragment['image'];
  selectedVariant?: ProductVariantFragment | null;
  variants?: ProductVariantFragment[];
}) {
  if (!image) {
    return <div className="aspect-4/5 bg-zinc-100 rounded-xl w-full" />;
  }
  
  // Future improvement: Add carousel or grid of all images
  // For now, just show the selected variant image nicely
  return (
    <div className="w-full relative overflow-hidden rounded-xl bg-zinc-50 border border-zinc-100">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
        >
            <Image
                alt={image.altText || 'Product Image'}
                aspectRatio="4/5"
                data={image}
                key={image.id}
                sizes="(min-width: 45em) 50vw, 100vw"
                className="w-full h-full object-cover"
            />
      </motion.div>
    </div>
  );
}

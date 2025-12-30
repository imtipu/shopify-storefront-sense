import type {ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

export function ProductImage({
  image,
  baseClassName,
  className,
}: {
  image: ProductVariantFragment['image'];
    baseClassName?: string;
  className?: string;
}) {
  if (!image) {
    return <div className="product-image" />;
  }
  return (
    <div className={baseClassName + ' product-image flex flex-col relative'}>
      <Image
        alt={image.altText || 'Product Image'}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        sizes="(min-width: 45em) 50vw, 100vw"
        className={className}
      />
    </div>
  );
}

import {motion} from 'motion/react';
import type {ProductFragment} from 'storefrontapi.generated';
import {ProductPrice} from './ProductPrice';
import {ProductForm} from './ProductForm';

interface ProductInfoProps {
  product: ProductFragment;
  selectedVariant: any;
  productOptions: any;
}

export const ProductInfo = (props: ProductInfoProps) => {
  const {product, selectedVariant, productOptions} = props;
  const {title} = product;
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.3}}
    >
      <div className="product-info flex flex-col">
        <motion.h1
          initial={{opacity: 0, y: -10}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.3}}
          className="text-xl lg:text-2xl font-medium tracking-wide text-zinc-900"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{opacity: 0, y: -10}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.3}}
          className="flex flex-col w-full py-5"
        >
          <ProductPrice
            price={selectedVariant?.price}
            compareAtPrice={selectedVariant?.compareAtPrice}
          />
        </motion.div>
        <motion.div
          initial={{opacity: 0, y: -10}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.3}}
          className="flex flex-col w-full py-5"
        >
          <ProductForm
            productOptions={productOptions}
            selectedVariant={selectedVariant}
          />
              </motion.div>
              
              {product.descriptionHtml && (
                <motion.div
                  initial={{opacity: 0, y: -10}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.3}}
                  className="flex flex-col w-full py-5 relative"
                  >
                      <h4 className="text-zinc-600 tracking-wide mb-2">Description</h4>
                      <div
                          className="text-zinc-700 text-sm"
                    dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
                  />
                </motion.div>
              )}
      </div>
    </motion.div>
  );
};

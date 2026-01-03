import {useEffect} from 'react';
import {useFetcher} from 'react-router';
import {AnimatePresence, motion} from 'motion/react';
import {useUIStore} from '~/stores/store';
import {Image, Money} from '@shopify/hydrogen';
import {ProductForm} from '~/components/products/ProductForm';
import {
  useOptimisticVariant,
  getAdjacentAndFirstAvailableVariants,
  getProductOptions,
} from '@shopify/hydrogen';
import {IoClose} from 'react-icons/io5';

export function QuickViewModal() {
  const {isQuickViewOpen, quickViewProductHandle, closeQuickView} =
    useUIStore();
  const fetcher = useFetcher();

  useEffect(() => {
    if (isQuickViewOpen && quickViewProductHandle) {
      fetcher.load(`/api/product/${quickViewProductHandle}`);
    }
  }, [isQuickViewOpen, quickViewProductHandle]);

  const product = fetcher.data?.product;
  const isLoading = fetcher.state === 'loading';

  return (
    <AnimatePresence>
      {isQuickViewOpen && (
        <>
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={closeQuickView}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{opacity: 0, scale: 0.95, y: 20}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={{opacity: 0, scale: 0.95, y: 20}}
              className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto relative flex flex-col md:flex-row"
            >
              <button
                onClick={closeQuickView}
                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-800 z-10 bg-white/50 backdrop-blur rounded-full transition-colors"
              >
                <IoClose size={24} />
              </button>

              {isLoading || !product ? (
                <div className="w-full h-96 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
                </div>
              ) : (
                <QuickViewContent product={product} />
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function QuickViewContent({product}: {product: any}) {
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const {title, descriptionHtml} = product;

  return (
    <>
      <div className="w-full md:w-1/2 bg-zinc-50 relative aspect-square md:aspect-auto">
        {selectedVariant?.image && (
          <Image
            data={selectedVariant.image}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="w-full h-full object-cover absolute inset-0 md:relative"
          />
        )}
      </div>
      <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight mb-2">
            {title}
          </h2>
          <div className="text-xl text-zinc-700">
            <Money data={selectedVariant?.price} />
            {selectedVariant?.compareAtPrice && (
              <span className="ml-2 text-zinc-400 line-through text-lg">
                <Money data={selectedVariant.compareAtPrice} />
              </span>
            )}
          </div>
        </div>

        <div className="flex">
          <ProductForm
            productOptions={productOptions}
            selectedVariant={selectedVariant}
          />
        </div>

        <div className="text-sm text-zinc-500 line-clamp-3 leading-relaxed">
          <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
        </div>

        <div className="border-t border-zinc-100 pt-4 mt-auto">
          <a
            href={`/products/${product.handle}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wide"
          >
            View Full Details &rarr;
          </a>
        </div>
      </div>
    </>
  );
}

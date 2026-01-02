
import { AnimatePresence, motion } from 'motion/react';
import {ProductImage} from '~/components/ProductImage';
import {MotionImage} from '~/components/motion/Image';
import { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';

interface MediaGalleryProps {
  selectedVariant: any;
  enableZoom?: boolean;
  images?: any[];
}

export function MediaGallery(props: MediaGalleryProps) {
  const {selectedVariant, enableZoom, images} = props;
  const hasProductImages = (images?.length || 0) >= 1;
  const [zoomImage, setZoomImage] = useState<any>(null);
  
  const handleZoom = (image: any) => {
    if (zoomImage?.id === image?.id) {
      setZoomImage(null);
    } else {
      setZoomImage(image);
    }
  };

  useEffect(() => {
    if (zoomImage) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    }
  }, [zoomImage]);

  return (
    <div className="flex flex-col w-full relative">
      <div className="flex flex-col w-full h-full max-w-[500px] max-h-[500px] relative">
        <ProductImage
          image={selectedVariant?.image}
          baseClassName="w-full h-full max-w-[500px] max-h-[500px] relative rounded-2xl shadow-lg"
          className={`w-full h-full object-cover object-center cursor-zoom-in`}
          onClick={handleZoom}
        />
      </div>

      {hasProductImages && (
        <div className="flex w-full max-w-[500px] max-h-[500px] relative py-4">
          {/* other images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {images?.map((image: any, index: number) =>
              // zoom condition
              <ProductImage
                key={image.id}
                image={image}
                baseClassName="w-full h-full object-cover object-center relative rounded-2xl shadow-lg"
                className="w-full h-full cursor-zoom-in"
                onClick={(data) => setZoomImage(data)}
              />
            )}
          </div>
        </div>
      )}
      <AnimatePresence mode="wait">
        {zoomImage && (
          <ZoomImage key={zoomImage.id} image={zoomImage} onClose={() => setZoomImage(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

interface Props {
    image: any;
    onClose?: () => void;
}



function ZoomImage(props: Props) {
  const {image, onClose} = props;
  const {altText} = image;

  return (
    <motion.div
      initial={{opacity: 0,}}
      animate={{opacity: 1,}}
      exit={{opacity: 0, scale: 0}}
      transition={{duration: 0.2, ease: 'easeInOut'}}
      onClick={() => onClose?.()}
      className="fixed inset-0 top-0 bg-white z-50 flex items-center justify-center p-4 lg:p-10"
    >
      <button
        type="button"
        onClick={() => onClose?.()}
        className="absolute top-4 right-4 cursor-pointer p-2 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100/50 hover:bg-slate-200"
      >
        <XIcon size={24} />
      </button>

      <MotionImage
        initial={{opacity: 0, scale: 0}}
        animate={{opacity: 1, scale: 1}}
        exit={{opacity: 0, scale: 0}}
        transition={{duration: 0.5, ease: 'easeInOut'}}
        data={image}
        alt={altText}
        width={2000}
        height={2000}
        className="max-w-full max-h-full object-contain"
      />
    </motion.div>
  );
}

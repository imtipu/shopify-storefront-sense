import {useState} from 'react';

import {motion} from 'motion/react';

import {useImageZoom} from '~/stores/media';
import {MotionImage} from '~/components/motion/Image';
import {IoClose} from 'react-icons/io5';

interface Props {
  image: any;
  id?: string;
  src?: string;
  altText?: string;
  width?: number;
  height?: number;
}

export function ZoomImage(props: Props) {
  // const {
  //     id,
  //     src,
  //     altText,
  //     width,
  //     height,
  //     isZoomed,
  //     setIsZoomed
  // } = useImageZoom();

  const {image} = props;
  const [isZoomed, setIsZoomed] = useState(false);
  const {altText, width, height} = image;

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <>
      <MotionImage
        // src={src}
        data={image}
        alt={altText}
        width={width}
        height={height}
        onClick={handleZoom}
        className="cursor-zoom-in"
      />
      {isZoomed && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          onClick={handleZoom}
          className="fixed inset-0 top-0 bg-white z-50 flex items-center justify-center"
        >
          <button
            type="button"
            onClick={handleZoom}
            className="absolute top-4 right-4 cursor-pointer"
          >
            <IoClose size={24} />
          </button>
          <MotionImage
            data={image}
            alt={altText}
            width={width}
            height={height}
            className="max-w-full max-h-full"
          />
        </motion.div>
      )}
    </>
  );
}
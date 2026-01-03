import CollectionImage1Src from '~/assets/images/collection-1.webp';
import CollectionImage2Src from '~/assets/images/collection-2.webp';
import CollectionImage3Src from '~/assets/images/collection-3.webp';
import CollectionImage4Src from '~/assets/images/collection-4.jpg';
import CollectionImage5Src from '~/assets/images/collection-5.jpg';


export const DemoCollections = [
  {
    id: 1,
    title: 'Face Care',
    url: '/collections/all',
    image: {
      src: CollectionImage1Src,
      altText: 'Skin Care',
    },
  },
  {
    id: 2,
    title: 'Body Care',
    url: '/collections/all',
    image: {
      src: CollectionImage2Src,
      altText: 'Body Care',
    },
  },
  {
    id: 3,
    title: 'Skin Care',
    url: '/collections/all',
    image: {
      src: CollectionImage3Src,
      altText: 'Skin Care',
    },
  },
  {
    id: 4,
    title: 'Hair Care',
    url: '/collections/all',
    image: {
      src: CollectionImage5Src,
      altText: 'Hair Care',
    },
  },
];

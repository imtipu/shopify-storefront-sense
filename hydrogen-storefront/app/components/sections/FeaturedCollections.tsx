import {NavLink} from 'react-router';
import {Image} from '@shopify/hydrogen';
import CollectionImage1Src from '~/assets/images/collection-1.webp';
import CollectionImage2Src from '~/assets/images/collection-2.webp';
import CollectionImage3Src from '~/assets/images/collection-3.webp';

export default function FeaturedCollections() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-start justify-center px-3 xl:px-0 py-10 w-full container">
        <h2 className="text-2xl text-zinc-700 font-medium tracking-wide mb-3">
          Shop our most trusted formulas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6 w-full justify-center items-center">
          <NavLink
            to="#"
            className="flex flex-col mx-auto sm:mr-auto justify-center relative overflow-hidden rounded-xl shadow-md hover:shadow-lg shadow-zinc-200 hover:shadow-zinc-300 bg-white/40 w-full sm:max-w-xs"
          >
            <div className="flex flex-col items-center justify-center w-full h-100 sm:h-70">
              <Image
                data={{
                  url: CollectionImage1Src,
                  altText: 'Collection 1',
                  width: 1000,
                  height: 1000,
                }}
                alt=""
                sizes="100vw"
                aspectRatio="1/1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-center w-full px-3 py-5">
              <h3 className="text-lg font-medium tracking-wide text-center">
                Collection 1
              </h3>
            </div>
          </NavLink>
          <NavLink
            to="#"
            className="flex flex-col mx-auto sm:ml-auto justify-center relative overflow-hidden rounded-xl shadow-md hover:shadow-lg shadow-zinc-200 hover:shadow-zinc-300 bg-white/40 w-full sm:max-w-xs"
          >
            <div className="flex flex-col w-full h-100 sm:h-70">
              <Image
                data={{
                  url: CollectionImage2Src,
                  altText: 'Collection 2',
                  width: 1000,
                  height: 1000,
                }}
                alt=""
                sizes="100vw"
                aspectRatio="1/1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-center w-full px-3 py-5">
              <h3 className="text-lg font-medium tracking-wide text-center">
                Collection 2
              </h3>
            </div>
          </NavLink>
          <NavLink
            to="#"
            className="flex flex-col mx-auto sm:ml-auto justify-center relative overflow-hidden rounded-xl shadow-md hover:shadow-lg shadow-zinc-200 hover:shadow-zinc-300 bg-white/40 w-full sm:max-w-xs"
          >
            <div className="flex flex-col w-full h-100 sm:h-70">
              <Image
                data={{
                  url: CollectionImage3Src,
                  altText: 'Collection 3',
                  width: 1000,
                  height: 1000,
                }}
                alt=""
                sizes="100vw"
                aspectRatio="1/1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col mx-auto justify-center w-full px-3 py-5">
              <h3 className="text-lg font-medium tracking-wide text-center">
                Collection 3
              </h3>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

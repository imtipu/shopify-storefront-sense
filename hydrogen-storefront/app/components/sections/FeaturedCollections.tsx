import {NavLink} from 'react-router';
import {Image} from '@shopify/hydrogen';

import {DemoCollections} from '~/constants/collections';

export default function FeaturedCollections() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-start justify-center px-3 xl:px-0 py-10 w-full container">
        <h2 className="text-2xl text-zinc-700 font-medium tracking-wide mb-3">
          Shop our most trusted formulas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
          {DemoCollections.map((collection) => (
            <NavLink
              to={collection.url}
              className="flex flex-col sm:mr-auto relative overflow-hidden rounded-xl shadow-md hover:shadow-lg shadow-zinc-200 hover:shadow-zinc-300 bg-white/40 w-full sm:max-w-xs"
            >
              <div className="flex flex-col items-center justify-center w-full h-100 sm:h-70">
                <Image
                  data={{
                    url: collection.image.src,
                    altText: collection.image.altText,
                    width: 400,
                    height: 400,
                  }}
                  alt=""
                  sizes="100vw"
                  aspectRatio="1/1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full px-3 py-5">
                <h3 className="text-lg font-medium tracking-wide text-center">
                  {collection.title}
                </h3>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

import {Suspense} from 'react';
import ProductGridItem from '~/components/snippets/ProductGridItem';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import {Await} from 'react-router';




interface Props {
  products: Promise<RecommendedProductsQuery | null>;
}

export default function RecommendedProducts(props: Props) {
  const {products} = props;
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-col items-start justify-center px-3 xl:px-0 py-10 max-w-6xl">
        <h2 className="text-2xl text-zinc-700 font-medium tracking-wide leading-16">
          Shop our most trusted formulas
        </h2>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={products}>
            {(response) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
                {response
                  ? response.products.nodes.map((product) => (
                      <ProductGridItem key={product.id} product={product} />
                    ))
                  : null}
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

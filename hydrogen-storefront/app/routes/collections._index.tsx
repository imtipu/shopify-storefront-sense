import {useLoaderData, Link} from 'react-router';
import type {Route} from './+types/collections._index';
import {getPaginationVariables, Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import CollectionGridItem from '~/components/collections/CollectionGridItem';
import {COLLECTIONS_QUERY} from '~/graphql/collections';

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request}: Route.LoaderArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  const [{collections}] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {collections};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export const meta: Route.MetaFunction = ({data}) => {
  return [
    {
      title: 'Collections',
    },
    {
      name: 'description',
      content: 'Collections',
    },
    {
      name: 'keywords',
      content: 'Collections',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ];
};

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div className="collections flex flex-col w-full items-center py-10">
      <div className="container flex flex-col w-full">
        <div className="flex flex-col w-full items-center justify-center py-5 gap-4">
          <h1 className="text-lg lg:text-2xl font-medium text-zinc-700">
            Collections
          </h1>
          <p className="text-sm lg:text-base text-zinc-500">
            Browse our collections
          </p>
        </div>
        <PaginatedResourceSection<CollectionFragment>
          connection={collections}
          resourcesClassName="collections-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-x-15 xl:gap-y-10"
        >
          {({node: collection, index}) => (
            <CollectionGridItem
              key={collection.id}
              collection={collection}
              index={index}
            />
          )}
        </PaginatedResourceSection>
      </div>
    </div>
  );
}

function CollectionItem({
  collection,
  index,
}: {
  collection: CollectionFragment;
  index: number;
}) {
  return (
    <Link
      className="collection-item"
      key={collection.id}
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      {collection?.image && (
        <Image
          alt={collection.image.altText || collection.title}
          aspectRatio="1/1"
          data={collection.image}
          loading={index < 3 ? 'eager' : undefined}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}
      <h5>{collection.title}</h5>
    </Link>
  );
}

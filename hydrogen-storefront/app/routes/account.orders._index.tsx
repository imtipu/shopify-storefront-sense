import {
  Link,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from 'react-router';
import type {Route} from './+types/account.orders._index';
import {useRef} from 'react';
import {
  Money,
  getPaginationVariables,
  flattenConnection,
} from '@shopify/hydrogen';
import {
  buildOrderSearchQuery,
  parseOrderFilters,
  ORDER_FILTER_FIELDS,
  type OrderFilterParams,
} from '~/lib/orderFilters';
import {CUSTOMER_ORDERS_QUERY} from '~/graphql/customer-account/CustomerOrdersQuery';
import type {
  CustomerOrdersFragment,
  OrderItemFragment,
} from 'customer-accountapi.generated';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {
  IoSearchOutline,
  IoChevronForwardOutline,
  IoCloseOutline,
  IoBagHandleOutline,
  IoCalendarOutline,
  IoWalletOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
  IoRefreshOutline,
} from 'react-icons/io5';

type OrdersLoaderData = {
  customer: CustomerOrdersFragment;
  filters: OrderFilterParams;
};

export const meta: Route.MetaFunction = () => {
  return [{title: 'Order History'}];
};

export async function loader({request, context}: Route.LoaderArgs) {
  const {customerAccount} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20,
  });

  const url = new URL(request.url);
  const filters = parseOrderFilters(url.searchParams);
  const query = buildOrderSearchQuery(filters);

  const {data, errors} = await customerAccount.query(CUSTOMER_ORDERS_QUERY, {
    variables: {
      ...paginationVariables,
      query,
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw Error('Customer orders not found');
  }

  return {customer: data.customer, filters};
}

export default function Orders() {
  const {customer, filters} = useLoaderData<OrdersLoaderData>();
  const {orders} = customer;

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-0 md:px-0 gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold tracking-normal text-zinc-700">
          Order History
        </h1>
        <p className="text-sm text-zinc-700 font-normal tracking-normal">
          Manage and track your recent purchases.
        </p>
      </div>

      <OrderSearchForm currentFilters={filters} />
      <OrdersTable orders={orders} filters={filters} />
    </div>
  );
}

function OrdersTable({
  orders,
  filters,
}: {
  orders: CustomerOrdersFragment['orders'];
  filters: OrderFilterParams;
}) {
  const hasFilters = !!(filters.name || filters.confirmationNumber);

  return (
    <div className="w-full" aria-live="polite">
      {orders?.nodes.length ? (
        <div className="flex flex-col gap-4">
          <PaginatedResourceSection connection={orders}>
            {({node: order}) => <OrderItem key={order.id} order={order} />}
          </PaginatedResourceSection>
        </div>
      ) : (
        <EmptyOrders hasFilters={hasFilters} />
      )}
    </div>
  );
}

function EmptyOrders({hasFilters = false}: {hasFilters?: boolean}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 bg-white border-2 border-dashed border-black/10">
      <div className="p-4 bg-black text-white rounded-full mb-4">
        <IoBagHandleOutline className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-black tracking-tight">
        {hasFilters ? 'No matches found' : 'No orders yet'}
      </h3>
      <p className="text-sm text-black/60 mt-1 mb-6 text-center max-w-[280px] font-medium">
        {hasFilters
          ? 'Try adjusting your search or filters to find what you’re looking for.'
          : 'When you place an order, it will appear here for you to track and manage.'}
      </p>
      <Link
        to={hasFilters ? '/account/orders' : '/collections'}
        className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white text-sm font-bold hover:bg-black/80 transition-all border-2 border-black"
      >
        {hasFilters ? (
          <>
            <IoRefreshOutline className="w-4 h-4" />
            Clear filters
          </>
        ) : (
          <>
            Start Shopping
            <IoChevronForwardOutline className="w-4 h-4" />
          </>
        )}
      </Link>
    </div>
  );
}

function OrderSearchForm({
  currentFilters,
}: {
  currentFilters: OrderFilterParams;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const isSearching =
    navigation.state !== 'idle' &&
    navigation.location?.pathname?.includes('orders');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();

    const name = formData.get(ORDER_FILTER_FIELDS.NAME)?.toString().trim();
    const confirmationNumber = formData
      .get(ORDER_FILTER_FIELDS.CONFIRMATION_NUMBER)
      ?.toString()
      .trim();

    if (name) params.set(ORDER_FILTER_FIELDS.NAME, name);
    if (confirmationNumber)
      params.set(ORDER_FILTER_FIELDS.CONFIRMATION_NUMBER, confirmationNumber);

    setSearchParams(params);
  };

  const hasFilters = !!(
    currentFilters.name || currentFilters.confirmationNumber
  );

  return (
    <div className="flex flex-col w-full">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3"
        aria-label="Search orders"
      >
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-700">
            <IoSearchOutline className="w-4 h-4" />
          </div>
          <input
            type="search"
            name={ORDER_FILTER_FIELDS.NAME}
            placeholder="Search by Order #..."
            aria-label="Order number"
            defaultValue={currentFilters.name || ''}
            className="w-full pl-11 pr-4 py-3 text-sm bg-white border-2 border-black/10 text-zinc-700 font-normal placeholder:text-black/40 focus:border-black outline-none transition-all"
          />
        </div>

        <div className="relative md:w-64">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-700">
            <IoBagHandleOutline className="w-4 h-4" />
          </div>
          <input
            type="search"
            name={ORDER_FILTER_FIELDS.CONFIRMATION_NUMBER}
            placeholder="Confirmation #"
            aria-label="Confirmation number"
            defaultValue={currentFilters.confirmationNumber || ''}
            className="w-full pl-11 pr-4 py-3 text-sm bg-white border-2 border-black/10 text-zinc-700 font-normal placeholder:text-zinc-700/40 focus:border-zinc-700 outline-none transition-all"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSearching}
            className="flex-1 md:flex-none inline-flex items-center justify-center px-8 py-3 bg-zinc-700 text-white text-sm font-normal border-2 border-zinc-700 hover:bg-white hover:text-zinc-700 disabled:opacity-50 transition-all min-w-[100px]"
          >
            {isSearching ? (
              <IoRefreshOutline className="w-4 h-4 animate-spin" />
            ) : (
              'Search'
            )}
          </button>
          {hasFilters && (
            <button
              type="button"
              disabled={isSearching}
              onClick={() => {
                setSearchParams(new URLSearchParams());
                formRef.current?.reset();
              }}
              className="inline-flex items-center justify-center p-3 text-zinc-700 bg-white border-2 border-zinc-700 hover:bg-zinc-700 hover:text-white transition-all"
              title="Clear Filters"
            >
              <IoCloseOutline className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function OrderItem({order}: {order: OrderItemFragment}) {
  const fulfillmentStatus = flattenConnection(order.fulfillments)[0]?.status;

  return (
    <Link
      to={`/account/orders/${btoa(order.id)}`}
      className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border-2 border-zinc-700/5 hover:border-zinc-700 transition-all duration-300"
    >
      <div className="flex items-start md:items-center gap-6">
        <div className="hidden md:flex items-center justify-center w-12 h-12 border-2 border-zinc-700/5 group-hover:bg-zinc-700 group-hover:border-zinc-700 group-hover:text-white transition-all shrink-0">
          <IoBagHandleOutline className="w-5 h-5" />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="text-lg font-medium text-zinc-700 tracking-wider">
              #{order.number}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider border ${
                order.financialStatus === 'PAID'
                  ? 'bg-zinc-700 text-white border-zinc-700'
                  : 'bg-white text-zinc-700 border-zinc-700'
              }`}
            >
              {order.financialStatus}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-zinc-700/60">
            <span className="flex items-center gap-1.5">
              <IoCalendarOutline className="w-3.5 h-3.5" />
              {new Date(order.processedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            {fulfillmentStatus && (
              <span className="flex items-center gap-1.5 capitalize">
                {fulfillmentStatus === 'SUCCESS' ? (
                  <IoCheckmarkCircleOutline className="w-3.5 h-3.5 text-zinc-700" />
                ) : (
                  <IoAlertCircleOutline className="w-3.5 h-3.5" />
                )}
                {fulfillmentStatus.toLowerCase()}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-8 mt-6 md:mt-0 pt-6 md:pt-0 border-t-2 border-zinc-700/5 md:border-0 bg-transparent">
        <div className="flex flex-col md:items-end">
          <span className="text-[10px] text-zinc-700/60 uppercase tracking-widest font-bold mb-0.5">
            Total
          </span>
          <div className="text-base font-semibold text-zinc-700 tracking-wider">
            <Money data={order.totalPrice} />
          </div>
        </div>

        <div className="p-2 border-2 border-zinc-700/10 group-hover:bg-zinc-700 group-hover:border-zinc-700 group-hover:text-white transition-all shrink-0">
          <IoChevronForwardOutline className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}

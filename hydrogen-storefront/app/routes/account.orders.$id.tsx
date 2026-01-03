import {Link, redirect, useLoaderData} from 'react-router';
import type {Route} from './+types/account.orders.$id';
import {Money, Image} from '@shopify/hydrogen';
import type {
  OrderLineItemFullFragment,
  OrderQuery,
} from 'customer-accountapi.generated';
import {CUSTOMER_ORDER_QUERY} from '~/graphql/customer-account/CustomerOrderQuery';
import {
  IoChevronBackOutline,
  IoCalendarOutline,
  IoLocationOutline,
  IoBagHandleOutline,
  IoInformationCircleOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
} from 'react-icons/io5';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `Order ${data?.order?.name}`}];
};

export async function loader({params, context}: Route.LoaderArgs) {
  const {customerAccount} = context;
  if (!params.id) {
    return redirect('/account/orders');
  }

  const orderId = atob(params.id);
  const {data, errors}: {data: OrderQuery; errors?: Array<{message: string}>} =
    await customerAccount.query(CUSTOMER_ORDER_QUERY, {
      variables: {
        orderId,
        language: customerAccount.i18n.language,
      },
    });

  if (errors?.length || !data?.order) {
    throw new Error('Order not found');
  }

  const {order} = data;

  const lineItems = order.lineItems.nodes;
  const discountApplications = order.discountApplications.nodes;
  const fulfillmentStatus =
    order.fulfillments.nodes[0]?.status ?? 'UNFULFILLED';
  const firstDiscount = discountApplications[0]?.value;

  const discountValue =
    firstDiscount?.__typename === 'MoneyV2'
      ? (firstDiscount as Extract<
          typeof firstDiscount,
          {__typename: 'MoneyV2'}
        >)
      : null;

  const discountPercentage =
    firstDiscount?.__typename === 'PricingPercentageValue'
      ? (
          firstDiscount as Extract<
            typeof firstDiscount,
            {__typename: 'PricingPercentageValue'}
          >
        ).percentage
      : null;

  return {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  };
}

export default function OrderRoute() {
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  } = useLoaderData<typeof loader>();

  return (
    <div className="w-full">
      <Link
        to="/account/orders"
        className="inline-flex items-center gap-2 text-sm font-bold text-zinc-700/60 hover:text-zinc-700 transition-colors mb-5 group"
      >
        <IoChevronBackOutline className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to orders
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-zinc-700 tracking-wider">
              Order {order.name}
            </h2>
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
          <div className="flex items-center gap-4 text-sm text-zinc-700/60 mt-2 font-medium">
            <span className="flex items-center gap-1.5">
              <IoCalendarOutline className="w-4 h-4" />
              {new Date(order.processedAt!).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {order.confirmationNumber && (
              <span className="flex items-center gap-1.5">
                <IoInformationCircleOutline className="w-4 h-4" />
                Ref: {order.confirmationNumber}
              </span>
            )}
          </div>
        </div>

        <a
          href={order.statusPageUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-zinc-700 text-white text-sm font-bold border-2 border-zinc-700 hover:bg-white hover:text-zinc-700 transition-all shadow-sm"
        >
          Track Order
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Line Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-4 pl-1">
            <IoBagHandleOutline className="w-5 h-5 text-black" />
            <h3 className="text-sm font-medium text-zinc-700 uppercase tracking-wider">
              Items
            </h3>
          </div>

          <div className="bg-white border-2 border-black/5">
            <div className="divide-y-2 divide-black/5">
              {lineItems.map((lineItem, index) => (
                <OrderLineRow
                  key={`${lineItem.id}-${index}`}
                  lineItem={lineItem}
                />
              ))}
            </div>

            <div className="bg-white p-8 space-y-4 border-t-2 border-black/5">
              {((discountValue && discountValue.amount) ||
                discountPercentage) && (
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-700/60 font-bold lowercase">
                    Discounts
                  </span>
                  <span className="font-semibold text-zinc-700">
                    {discountPercentage
                      ? `-${discountPercentage}% OFF`
                      : discountValue && <Money data={discountValue} />}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-zinc-700/60 font-bold lowercase">
                  Subtotal
                </span>
                <span className="font-semibold text-zinc-700 tracking-wider">
                  <Money data={order.subtotal!} />
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-700/60 font-bold lowercase">
                  Tax
                </span>
                <span className="font-semibold text-zinc-700 tracking-wider">
                  <Money data={order.totalTax!} />
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t-2 border-black/5">
                <span className="text-base font-bold text-zinc-800 uppercase tracking-wider">
                  Total
                </span>
                <span className="text-xl font-bold text-zinc-800 tracking-wider">
                  <Money data={order.totalPrice!} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-6 pl-1">
              <IoLocationOutline className="w-5 h-5 text-black" />
              <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wider">
                Shipping Address
              </h3>
            </div>
            <div className="p-8 bg-white border-2 border-black/5">
              {order?.shippingAddress ? (
                <div className="text-sm text-zinc-800/60 space-y-1.5 leading-relaxed font-medium">
                  <p className="font-bold text-zinc-800 mb-2 text-base">
                    {order.shippingAddress.name}
                  </p>
                  {order.shippingAddress.formatted?.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-black/40 italic font-medium">
                  No shipping address defined
                </p>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-6 pl-1">
              <IoCheckmarkCircleOutline className="w-5 h-5 text-zinc-800" />
              <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wider">
                Status
              </h3>
            </div>
            <div className="p-8 bg-white border-2 border-black/5">
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 border-2 ${
                    fulfillmentStatus === 'FULFILLED'
                      ? 'bg-zinc-800 text-white border-zinc-800'
                      : 'bg-white text-zinc-800 border-zinc-800/10'
                  }`}
                >
                  {fulfillmentStatus === 'FULFILLED' ? (
                    <IoCheckmarkCircleOutline className="w-5 h-5" />
                  ) : (
                    <IoAlertCircleOutline className="w-5 h-5" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest pl-0.5">
                    Fulfillment
                  </span>
                  <span className="text-sm font-bold text-zinc-800/60 capitalize">
                    {fulfillmentStatus.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function OrderLineRow({lineItem}: {lineItem: OrderLineItemFullFragment}) {
  return (
    <div className="flex items-center gap-6 p-6 group transition-colors hover:bg-zinc-800/[0.02]">
      <div className="relative shrink-0">
        <div className="w-20 h-20 bg-white border-2 border-zinc-800/10 overflow-hidden">
          {lineItem?.image && (
            <Image
              data={lineItem.image}
              width={80}
              height={80}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-800 text-white text-[10px] font-bold flex items-center justify-center border-2 border-zinc-800 shadow-sm">
          {lineItem.quantity}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-zinc-800 truncate tracking-wide">
          {lineItem.title}
        </h4>
        <p className="text-xs text-zinc-800/40 mt-1 uppercase tracking-widest font-semibold">
          {lineItem.variantTitle}
        </p>
      </div>

      <div className="text-right">
        <div className="text-sm font-bold text-zinc-800">
          <Money data={lineItem.price!} />
        </div>
        {lineItem.totalDiscount && lineItem.totalDiscount.amount !== '0.0' && (
          <div className="text-[10px] text-zinc-800/60 font-semibold uppercase tracking-wider mt-1">
            Saved: <Money data={lineItem.totalDiscount} />
          </div>
        )}
      </div>
    </div>
  );
}

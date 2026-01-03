import {
  data as remixData,
  Form,
  NavLink,
  Outlet,
  useLoaderData,
} from 'react-router';
import type {Route} from './+types/account';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';
import {
  IoBagHandleOutline,
  IoPersonOutline,
  IoLocationOutline,
  IoLogOutOutline,
} from 'react-icons/io5';

export function shouldRevalidate() {
  return true;
}

export async function loader({context}: Route.LoaderArgs) {
  const {customerAccount} = context;
  const {data, errors} = await customerAccount.query(CUSTOMER_DETAILS_QUERY, {
    variables: {
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return remixData(
    {customer: data.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}

export default function AccountLayout() {
  const {customer} = useLoaderData<typeof loader>();

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome back.`
    : 'Account Details';

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="container px-3 sm:px-4 lg:px-5 py-5 md:py-12 w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Sidebar */}
          <div className="w-full lg:w-72">
            <div className="">
              <div className="mb-3 lg:mb-6">
                <h1 className="text-3xl font-semibold tracking-normal text-zinc-800 leading-none mb-2">
                  {heading}
                </h1>
                <p className="text-sm text-zinc-600 font-medium">
                  Manage your account ecosystem.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2 w-full">
                  <h3 className="sr-only lg:not-sr-only text-[12px] font-medium text-zinc-800 uppercase tracking-[0.2em]">
                    Menu
                  </h3>
                  <AccountMenu />
                </div>

                <div className="hidden pt-8 border-t border-zinc-400 md:block">
                  <Logout />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="">
              <Outlet context={{customer}} />
            </div>
            {/* Mobile Logout */}
            <div className="block md:hidden mt-12 pt-8 border-t border-zinc-400">
              <Logout />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function AccountMenu() {
  const navItems = [
    {
      to: '/account/orders',
      label: 'Orders',
      icon: <IoBagHandleOutline className="w-5 h-5" />,
    },
    {
      to: '/account/profile',
      label: 'Profile',
      icon: <IoPersonOutline className="w-5 h-5" />,
    },
    {
      to: '/account/addresses',
      label: 'Addresses',
      icon: <IoLocationOutline className="w-5 h-5" />,
    },
  ];

  return (
    <nav
      role="navigation"
      className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-col gap-3"
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({isActive}) =>
            `flex items-center justify-center lg:justify-start gap-3 px-4 py-2 text-sm font-bold border-2 transition-all duration-200 ${
              isActive
                ? 'bg-zinc-800 text-white border-zinc-800'
                : 'bg-white text-zinc-700 border-zinc-700 hover:bg-zinc-800 hover:text-white'
            }`
          }
        >
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function Logout() {
  return (
    <Form className="account-logout" method="POST" action="/account/logout">
      <button
        type="submit"
        className="group flex items-center justify-center lg:justify-start gap-4 px-4 py-2 w-full text-sm font-bold text-zinc-700 hover:text-white bg-white hover:bg-zinc-700 transition-all duration-200 border-2 border-zinc-700"
      >
        <IoLogOutOutline className="w-5 h-5" />
        <span>Sign out</span>
      </button>
    </Form>
  );
}

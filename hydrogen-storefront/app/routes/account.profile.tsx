import type {CustomerFragment} from 'customer-accountapi.generated';
import type {CustomerUpdateInput} from '@shopify/hydrogen/customer-account-api-types';
import {CUSTOMER_UPDATE_MUTATION} from '~/graphql/customer-account/CustomerUpdateMutation';
import {
  data,
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from 'react-router';
import type {Route} from './+types/account.profile';
import {
  IoPersonOutline,
  IoCheckmarkOutline,
  IoAlertCircleOutline,
  IoRefreshOutline,
} from 'react-icons/io5';

export type ActionResponse = {
  error: string | null;
  customer: CustomerFragment | null;
};

export const meta: Route.MetaFunction = () => {
  return [{title: 'Profile'}];
};

export async function loader({context}: Route.LoaderArgs) {
  context.customerAccount.handleAuthStatus();

  return {};
}

export async function action({request, context}: Route.ActionArgs) {
  const {customerAccount} = context;

  if (request.method !== 'PUT') {
    return data({error: 'Method not allowed'}, {status: 405});
  }

  const form = await request.formData();

  try {
    const customer: CustomerUpdateInput = {};
    const validInputKeys = ['firstName', 'lastName'] as const;
    for (const [key, value] of form.entries()) {
      if (!validInputKeys.includes(key as any)) {
        continue;
      }
      if (typeof value === 'string' && value.length) {
        customer[key as (typeof validInputKeys)[number]] = value;
      }
    }

    const {data, errors} = await customerAccount.mutate(
      CUSTOMER_UPDATE_MUTATION,
      {
        variables: {
          customer,
          language: customerAccount.i18n.language,
        },
      },
    );

    if (errors?.length) {
      throw new Error(errors[0].message);
    }

    if (!data?.customerUpdate?.customer) {
      throw new Error('Customer profile update failed.');
    }

    return {
      error: null,
      customer: data?.customerUpdate?.customer,
    };
  } catch (error: any) {
    return data(
      {error: error.message, customer: null},
      {
        status: 400,
      },
    );
  }
}

export default function AccountProfile() {
  const account = useOutletContext<{customer: CustomerFragment}>();
  const {state} = useNavigation();
  const action = useActionData<ActionResponse>();
  const customer = action?.customer ?? account?.customer;
  const isUpdating = state !== 'idle';
  const success = action && !action.error;

  return (
    <div className="max-w-lg">
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-xl font-bold text-zinc-800 tracking-wider">
          My Profile
        </h2>
        <p className="text-sm text-zinc-800/60 font-normal tracking-wide">
          Update your personal information and preferences.
        </p>
      </div>

      <div className="p-8 bg-white border-2 border-zinc-800/5">
        <Form method="PUT" className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-zinc-800 text-white">
              <IoPersonOutline className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wider">
                Personal Information
              </h3>
              <p className="text-xs text-zinc-800/60 font-medium">
                This information will be used for your future orders.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="block text-[10px] font-semibold text-zinc-800 uppercase tracking-widest pl-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="First name"
                aria-label="First name"
                defaultValue={customer.firstName ?? ''}
                minLength={2}
                className="w-full px-4 py-3 text-sm bg-white border-2 border-zinc-800/10 text-zinc-800 font-medium placeholder:text-zinc-800/30 focus:border-zinc-800 outline-none transition-all rounded-none"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="block text-[10px] font-semibold text-zinc-800 uppercase tracking-widest pl-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Last name"
                aria-label="Last name"
                defaultValue={customer.lastName ?? ''}
                minLength={2}
                className="w-full px-4 py-3 text-sm bg-white border-2 border-zinc-800/10 text-zinc-800 font-medium placeholder:text-zinc-800/30 focus:border-zinc-800 outline-none transition-all rounded-none"
              />
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-4">
            {action?.error && (
              <div className="flex items-center gap-2 px-4 py-3 bg-white text-red-600 text-xs font-bold border-2 border-red-600">
                <IoAlertCircleOutline className="w-4 h-4" />
                {action.error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800 text-white text-xs font-bold border-2 border-zinc-800">
                <IoCheckmarkOutline className="w-4 h-4" />
                Profile updated successfully!
              </div>
            )}

            <button
              type="submit"
              disabled={isUpdating}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-zinc-800 text-white text-sm font-bold border-2 border-zinc-800 hover:bg-white hover:text-zinc-800 disabled:opacity-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              {isUpdating ? (
                <>
                  <IoRefreshOutline className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

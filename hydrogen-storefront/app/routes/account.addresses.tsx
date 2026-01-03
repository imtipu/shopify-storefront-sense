import type {CustomerAddressInput} from '@shopify/hydrogen/customer-account-api-types';
import type {
  AddressFragment,
  CustomerFragment,
} from 'customer-accountapi.generated';
import {
  data,
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
  type Fetcher,
} from 'react-router';
import type {Route} from './+types/account.addresses';
import {
  UPDATE_ADDRESS_MUTATION,
  DELETE_ADDRESS_MUTATION,
  CREATE_ADDRESS_MUTATION,
} from '~/graphql/customer-account/CustomerAddressMutations';
import {
  IoLocationOutline,
  IoAddOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
  IoRefreshOutline,
} from 'react-icons/io5';

export type ActionResponse = {
  addressId?: string | null;
  createdAddress?: AddressFragment;
  defaultAddress?: string | null;
  deletedAddress?: string | null;
  error: Record<AddressFragment['id'], string> | null;
  updatedAddress?: AddressFragment;
};

export const meta: Route.MetaFunction = () => {
  return [{title: 'Addresses'}];
};

export async function loader({context}: Route.LoaderArgs) {
  context.customerAccount.handleAuthStatus();

  return {};
}

export async function action({request, context}: Route.ActionArgs) {
  const {customerAccount} = context;

  try {
    const form = await request.formData();

    const addressId = form.has('addressId')
      ? String(form.get('addressId'))
      : null;
    if (!addressId) {
      throw new Error('You must provide an address id.');
    }

    const isLoggedIn = await customerAccount.isLoggedIn();
    if (!isLoggedIn) {
      return data(
        {error: {[addressId]: 'Unauthorized'}},
        {
          status: 401,
        },
      );
    }

    const defaultAddress = form.has('defaultAddress')
      ? String(form.get('defaultAddress')) === 'on'
      : false;
    const address: CustomerAddressInput = {};
    const keys: (keyof CustomerAddressInput)[] = [
      'address1',
      'address2',
      'city',
      'company',
      'territoryCode',
      'firstName',
      'lastName',
      'phoneNumber',
      'zoneCode',
      'zip',
    ];

    for (const key of keys) {
      const value = form.get(key);
      if (typeof value === 'string') {
        address[key] = value;
      }
    }

    switch (request.method) {
      case 'POST': {
        try {
          const {data, errors} = await customerAccount.mutate(
            CREATE_ADDRESS_MUTATION,
            {
              variables: {
                address,
                defaultAddress,
                language: customerAccount.i18n.language,
              },
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressCreate?.userErrors?.length) {
            throw new Error(data?.customerAddressCreate?.userErrors[0].message);
          }

          if (!data?.customerAddressCreate?.customerAddress) {
            throw new Error('Customer address create failed.');
          }

          return {
            error: null,
            createdAddress: data?.customerAddressCreate?.customerAddress,
            defaultAddress,
          };
        } catch (error: unknown) {
          if (error instanceof Error) {
            return data(
              {error: {[addressId]: error.message}},
              {
                status: 400,
              },
            );
          }
          return data(
            {error: {[addressId]: error}},
            {
              status: 400,
            },
          );
        }
      }

      case 'PUT': {
        try {
          const {data, errors} = await customerAccount.mutate(
            UPDATE_ADDRESS_MUTATION,
            {
              variables: {
                address,
                addressId: decodeURIComponent(addressId),
                defaultAddress,
                language: customerAccount.i18n.language,
              },
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressUpdate?.userErrors?.length) {
            throw new Error(data?.customerAddressUpdate?.userErrors[0].message);
          }

          if (!data?.customerAddressUpdate?.customerAddress) {
            throw new Error('Customer address update failed.');
          }

          return {
            error: null,
            updatedAddress: address,
            defaultAddress,
          };
        } catch (error: unknown) {
          if (error instanceof Error) {
            return data(
              {error: {[addressId]: error.message}},
              {
                status: 400,
              },
            );
          }
          return data(
            {error: {[addressId]: error}},
            {
              status: 400,
            },
          );
        }
      }

      case 'DELETE': {
        try {
          const {data, errors} = await customerAccount.mutate(
            DELETE_ADDRESS_MUTATION,
            {
              variables: {
                addressId: decodeURIComponent(addressId),
                language: customerAccount.i18n.language,
              },
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressDelete?.userErrors?.length) {
            throw new Error(data?.customerAddressDelete?.userErrors[0].message);
          }

          if (!data?.customerAddressDelete?.deletedAddressId) {
            throw new Error('Customer address delete failed.');
          }

          return {error: null, deletedAddress: addressId};
        } catch (error: unknown) {
          if (error instanceof Error) {
            return data(
              {error: {[addressId]: error.message}},
              {
                status: 400,
              },
            );
          }
          return data(
            {error: {[addressId]: error}},
            {
              status: 400,
            },
          );
        }
      }

      default: {
        return data(
          {error: {[addressId]: 'Method not allowed'}},
          {
            status: 405,
          },
        );
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return data(
        {error: error.message},
        {
          status: 400,
        },
      );
    }
    return data(
      {error},
      {
        status: 400,
      },
    );
  }
}

export default function Addresses() {
  const {customer} = useOutletContext<{customer: CustomerFragment}>();
  const {defaultAddress, addresses} = customer;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-lg font-semibold text-zinc-800 tracking-normal">
          Addresses
        </h2>
        <p className="text-sm text-zinc-700/60 font-normal tracking-wide">
          Manage your shipping and billing addresses.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        <section>
          <div className="flex items-center gap-2 mb-6 pl-1">
            <IoAddOutline className="w-5 h-5 text-zinc-800" />
            <h3 className="text-sm font-semibold text-zinc-800 uppercase tracking-wider">
              Add New Address
            </h3>
          </div>
          <div className="p-8 bg-white border-2 border-zinc-800/5 rounded-lg">
            <NewAddressForm />
          </div>
        </section>

        {!!addresses.nodes.length && (
          <section>
            <div className="flex items-center gap-2 mb-6 pl-1">
              <IoLocationOutline className="w-5 h-5 text-zinc-800" />
              <h3 className="text-sm font-semibold text-zinc-800 uppercase tracking-wider">
                Existing Addresses
              </h3>
            </div>
            <ExistingAddresses
              addresses={addresses}
              defaultAddress={defaultAddress}
            />
          </section>
        )}

        {!addresses.nodes.length && (
          <div className="flex flex-col items-center justify-center py-20 bg-white border-2 border-dashed border-zinc-800/5 rounded-lg">
            <IoLocationOutline className="w-8 h-8 text-zinc-800/20 mb-4" />
            <p className="text-sm text-zinc-800/60 font-normal tracking-wide">
              You have no addresses saved yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function NewAddressForm() {
  const newAddress = {
    address1: '',
    address2: '',
    city: '',
    company: '',
    territoryCode: '',
    firstName: '',
    id: 'new',
    lastName: '',
    phoneNumber: '',
    zoneCode: '',
    zip: '',
  } as CustomerAddressInput;

  return (
    <AddressForm
      addressId={'NEW_ADDRESS_ID'}
      address={newAddress}
      defaultAddress={null}
    >
      {({stateForMethod}) => (
        <div className="pt-4">
          <button
            disabled={stateForMethod('POST') !== 'idle'}
            formMethod="POST"
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-zinc-800 text-white text-sm font-semibold border-2 border-zinc-800 hover:bg-white hover:text-zinc-800 disabled:opacity-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            {stateForMethod('POST') !== 'idle' ? (
              <>
                <IoRefreshOutline className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <IoAddOutline className="w-5 h-5" />
                Add Address
              </>
            )}
          </button>
        </div>
      )}
    </AddressForm>
  );
}

function ExistingAddresses({
  addresses,
  defaultAddress,
}: Pick<CustomerFragment, 'addresses' | 'defaultAddress'>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {addresses.nodes.map((address) => (
        <div
          key={address.id}
          className="p-8 bg-white border-2 border-black/5 hover:border-black transition-all"
        >
          <AddressForm
            addressId={address.id}
            address={address}
            defaultAddress={defaultAddress}
          >
            {({stateForMethod}) => (
              <div className="pt-6 flex flex-wrap gap-3">
                <button
                  disabled={stateForMethod('PUT') !== 'idle'}
                  formMethod="PUT"
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 text-white text-xs font-semibold border-2 border-zinc-800 hover:bg-white hover:text-zinc-800 disabled:opacity-50 transition-all"
                >
                  <IoPencilOutline className="w-4 h-4" />
                  {stateForMethod('PUT') !== 'idle' ? 'Saving' : 'Update'}
                </button>
                <button
                  disabled={stateForMethod('DELETE') !== 'idle'}
                  formMethod="DELETE"
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-zinc-800 text-xs font-semibold border-2 border-zinc-800/10 hover:border-red-600 hover:text-red-600 disabled:opacity-50 transition-all"
                >
                  <IoTrashOutline className="w-4 h-4" />
                  {stateForMethod('DELETE') !== 'idle' ? 'Deleting' : 'Delete'}
                </button>
              </div>
            )}
          </AddressForm>
        </div>
      ))}
    </div>
  );
}

export function AddressForm({
  addressId,
  address,
  defaultAddress,
  children,
}: {
  addressId: AddressFragment['id'];
  address: CustomerAddressInput;
  defaultAddress: CustomerFragment['defaultAddress'];
  children: (props: {
    stateForMethod: (method: 'PUT' | 'POST' | 'DELETE') => Fetcher['state'];
  }) => React.ReactNode;
}) {
  const {state, formMethod} = useNavigation();
  const action = useActionData<ActionResponse>();
  const error = action?.error?.[addressId];
  const isDefaultAddress = defaultAddress?.id === addressId;

  const inputStyle =
    'w-full px-4 py-2.5 text-sm bg-white border-2 border-zinc-700/10 text-zinc-800 font-medium placeholder:text-zinc-800/30 focus:border-zinc-700/60 outline-none transition-all rounded-none';
  const labelStyle =
    'block text-[10px] font-semibold text-zinc-700 uppercase tracking-widest pl-1 mb-1';

  return (
    <Form id={addressId} className="space-y-4">
      <input type="hidden" name="addressId" defaultValue={addressId} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={`firstName-${addressId}`} className={labelStyle}>
            First name*
          </label>
          <input
            id={`firstName-${addressId}`}
            name="firstName"
            aria-label="First name"
            autoComplete="given-name"
            defaultValue={address?.firstName ?? ''}
            placeholder="Jane"
            required
            type="text"
            className={inputStyle}
          />
        </div>
        <div>
          <label htmlFor={`lastName-${addressId}`} className={labelStyle}>
            Last name*
          </label>
          <input
            id={`lastName-${addressId}`}
            name="lastName"
            aria-label="Last name"
            autoComplete="family-name"
            defaultValue={address?.lastName ?? ''}
            placeholder="Doe"
            required
            type="text"
            className={inputStyle}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`company-${addressId}`} className={labelStyle}>
          Company
        </label>
        <input
          id={`company-${addressId}`}
          name="company"
          aria-label="Company"
          autoComplete="organization"
          defaultValue={address?.company ?? ''}
          placeholder="Company inc."
          type="text"
          className={inputStyle}
        />
      </div>

      <div>
        <label htmlFor={`address1-${addressId}`} className={labelStyle}>
          Address line 1*
        </label>
        <input
          id={`address1-${addressId}`}
          name="address1"
          aria-label="Address line 1"
          autoComplete="address-line1"
          defaultValue={address?.address1 ?? ''}
          placeholder="123 Main St"
          required
          type="text"
          className={inputStyle}
        />
      </div>

      <div>
        <label htmlFor={`address2-${addressId}`} className={labelStyle}>
          Address line 2
        </label>
        <input
          id={`address2-${addressId}`}
          name="address2"
          aria-label="Address line 2"
          autoComplete="address-line2"
          defaultValue={address?.address2 ?? ''}
          placeholder="Apartment, suite, etc."
          type="text"
          className={inputStyle}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={`city-${addressId}`} className={labelStyle}>
            City*
          </label>
          <input
            id={`city-${addressId}`}
            name="city"
            aria-label="City"
            autoComplete="address-level2"
            defaultValue={address?.city ?? ''}
            placeholder="City"
            required
            type="text"
            className={inputStyle}
          />
        </div>
        <div>
          <label htmlFor={`zip-${addressId}`} className={labelStyle}>
            Zip / Postal Code*
          </label>
          <input
            id={`zip-${addressId}`}
            name="zip"
            aria-label="Zip"
            autoComplete="postal-code"
            defaultValue={address?.zip ?? ''}
            placeholder="12345"
            required
            type="text"
            className={inputStyle}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={`zoneCode-${addressId}`} className={labelStyle}>
            State / Province*
          </label>
          <input
            id={`zoneCode-${addressId}`}
            name="zoneCode"
            aria-label="State/Province"
            autoComplete="address-level1"
            defaultValue={address?.zoneCode ?? ''}
            placeholder="CA"
            required
            type="text"
            className={inputStyle}
          />
        </div>
        <div>
          <label htmlFor={`territoryCode-${addressId}`} className={labelStyle}>
            Country Code*
          </label>
          <input
            id={`territoryCode-${addressId}`}
            name="territoryCode"
            aria-label="territoryCode"
            autoComplete="country"
            defaultValue={address?.territoryCode ?? ''}
            placeholder="US"
            required
            type="text"
            maxLength={2}
            className={inputStyle}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`phoneNumber-${addressId}`} className={labelStyle}>
          Phone
        </label>
        <input
          id={`phoneNumber-${addressId}`}
          name="phoneNumber"
          aria-label="Phone Number"
          autoComplete="tel"
          defaultValue={address?.phoneNumber ?? ''}
          placeholder="+16135551111"
          pattern="^\+?[1-9]\d{3,14}$"
          type="tel"
          className={inputStyle}
        />
      </div>

      <div className="flex items-center gap-2 px-1 pt-2">
        <input
          id={`defaultAddress-${addressId}`}
          name="defaultAddress"
          type="checkbox"
          defaultChecked={isDefaultAddress}
          className="w-4 h-4 text-zinc-800 border-2 border-zinc-800 rounded-none focus:ring-0 accent-zinc-800 cursor-pointer"
        />
        <label
          htmlFor={`defaultAddress-${addressId}`}
          className="text-xs font-bold text-zinc-700 select-none cursor-pointer"
        >
          Set as default address
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-3 py-2 bg-white text-red-600 border-2 border-red-600 rounded-none text-[10px] font-bold uppercase tracking-wider">
          <IoAlertCircleOutline className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {children({
        stateForMethod: (method) => (formMethod === method ? state : 'idle'),
      })}
    </Form>
  );
}

import type {LoaderFunctionArgs} from 'react-router';
import { getSelectedProductOptions } from '@shopify/hydrogen';

import { PRODUCT_QUERY } from '~/graphql/products';



export async function loader({params, context, request}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const selectedOptions = getSelectedProductOptions(request);

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions,
    },
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  return {product};
}

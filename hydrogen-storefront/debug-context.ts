
// Mock globals
globalThis.caches = {
  open: async () => ({
    match: async () => null,
    put: async () => {},
  }),
} as any;

import { createHydrogenRouterContext } from './app/lib/context';

const env = {
  SESSION_SECRET: 'secret',
  PUBLIC_STOREFRONT_API_TOKEN: 'test-token',
  PUBLIC_STORE_DOMAIN: 'test.myshopify.com',
  PUBLIC_STOREFRONT_ID: 'test-id',
  PUBLIC_CHECKOUT_DOMAIN: 'checkout.test.com',
  PUBLIC_STOREFRONT_API_VERSION: '2025-01',
};

const request = new Request('http://localhost:3000/');
const executionContext = {
  waitUntil: (promise: Promise<any>) => promise,
  passThroughOnException: () => {},
} as any;

async function run() {
  try {
    console.log('Running createHydrogenRouterContext...');
    const context = await createHydrogenRouterContext(request, env as any, executionContext);
    console.log('Context keys:', Object.keys(context));
    console.log('Cart defined:', !!context.cart);
    if (context.cart) {
        console.log('Cart keys:', Object.keys(context.cart));
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

run();

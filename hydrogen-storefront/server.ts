// Cloudflare Workers entry point for React Router + Hydrogen
import {createRequestHandler} from 'react-router';
import * as build from './build/server/index.js';
import {createHydrogenRouterContext} from './app/lib/context';
import {createStorefrontClient, storefrontRedirect} from '@shopify/hydrogen';

export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      const hydrogenContext = await createHydrogenRouterContext(
        request,
        env,
        executionContext,
      );

      // const { storefront } = createStorefrontClient({
      //   waitUntil: executionContext.waitUntil,
      //   storefrontHeaders: getStorefrontHeaders(request),
      // });

      const handleRequest = createRequestHandler(build as any);

      // Pass the Hydrogen context to the React Router handler
      const response = await handleRequest(request, hydrogenContext as any);

      if (hydrogenContext.session.isPending) {
        response.headers.set(
          'Set-Cookie',
          await hydrogenContext.session.commit(),
        );
      }

      if (response.status === 404) {
        return storefrontRedirect({
          request,
          response,
          storefront: hydrogenContext.storefront,
        });
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
} satisfies ExportedHandler<Env>;

// Virtual entry point for the app
// @ts-ignore -- virtual entry point for the app, resolved by Vite at build time
// import * as reactRouterBuild from 'virtual:react-router/server-build';
import * as remixBuild from 'virtual:remix/server-build';
import {storefrontRedirect} from '@shopify/hydrogen';
// import { createRequestHandler } from '@shopify/hydrogen/oxygen';

import type { Context } from '@netlify/edge-functions';
// import createAppLoadContext from '~/lib/context';

import {
  createHydrogenAppLoadContext,
  createRequestHandler,
} from '@netlify/remix-edge-adapter';
import { createHydrogenRouterContext, createAppLoadContext } from '~/lib/context';


/**
 * Export a fetch handler in module format.
 */
export default {
  async fetch(
    request: Request,
    env: Env,
    // executionContext: ExecutionContext,
    executionContext: Context,
  ): Promise<Response> {
    try {
      // const hydrogenContext = await createHydrogenRouterContext(
      //   request,
      //   env,
      //   executionContext,
      // );

      const appLoadContext = await createHydrogenAppLoadContext(
        request,
        executionContext,
        createAppLoadContext,
      );

      /**
       * Create a Remix request handler and pass
       * Hydrogen's Storefront client to the loader context.
       */
      const handleRequest = createRequestHandler({
        // eslint-disable-next-line import/no-unresolved
        // build: await import('virtual:react-router/server-build'),
        build: remixBuild,
        mode: process.env.NODE_ENV,
        // getLoadContext: () => hydrogenContext,
      });

      const response = await handleRequest(request, appLoadContext);

      if (!response) {
        return new Response('Not Found', {status: 404});
      }

      if (appLoadContext.session.isPending) {
        response.headers.set(
          'Set-Cookie',
          await appLoadContext.session.commit(),
        );
      }

      if (response.status === 404) {
        /**
         * Check for redirects only when there's a 404 from the app.
         * If the redirect doesn't exist, then `storefrontRedirect`
         * will pass through the 404 response.
         */
        return storefrontRedirect({
          request,
          response,
          storefront: appLoadContext.storefront,
        });
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};

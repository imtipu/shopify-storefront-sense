import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
// import hydrogenPreset from '@shopify/hydrogen/vite/preset';
// import {vercelPreset} from '@vercel/remix/vite';
// import { oxygen } from '@shopify/mini-oxygen/vite';
import {netlifyPlugin} from '@netlify/remix-edge-adapter/plugin';
import {reactRouter} from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss({}),
    hydrogen(),

    // oxygen(),
    // vercelPreset(),
    netlifyPlugin(),
    reactRouter(),
    tsconfigPaths(),
    // remix({
    //   presets: [hydrogen.preset()],
    // }),
  ],
  build: {
    // Allow a strict Content-Security-Policy
    // withtout inlining assets as base64:
    assetsInlineLimit: 0,
  },
  ssr: {
    optimizeDeps: {
      /**
       * Include dependencies here if they throw CJS<>ESM errors.
       * For example, for the following error:
       *
       * > ReferenceError: module is not defined
       * >   at /Users/.../node_modules/example-dep/index.js:1:1
       *
       * Include 'example-dep' in the array below.
       * @see https://vitejs.dev/config/dep-optimization-options
       */
      include: ['set-cookie-parser', 'cookie', 'react-router'],
    },
  },
  server: {
    allowedHosts: ['.tryhydrogen.dev', '.ngrok-free.app'],
  },
});

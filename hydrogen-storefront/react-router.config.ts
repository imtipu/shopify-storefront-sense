import type {Config} from '@react-router/dev/config';
import {hydrogenPreset} from '@shopify/hydrogen/react-router-preset';

/**
 * React Router 7.9.x Configuration for Hydrogen + Cloudflare Workers
 *
 * This configuration uses the Hydrogen preset for Shopify-specific optimizations
 * and works with @cloudflare/vite-plugin (configured in vite.config.ts) for
 * Cloudflare Workers deployment.
 */
export default {
  presets: [hydrogenPreset()],
  ssr: true,
  serverBuildFile: 'index.js',
  buildDirectory: 'build',
  serverModuleFormat: 'esm',
} satisfies Config;

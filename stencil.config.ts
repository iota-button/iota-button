import { Config } from '@stencil/core';
import tailwind from 'stencil-tailwind';
import { sass } from '@stencil/sass';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
  plugins: [
    tailwind(),
    sass()
  ],
  rollupPlugins: {
    after: [
      nodePolyfills(),
    ]
  },
  namespace: 'iota-button',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      copy: [
        { src: 'privacy.html' },
        { src: 'netlify.toml' }
      ],
      serviceWorker: null, // disable service workers
    },
  ],
};

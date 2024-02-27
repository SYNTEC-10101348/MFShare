import { fileURLToPath, URL } from 'node:url'
import federation from '@originjs/vite-plugin-federation';
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'

//example: const myWebpackService = 'http://localhost:8080/';
const myWebpackService = 'http://localhost:8081/';

//example: const externalChildPath = `webpackTest/remoteEntry.js`;
const externalChildPath = `remoteEntry.js`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    federation({
      name: 'shell',
      filename: 'remoteEntry.js',
      remotes: {
        webpackTest: {
          external: `${myWebpackService}${externalChildPath}`,
          // format: 'var',
          format: 'esm',
          from: 'webpack',
        },
      },
      shared: ['vue'],
    }),
    vue2(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  server: {
    port: 8081,
    proxy: {
      '/webpackTest': {
        target: myWebpackService,
        changeOrigin: true,
        rewrite: (rewritePath) => {
          console.log('Rewriting path:', rewritePath);
          // console.log('newpath', rewritePath.replace(/^\/PrivateCloudCore/, ''));
          return rewritePath;
        },
      },
    },
    // https: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

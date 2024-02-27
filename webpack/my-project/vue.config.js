const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container;
const packageDepend = require('./package.json').dependencies;

const sharedJson = {};
Object.keys(packageDepend).forEach((key) => {
    sharedJson[key] = {
      singleton: true,
    };
});
module.exports = defineConfig({
  publicPath: 'auto',
  transpileDependencies: true,
  configureWebpack: {
    experiments: {
      outputModule: true,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'async',
            reuseExistingChunk: true,
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'async',
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'webpackTest',
        filename: 'remoteEntry.js',
        library: {
          type: 'module',
        },
        // library: {
        //   type: 'var',
        //   name: 'webpackTest',
        // },
        exposes: {
          './testWebpack': './src/components/HelloWorld.vue',
        },
        shared: {
          'vue':"^2.7.14"
        },
      }),
    ],
  },
})

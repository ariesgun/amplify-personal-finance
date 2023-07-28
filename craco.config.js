const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          http: require.resolve("stream-http"),
          https: require.resolve("https-browserify"),
          stream: require.resolve("stream-browserify"),
          tty: require.resolve("tty-browserify"),
          path: require.resolve("path-browserify"),
          zlib: require.resolve('browserify-zlib'),
          process: require.resolve('process/browser'),
          fs: false
        },
      },
      plugins: [
      ],
    },
  },
};
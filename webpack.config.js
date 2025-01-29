
const webpack = require('webpack');

module.exports = {
  // ...existing code...
  resolve: {
    // ...existing code...
    fallback: {
      "buffer": require.resolve("buffer/"),
    }
  },
  plugins: [
    // ...existing code...
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  // ...existing code...
};
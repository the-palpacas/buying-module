const path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, './client/BuyingModule.jsx'),
  ],
  output: {
    filename: 'buying.js',
    path: path.resolve(__dirname, './public/dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
        },
      },
    ],
  },
};

const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "src/*{.html,.png,.yaml,.ico}",
          to({ context, absoluteFilename }) {
            return "[name][ext]";
          },
        },
        { from: "src/icons/", to: './icons' },
      ],
    }),
  ],
};
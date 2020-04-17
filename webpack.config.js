const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {
  const prod = Object.prototype.hasOwnProperty.call(env, 'production');
  return {
    entry: {
      main: path.resolve('src', 'index.mjs'),
    },
    output: {
      filename: prod ? '[name].[contenthash:4].mjs' : '[name].mjs',
    },
    devServer: {
      stats: 'errors-only',
      overlay: true,
      compress: true,
      port: 4000,
    },
    devtool: prod ? 'source-map' : 'eval',
    module: {
      rules: [
        {
          test: /\.pug$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'pug-loader',
              options: {
                pretty: !prod,
              },
            },
          ],
        },
        {
          test: /\.m?js$/,
          use: [
            'babel-loader',
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: prod ? '[name].[contenthash:4].css' : '[name].css',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve('src', 'index.pug'),
        inject: false,
        minify: {
          removeComments: prod,
          minifyCSS: prod,
          minifyJS: prod,
          collapseWhitespace: prod,
        },
      }),
    ],
  };
};

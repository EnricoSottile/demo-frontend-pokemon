const path = require('path');

const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');




module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: [ '.js', '.vue' ],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          "sass-loader" ,
          "postcss-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/app.css",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackBuildNotifierPlugin()
  ],
  // stats: 'errors-only',
  stats: {
    children: false,
    chunks: false,
    modules: false,
    providedExports: false,
    colors: true,
  },
  // devServer: {
  //   noInfo: false
  // },
  devtool: 'source-map'
};
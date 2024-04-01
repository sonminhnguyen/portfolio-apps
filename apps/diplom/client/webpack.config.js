/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'source-map',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  devServer: {
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, ''),
    publicPath: '/',
    proxy: {
      '/': 'http://127.0.0.1:3000'
    }
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'bundle.js',
    publicPath: './'
  },

  module: {
    rules: [
      {
        test: /\.js$|\.tsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|svg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              publicPath: '/'
            }
          }
        ]
      },
      {
        test: /\.(sass|less|css|css.map)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          // {
          //   loader: 'sass-loader'
          // },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'KSTU-Bot',
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      hash: true,
      path: './'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
          { from: 'public', to: './' }
      ]
    })
  ]
};
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const path = require('path');

// module.exports = {
//   entry: './src/index.tsx',
//   module: {
//     rules: [
//       {
//         test: /\.ts?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       }
//     ],
//   },
//   resolve: {
//     extensions: ['.tsx', '.ts', '.js'],
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },

//   plugins: [
//     new HtmlWebpackPlugin({
//         title: 'our project', 
//         template: 'src/index.html' }) 
//    ],

//   devServer: {
//     static: path.join(__dirname, "dist"),
//     compress: true,
//     port: 4000,
//   },
// };
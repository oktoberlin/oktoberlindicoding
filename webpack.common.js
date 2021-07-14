const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
              loader: 'url-loader',
              options: {},
          },
        ],
      },
      {
        test: /\.(webm|mp4)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      favicon: path.resolve(__dirname, 'src/public/favicon.ico'),
      filename: 'index.html',
    }),
    new WebpackPwaManifest({
      name: 'Restaurant Finding',
      short_name: 'RestoFind',
      description: 'Temukan restoran yang anda inginkan',
      start_url: '/index.html',
      display: 'standalone',
      background_color: '#e8e8e9',
      theme_color: '#040f0f',
      icons: [
        {
          src: path.resolve('src/public/icons/icon.png'),
          sizes: [72, 96, 128, 144, 152, 192, 256, 384, 512],
          purpose: 'any maskable',
        },
      ],
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, 'src/scripts/sw.js'),
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
  ],
};
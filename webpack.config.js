const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
  const nodeEnv = env.NODE_ENV === 'development' ? 'development' : 'production';
  const config = {
    mode: nodeEnv,
    entry: {
      app: path.resolve(__dirname, './src/index.tsx'),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: nodeEnv === 'development' ? 'inline-source-map' : false,
    devServer: {
      historyApiFallback: true,
      contentBase: './',
      hot: true,
    },
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin({
        title: 'Pomodoro App | Frontend Mentor',
        template: './src/index.html',
        favicon: './public/assets/favicon-32x32.png',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(png|jpg|svg|mp3)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: { extensions: ['*', '.tsx', '.ts', '.js'] },
    optimization: {
      minimize: nodeEnv === 'development' ? false : true,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
          },
        },
      },
    },
  };

  return config;
};

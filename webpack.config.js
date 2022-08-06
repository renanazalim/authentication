const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const EslintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  context: slsw.lib.serverless.serviceDir,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: slsw.lib.webpack.isLocal ? 'inline-source-map' : 'source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts', '.js'],
    symlinks: false,
    cacheWithContext: false
  },
  output: {
    libraryTarget: 'commonjs',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    path: path.join(slsw.lib.serverless.serviceDir, '.webpack'),
    filename: '[name].js'
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(slsw.lib.serverless.serviceDir, 'node_modules'),
            path.resolve(slsw.lib.serverless.serviceDir, '.serverless'),
            path.resolve(slsw.lib.serverless.serviceDir, '.webpack')
          ]
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true
        }
      }
    ]
  },
  plugins: [
    new EslintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx']
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
};

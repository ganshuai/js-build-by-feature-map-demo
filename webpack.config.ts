var webpackNodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    path: __dirname,
    filename: 'dist/index.js'
  },
  devtool: false,
  target: 'node',
  externals: [webpackNodeExternals()],
  node: {
    fs: false,
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
}
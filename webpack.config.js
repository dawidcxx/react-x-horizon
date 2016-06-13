var webpack = require('webpack')

var p = process.env.NODE_ENV === 'production' 

var config = {
  externals: {
    'react': {root: 'React', commonjs2: 'react', commonjs: 'react', amd: 'react'},
  },
  entry: ['./src/main'],
  output: {
    library: 'ReactXHorizon',
    libraryTarget: 'umd',
    path: __dirname + '/lib',
    filename: p ? 'react-x-horizon.umd.min.js' : 'react-x-horizon.umd.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['babel-plugin-transform-decorators-legacy']
        }
      }      
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}

if (p) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    pure_getters: true,
    unsafe: true,
    unsafe_comps: true,
    warnings: false
  }))
}

module.exports = config
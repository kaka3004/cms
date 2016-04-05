var path = require('path');
var webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client/app/index',
    './src/client/app/stylesheets/main'
  ],
  output: {
    path: path.resolve(path.join(__dirname, 'public')),
    filename: 'frontend.js'
  },
  node: {
    __dirname: true,
    __filename: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  recordsPath: path.resolve(path.join(__dirname, 'build/_frontend_records')),
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.css', '.scss', '.ts', '.js', '.json', '.tsx', '.html'],
  },
  module: {
    loaders: [
      {test: /^.*(\\|\/)(client|shared)(\\|\/)(((?!.*\.test))(.*\.tsx?))+$/, loaders: ['react-hot', 'ts-loader']},
      {test: /\.scss$/, loaders: ["style", "css", "sass"]}
    ]
  }
}

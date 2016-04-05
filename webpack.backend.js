var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = fs.readdirSync('./node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  });

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function getProcessEnv() {
  if(!fs.existsSync('./.env')) {
    return {};
  }
  var lines = fs.readFileSync('./.env').toString().split('\r\n'),
    data = {}, keyValue;
  for (var i = 0; i < lines.length; i++) {
    keyValue = lines[i].split('=');
    data['process.env.'+keyValue[0]] = JSON.stringify(keyValue[1]);
  }
  return data;
}

module.exports = {
  devtool: 'source-map',
  entry: [
    path.join(__dirname, './src/server/index.ts')
  ],
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'backend.js',
    library: 'backend',
    libraryTarget: 'this'
  },
  externals: [
    function(context, request, callback) {
      var pathStart = request.split('/')[0];
      if (nodeModules.indexOf(pathStart) >= 0 && request != 'webpack/hot/signal.js') {
        return callback(null, "commonjs " + request);
      };
      callback();
    }
  ],
  recordsPath: path.join(__dirname, 'build/_backend_records'),
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    // new webpack.BannerPlugin('require("source-map-support").install();',
    //                          { raw: true, entryOnly: false }),
    new webpack.DefinePlugin(getProcessEnv())
  ],
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.ts', '.js', '.json', '.tsx', '.html'],
  },
  module: {
    loaders: [
      // Match all files except test files, previous test: /\.ts$/
      {test: /\.json$/, loaders: ['json']},
      {test: /^.*(\\|\/)(server|shared)(\\|\/)(((?!.*\.test))(.*\.tsx?))+$/, loader: 'ts-loader'}
    ]
  }
};

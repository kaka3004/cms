var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var frontendConfig = require('./../webpack.frontend.js');
var backendConfig = require('./../webpack.backend.js');
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var Server = require('./server');
var PrettyError = require('pretty-error');

function handleJsonErrors(errors) {
  for (var i = 0; i < errors.length; i++) {
    console.log(errors[i].toString());
  }
}

function handleWebpackError(err, stats) {
  if(err)
    throw err;
  var pe = new PrettyError();
  var jsonStats = stats.toJson();
  if(jsonStats.errors.length > 0) {
    handleJsonErrors(jsonStats.errors);
    throw new Error("Fix these errors first");
  }
  if(jsonStats.warnings.length > 0)
    console.error(jsonStats.warnings);
}


function onBuild(done) {
  return function(err, stats) {
    handleWebpackError(err, stats);

    if(done) {
      done();
    }
  }
}

function createHotReloadMiddlewares() {
  var compiler = webpack(frontendConfig);

  return [
    webpackDevMiddleware(compiler, { 
      noInfo: true, 
      publicPath: frontendConfig.output.publicPath }),
    webpackHotMiddleware(compiler)
  ];
}

gulp.task('build:frontend', function(done) {
  webpack(frontendConfig).run(onBuild(done));
});

gulp.task('build:backend', function(done) {
  webpack(backendConfig).run(onBuild(done));
});

gulp.task('build', ['build:frontend', 'build:backend']);

gulp.task('watch:frontend', function(done) {
  webpack(frontendConfig).run(500, onBuild(done));
});

gulp.task('watch:backend', function(done) {
  var server = new Server();
  webpack(backendConfig).watch(500, function(err, stats) {
    server.restart(middlewares, done);
  });
});

/**
 * Run server and inject the frontend hot module middlewares
 */
gulp.task('serve', function(done) {
  var server = new Server();
  var middlewares = createHotReloadMiddlewares();
  webpack(backendConfig).watch(500, function(err, stats) {
    server.restart(middlewares, done);
  });
});

/**
 * Serve without hot reloading
 */
gulp.task('serve:freeze', ['watchBackend', 'watchFrontend']);

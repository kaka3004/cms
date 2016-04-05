var gulp = require('gulp');
var ts = require('gulp-typescript');
var path = require('path');
var exec = require('child_process').exec;
var runSequence = require('gulp-run-sequence');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var filenames = require("gulp-filenames");
var mochaRunner = require('./mocha-runner');

gulp.task('tests:clean', function() {
	return gulp.src(['.tmp/test'], {force: false, read: false})
		.pipe(clean());
});

gulp.task('tests:copy', function() {
	return gulp.src(['src/**/*.tsx', 'src/**/*.ts']).pipe(gulp.dest('.tmp/test'));
});

gulp.task('tests:replace', function() {

	var rootDir = path.resolve(__dirname + '/../');
	var srcImportsRegex = /from ('|")((client|shared|server)\/.*)('|")/g;
	var fullImport = 'from \'' + rootDir.replace(/\\/g, '\\\\') + '/.tmp/test/$2' + '\'';

  return gulp.src(['.tmp/test/**/*.ts', '.tmp/test/**/*.tsx'])
    .pipe(replace(srcImportsRegex, fullImport))
    .pipe(gulp.dest('.tmp/test'));
});

gulp.task('tests:build', function() {
	var tsConfig = {
		target: "es5",
		jsx: "react",
		module: "commonjs",
    removeComments: true,
    moduleResolution : "node",
    typescript: require('typescript')
	};
	return gulp.src(['.tmp/test/**/*.ts', '.tmp/test/**/*.tsx', 'typings/browser/**/*.ts', 'typings.extend/**/*.ts'])
		.pipe(ts(tsConfig))
		.pipe(gulp.dest('.tmp/test'));
});

gulp.task('tests:filenames', function(cb) {
	return gulp.src('.tmp/test/**/*.test.js', {base: './'})
		.pipe(filenames('tests'));
});

gulp.task('tests:mocha', function(cb) {
	mochaRunner.runSuite(filenames.get('tests'), cb);
});

gulp.task('tests', function(cb) {
	runSequence(
		'tests:clean',
		'tests:copy',
		'tests:replace',
		'tests:build',
		'tests:filenames',
		'tests:mocha', cb);
});
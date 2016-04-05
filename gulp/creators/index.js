'use strict';

var gulp = require('gulp');
var path = require('path');
var Q = require('q');
var fileReplacer = require('./file-replacer');
var argv = require('yargs');
var inquirer = require("inquirer");

function getArguments(requireAttributes) {
	let required = ['name'], newAttrs = {};
	requireAttributes && required.push('attributes');
  argv = argv.usage('Usage: --name [string] --attributes [string]').demand(required).argv;

  if(requireAttributes) {
	  let atrs = argv.attributes.split(',');
	  for (let i = 0; i < atrs.length; i++) {
	  	newAttrs[atrs[i].split(':')[0]] = atrs[i].split(':')[1];
	  }
  }
  
  return {
  	name: argv.name,
  	attributes: newAttrs
  };
}

gulp.task('create:controller', function(cb) {
	let args = getArguments(false);
	let types = ['controller', 'router'];
	fileReplacer.createFiles(path.join(__dirname, '../../src'), types, args.name)
		.then(cb);
});

gulp.task('create:repository', function(cb) {
	let args = getArguments(false);
	let types = ['repository'];
	fileReplacer.createFiles(path.join(__dirname, '../../src'), types, args.name)
		.then(cb);
});

gulp.task('create:model', function(cb) {
	let args = getArguments(true);
	let types = ['model'];
	fileReplacer.createFiles(path.join(__dirname, '../../src'), types, args.name, args.attributes)
		.then(cb);
});

gulp.task('create:api', function(cb) {
	let args = getArguments(false);
	let types = ['api'];
	fileReplacer.createFiles(path.join(__dirname, '../../src'), types, args.name)
		.then(cb);
});

gulp.task('create:actions', function(cb) {
	let args = getArguments(false);
	let types = ['actions'];
	fileReplacer.createFiles(path.join(__dirname, '../../src'), types, args.name)
		.then(cb);
});

gulp.task('create:resource', function(cb) {
	let args = getArguments(true);

  console.log();
  console.log('Schema `'+name + '`', JSON.stringify(args.attributes, null, 4));
  console.log();

	inquirer.prompt([{
		type: "confirm",
		name: "continue_schema",
		message: "Continue with this schema?",
		default: "yes"
	}], function( answers ) {
		if(answers.continue_schema) {
			let types = ['repository', 'model', 'controller', 'router', 'api', 'actions'];
			fileReplacer.createFiles(path.join(__dirname, '../../src'), types, args.name, args.attributes)
				.then(cb);
		}
	});
});

'use strict';
var fs = require('fs');
var mkRecursiveDir = require('node-fs').mkdir;
var Q = require("q");
var path = require('path');
var plural = require('plural')

function replaceAll(data, replacers) {
	if(replacers.constructor === Array) {
		for (let i = 0; i < replacers.length; i++) {
	    data = data.replace(new RegExp('{{'+replacers[i].find+'}}', 'g'), replacers[i].replace);
		}
	} else {
	  for(let key in replacers) {
	    let value = replacers[key];
	    data = data.replace(new RegExp('{{'+key+'}}', 'g'), value);
	  };
	}
  return data;
}

function applyReplacers(oldPath, newPath, replacers) {
  let deferred = Q.defer();

	let readFileHandler = (err, data) => {
	  if (err) return deferred.reject(err);

		let replacedData = replaceAll(data, replacers);

		// Make sure that new path exits
		mkRecursiveDir(path.dirname(newPath), 777, true, (err) => mkDirHandler(err, replacedData));
	};

	let mkDirHandler = (err, data) => {
	  if (err) return deferred.reject(err);

		fs.writeFile(newPath, data, writeFileHandler);
	}

	let writeFileHandler = (err) => {
	  if (err) return deferred.reject(err);

    deferred.resolve();
	};

	fs.readFile(oldPath, 'utf8', readFileHandler);

	return deferred.promise;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getReplacers(name, attributes) {
	let Model = capitalizeFirstLetter(name);
	let model = name;
	let MODEL = name.toUpperCase();
	let models = plural(name);

	let schemaBody = '', replaceAttributesBody = '', updateAttributesBody = '', interfaceBody = '';
	attributes = attributes || {};

	for(var key in attributes) {
		schemaBody += `
    ${key}: ${attributes[key]},`;

		replaceAttributesBody += `
    this.${key} = attributes.${key};`;

		updateAttributesBody += `
    if(attributes.${key}) {
      this.${key} = attributes.${key};
    }
    `;

    interfaceBody += `
  ${key}: ${attributes[key]};`;
	}

	return {
		Model,
		model,
		MODEL,
		models,
		schemaBody,
		replaceAttributesBody,
		updateAttributesBody,
		interfaceBody
	};
}

function getTemplates(name, names) {
	var templates = [];

	templates.push({
		name: 'repository',
		type: 'server',
		newPath: `repositories/${name}/${name}-repository`
	});

	templates.push({
		name: 'model',
		type: 'server',
		newPath: `models/${name}/${name}-model`
	});

	templates.push({
		name: 'controller',
		type: 'server',
		newPath: `controllers/${name}/${name}-controller`
	});

	templates.push({
		name: 'router',
		type: 'server',
		newPath: `routers/${name}-router`
	});

	templates.push({
		name: 'api',
		type: 'client',
		newPath: `apis/${name}/${name}-api`
	});

	templates.push({
		name: 'actions',
		type: 'client',
		newPath: `actions/${name}/${name}-actions`
	});

	return templates.filter((template) => names.indexOf(template.name) > -1);
}

function createFiles(srcPath, names, name, attributes) {
	let templates = getTemplates(name, names);
	let extensions = ['.tmp', '.d.tmp', '-test.tmp', '-mock.tmp'];
	let templateFileName, templatePath, newPath, replacers = getReplacers(name, attributes);
	let promises = [];

	for (var i = 0; i < templates.length; i++) {
		console.log("Creating template: ", templates[i].name, "\n");
		if(templates[i].name === 'router') {
			templatePath = path.join(__dirname, 'templates/server/router.tmp');
			newPath = path.join(srcPath, templates[i].type, templates[i].newPath + '.ts');
			promises.push(applyReplacers(templatePath, newPath, replacers));
			continue;
		}
		for (var j = 0; j < extensions.length; j++) {
			templateFileName = templates[i].name + extensions[j];
			templatePath = path.join(__dirname, `templates/${templates[i].type}/${templateFileName}`);
			newPath = path.join(srcPath, templates[i].type, templates[i].newPath + extensions[j].replace('tmp', 'ts'));
			promises.push(applyReplacers(templatePath, newPath, replacers));
		}
	}

	return Q.all(promises);
}

module.exports = {
	createFiles
}

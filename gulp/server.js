'use strict';

var enableDestroy = require('server-destroy');
var fs = require('fs');
var path = require('path');

class Server {

	constructor() {
		// Init server build file
		this.initServerBuildFile();
	}

	initServerBuildFile() {
	  var dir = './../build';

	  if (!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	  }
	  
	  fs.writeFileSync(path.join(dir, "backend.js"), "require('mongoose')");
	}

	requireServer(middlewares) {
	  var backendModule = this.cleanRequire('./../build/backend');
	  if(backendModule.backend && backendModule.backend.serve) {
	    var server = backendModule.backend.serve(middlewares, path.join(__dirname, '../'));
	    enableDestroy(server);
	    return server;
	  }
	}

	cleanRequire(pathname) {
	  delete require.cache[require.resolve(pathname)]
	  return require(pathname);
	}

	restart(middlewares, done) {
    if(!this.httpServer) {
      this.httpServer = this.requireServer(middlewares);
      done();
    } else {
      this.httpServer.destroy(() => {
        this.httpServer = this.requireServer(middlewares);
        console.log("Server destroyed");
      });
    }
	}
}

module.exports = Server;
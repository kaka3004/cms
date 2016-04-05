var backendModule = require('./build/backend');
var path = require('path');

// Serve the application
if(backendModule.backend && backendModule.backend.serve) {
  backendModule.backend.serve([], __dirname);
}

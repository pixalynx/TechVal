const _ = require('lodash');
const settings = require('./settings').Setting;
const DataModel = require('./DataModel/dataModel').DataModel;


console.log(settings.startupMsg);
console.log(DataModel.types[1]);
//Our Server class which we are starting on port 5000
const serverClass = require('./server');
const server = new serverClass(5000);
  
// Start the actual server
server.startServer();
server.handleRoutes();

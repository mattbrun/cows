'use strict';

//###################################################################
// Dependencies
//###################################################################

var fs      = require('fs')
  , path    = require('path');



//###################################################################
// Configuration
//###################################################################

var file = 'dev';
if (process.env.OPENSHIFT_APP_NAME) {
  file = 'openshift';
}
console.log('### config file', file);

var cfgPath = path.join(__dirname, '..', 'config')
  , cfgFile = path.join(cfgPath, file + '.json')
  , config  = JSON.parse(fs.readFileSync(cfgFile, 'utf-8'))
  , include = [];



//###################################################################
// App logic
//###################################################################

if (file === 'openshift') {
  config.app.ip = process.env.OPENSHIFT_NODEJS_IP;
  config.app.port = process.env.OPENSHIFT_NODEJS_PORT;

  config.mongo.host = config.mongo.host || process.env.OPENSHIFT_MONGODB_DB_HOST;
  config.mongo.port = config.mongo.port || process.env.OPENSHIFT_MONGODB_DB_PORT;
  config.mongo.db = config.mongo.db || process.env.OPENSHIFT_APP_NAME;
  config.mongo.username = config.mongo.username || process.env.OPENSHIFT_MONGODB_DB_USERNAME;
  config.mongo.password = config.mongo.password || process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
}

config.mongo.url = 'mongodb://';
if (config.mongo.username && config.mongo.password) {
  config.mongo.url += config.mongo.username + ':';
  config.mongo.url += config.mongo.password + '@';
}
config.mongo.url += config.mongo.host + ':';
config.mongo.url += config.mongo.port + '/';
config.mongo.url += config.mongo.db;

config.profile = file;



//###################################################################
// External config
//###################################################################

include.forEach(function(fileName) {
  var filePath = path.join(cfgPath, fileName + '.json');

  if (fs.existsSync(filePath)) {
    config[fileName] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
});



//###################################################################
// Exports
//###################################################################

module.exports = exports = config;
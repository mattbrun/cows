// #############################################################################
// Dependencies
// #############################################################################

// Requires which injects themselves in the global space
require('logger');

var path    = require('path')
  , async   = require('async')
  , http    = require('http');

var derby   = require('derby')
  , clean   = require('./server/clean')
  , config  = require('./server/config')
  , store   = require('./server/store')
  , access  = require('./server/access')
  , hooks   = require('./server/hooks')
  , express = require('./server/express')
  , error   = require('./server/error')
  , chalk   = require('chalk');

var publicDir = path.join(process.cwd(), 'public');



// #############################################################################
// Start app
// #############################################################################

// Sharejs db access policies
derby.use(access);

derby.run(function() {
  require('coffee-script/register');

  // app require list
  var apps = [
    require('./apps/login')
  , require('./apps/coca')
  , require('./apps/staff')
  , require('./apps/admin')
    // <end of app list> - don't remove this comment
  ];

  // clean junk data from last execute
  clean();

  // create store
  var derbyStore = store(derby);

  // add custom hooks
  hooks(derbyStore);

  // init express with apps
  express(derbyStore, apps, error, function(expressApp, upgrade) {
    // Sharejs db access policies
    //derby.use(access);
    
    var server = http.createServer(expressApp);

    server.on('upgrade', upgrade);

    async.each(apps, function(app, cb) {
      app.writeScripts(derbyStore, publicDir, { extensions: ['.coffee'], disableScriptMap: derby.util.isProduction }, function() {
        console.log('Bundle created:', chalk.yellow(app.name));
        cb();
      });
    }, function() {
      server.listen(config.app.port, config.app.ip, function() {
        console.log('%d listening. Go to: http://%s:%d/', process.pid, config.app.ip, config.app.port);
      });
    });
  });
});

// #############################################################################
// Dependencies
// #############################################################################

var config        = require('./config')
  , liveDbMongo   = require('livedb-mongo')
  , coffeeify     = require('coffeeify')
  , recerBundle   = require('racer-bundle');



// #############################################################################
// Export
// #############################################################################

module.exports = function(derby) {
  derby.use(recerBundle);

  var opts  = { db: liveDbMongo(config.mongo.url + '?auto_reconnect', { safe: true }) }
    , store = derby.createStore(opts);

  store.on('bundle', function(browserify) {
    browserify.transform({ global: true }, coffeeify);

    var pack = browserify.pack;
    browserify.pack = function(opts) {
      var detectTransform = opts.globalTransform.shift();
      opts.globalTransform.push(detectTransform);
      return pack.apply(this, arguments);
    };
  });

  return store;
};
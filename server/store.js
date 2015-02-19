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

  var store   = null,
      mongo   = liveDbMongo(config.mongo.url + '?auto_reconnect', { safe: true });
  if (config.app.useRedis) {
    var redis         = require('redis'),
        redisClient1  = redis.createClient(config.redis.port, config.redis.host, config.redis.options),
        redisClient2  = redis.createClient(config.redis.port, config.redis.host, config.redis.options),

        livedb        = require('livedb'),
        redisDriver   = livedb.redisDriver(mongo, redisClient1, redisClient2);

    store = derby.createStore({
      backend: livedb.client({driver: redisDriver, db: mongo})
    });
  } else {
    store = derby.createStore({db: mongo});
  }

  store.on('bundle', function(browserify) {
    browserify.transform({global: true}, coffeeify);

    var pack = browserify.pack;
    browserify.pack = function(opts) {
      var detectTransform = opts.globalTransform.shift();
      opts.globalTransform.push(detectTransform);
      return pack.apply(this, arguments);
    };
  });

  return store;
};

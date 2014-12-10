var liveDbMongo = require('livedb-mongo');
var coffeeify = require('coffeeify');

module.exports = store;

function store(derby, publicDir) {
  var mongo = liveDbMongo(process.env.MONGO_URL + '?auto_reconnect', {safe: true});

  derby.use(require('racer-bundle'));


  var store = derby.createStore({db: mongo});

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
}
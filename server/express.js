//###################################################################
// Dependencies
//###################################################################

var config          = require('./config')
  , path            = require('path')
  , express         = require('express')
  , expressSession  = require('express-session')
  , serveStatic     = require('serve-static')
  , serveFavicon    = require('serve-favicon')
  , compression     = require('compression')
  , bodyParser      = require('body-parser')
  , cookieParser    = require('cookie-parser')
  , highway         = require('racer-highway')
  , derbyLogin      = require('derby-login')
  , crypto          = require('crypto')
  , loginConfig     = require('../config/login');



//###################################################################
// Functions
//###################################################################

function getRandomHash () {
  var random = new Date();
  
  try {
    random += crypto.randomBytes(256);
  } catch (ex) {}
  
  return crypto.createHash('sha256').update(random).digest('hex');
}



//###################################################################
// Export
//###################################################################

module.exports = function(store, apps, error, cb) {
  var ConnectStore = require('connect-mongo')(expressSession)
    , sessionStore = new ConnectStore({ url: config.mongo.url });

  var session = expressSession({
    secret: (config.profile === 'dev' ? 'fc683cd9ed1990ca2ea10b84e5e6fba048c24929' : getRandomHash()),
    store: sessionStore,
    cookie: (config.profile === 'dev' ? {} : {maxAge: config.auth.cookieTimeout}),
    rolling: true,
    unset: "destroy",
    saveUninitialized: false,
    resave: false
  });

  var handlers = highway(store, { session: session }, {
    srvPort: config.app.wsPort,
    srvSecurePort: config.app.wsSecurePort
  });
  
  var publicDir = path.join(process.cwd(), 'public');
  var expressApp = express()
    .use(compression())
    .use(serveFavicon(path.join(publicDir, 'img', 'favicon.ico')))
    .use(serveStatic(publicDir))
    .use(store.modelMiddleware())
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(session)
    .use(derbyLogin.middleware(store, loginConfig))
    .use(handlers.middleware)
  ;
  
  expressApp.use(function (req, res, next) {
    var model       = req.getModel(),
        userPath    = derbyLogin.options.collection + '.' + req.session.userId,
        userModel   = model.at(userPath);
    
    userModel.fetch(function (err) {
      if (err) { throw err; }
      req.session.user = userModel.get();
      model.set('_session.admin', req.session.user.admin);
      next();
    });
  });
  
  apps.forEach(function(app) {
    expressApp.use(app.router());
  });

  expressApp.all('*', function (req, res, next) { next('404: ' + req.url); });
  expressApp.use(error);

  if (config.auth.createSu) {
    derbyLogin.createUser(
      config.auth.suLogin,
      config.auth.suPassword,
      { admin: true, group: '*' },
      function (err) { if (err) { throw err; } }
    );
  }

  cb(expressApp, handlers.upgrade);
};

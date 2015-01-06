'use strict';

// #############################################################################
// Dependencies
// #############################################################################

var derby   = require('derby'),
    path    = require('path');

// #############################################################################
// App init
// #############################################################################

var appName = path.basename(__dirname),
    appUrl  = '/' + appName,
    app     = module.exports = derby.createApp(appName, __filename);

var serverRoutes = derby.util.serverRequire(module, './server') || {};

if (!derby.util.isProduction) {
  //global.app = app;
  app.use(require('derby-debug'));
}

app.use(require('derby-router'));
app.serverUse(module,'derby-jade');
app.serverUse(module, 'derby-stylus');

app.loadViews(__dirname + '/views');
app.loadStyles(__dirname + '/styles');

app.component(require('../../components/commonDeps'));
app.component(require('../../components/topBar'));
app.component(require('../../components/sideBar'));
app.component(require('../../components/footer'));



// #############################################################################
// App routes
// #############################################################################

app.get('*', function (page, model, params, next)  {
  var userId  = model.get('_session.userId')
    , $user   = model.at('users.' + userId);

  if (userId) {
    model.subscribe($user, function () {
      model.ref('_session.user', $user);
      next();
    });
  } else {
    next();
  }
});

app.get('/', function (page, model, params, next) {
  this.redirect('home');
});

app.get('home', appUrl + '/home');



// #############################################################################
// Server-only routes
// #############################################################################


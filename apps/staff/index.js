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

var appModules    = require('../../libs/appModules');

if (!derby.util.isProduction) {
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
// Router modules
// #############################################################################

app.module('user', appModules.user);



// #############################################################################
// App routes
// #############################################################################

app.get(appUrl, function (page, model, params, next) {
  this.redirect('mail');
});

app.get('mail',         appUrl + '/mail',       ['user']);
app.get('calendar',     appUrl + '/calendar',   ['user']);
app.get('registry',     appUrl + '/registry',   ['user']);
app.get('accounting',   appUrl + '/accounting', ['user']);



// #############################################################################
// Server-only routes
// #############################################################################


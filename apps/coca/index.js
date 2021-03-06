// #############################################################################
// Dependencies
// #############################################################################

var derby   = require('derby'),
    path    = require('path');
    
// #############################################################################
// App init
// #############################################################################

var appName   = path.basename(__dirname),
    appUrl    = '/' + appName,
    appApiUrl = '/api/v1/' + appName,
    app       = module.exports = derby.createApp(appName, __filename);

var appModules    = require('../../libs/routesModules'),
    serverRoutes  = derby.util.serverRequire(module, './server') || {};

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
app.component(require('../../components/mailForm'));
app.use(require('derby-login/components'));



// #############################################################################
// Router modules
// #############################################################################

app.module('user', appModules.user);
app.module('groups', appModules.groups);
app.module('usersEmail', appModules.usersEmail);



// #############################################################################
// App routes
// #############################################################################

app.get(appUrl, function (page, model, params, next) {
  this.redirect('mail');
});

app.get('mail',       appUrl + '/mail',     ['user', 'usersEmail', 'groups']);
app.get('calendar',   appUrl + '/calendar', ['user']);
app.get('places',     appUrl + '/places',   ['user']);
app.get('market',     appUrl + '/market',   ['user']);


app.get('account',    appUrl + '/account',  ['user']);


// #############################################################################
// Server-only routes
// #############################################################################

app.serverPost('sendEmail', appApiUrl + '/sendEmail', serverRoutes.sendEmail);

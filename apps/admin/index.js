'use strict';

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

var appModules    = require('../../libs/appModules'),
    serverRoutes  = derby.util.serverRequire(module, './server') || {};

if (!derby.util.isProduction) {
  app.use(require('derby-debug'));
}

app.use(require('derby-router'));
app.serverUse(module, 'derby-jade');
app.serverUse(module, 'derby-stylus');

app.loadViews(path.join(__dirname, '/views'));

app.loadStyles(path.join(__dirname, '/styles'));

app.component(require('../../components/commonDeps'));
app.component(require('../../components/topBar'));
app.component(require('../../components/sideBar'));
app.component(require('../../components/footer'));

app.component(require('./components/userAdd'));
app.component(require('./components/usersList'));
app.component(require('./components/groupsList'));



// #############################################################################
// Router modules
// #############################################################################

app.module('user', appModules.user);
app.module('groups', appModules.groups);



// #############################################################################
// App routes
// #############################################################################

app.get(appUrl, function () {
  this.redirect('users');
});

app.get('dash',       appUrl + '/dash');
app.get('users',      appUrl + '/users',    ['groups']);
app.get('website',    appUrl + '/website');
app.get('config',     appUrl + '/config');



// #############################################################################
// Server-only routes
// #############################################################################

app.serverPost('userAdd', appApiUrl + '/userAdd', serverRoutes.userAdd);

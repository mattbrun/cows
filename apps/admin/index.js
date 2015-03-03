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
app.serverUse(module, 'derby-jade');
app.serverUse(module, 'derby-stylus');

app.loadViews(path.join(__dirname, '/views'));

app.loadStyles(path.join(__dirname, '/styles'));

app.component(require('../../components/commonDeps'));
app.component(require('../../components/topBar'));
app.component(require('../../components/sideBar'));
app.component(require('../../components/footer'));

app.component(require('../../components/userAdd'));
app.component(require('../../components/usersList'));
app.component(require('../../components/groupsList'));



// #############################################################################
// Router modules
// #############################################################################

app.module('user', appModules.user);
app.module('groups', appModules.groups);
app.module('users', appModules.users);



// #############################################################################
// Middleware
// #############################################################################

function isAdmin () {
  if (this.model.get('_session.admin')) {
    this.next();
  } else {
    // TODO return an error to the user
    this.next('User should be an admin to get access!');
  }
}



// #############################################################################
// App routes
// #############################################################################

app.get(appUrl, function () {
  this.redirect('users');
});

app.get('users',      appUrl + '/users',    isAdmin,  ['user', 'groups', 'users']);
app.get('website',    appUrl + '/website',  isAdmin,  ['user']);
app.get('config',     appUrl + '/config',   isAdmin,  ['user']);
app.get('stats',      appUrl + '/stats',    isAdmin,  ['user']);



// #############################################################################
// Server-only routes
// #############################################################################

app.serverPost('userAdd', appApiUrl + '/userAdd', serverRoutes.userAdd);

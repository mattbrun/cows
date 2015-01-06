'use strict';

// #############################################################################
// Dependencies
// #############################################################################

var path        = require('path'),
    derby       = require('derby');


// #############################################################################
// Apps init
// #############################################################################

var appName = path.basename(__dirname),
    app     = module.exports = derby.createApp(appName, __filename);

if (!derby.util.isProduction) {
  //global.app = app;
  app.use(require('derby-debug'));
}

app.use(require('derby-router'));
app.serverUse(module, 'derby-stylus');

app.loadViews(__dirname + '/views');
app.loadStyles(__dirname + '/styles');

app.component(require('../../components/commonDeps'));
app.use(require('derby-login/components'));



// #############################################################################
// Routes
// #############################################################################

app.get('/login', function (page) {
  page.render();
});
var derby = require('derby');

var app = module.exports = derby.createApp('coca', __filename);

if (!derby.util.isProduction) global.app = app;

app.use(require('derby-login/components'));
app.use(require('derby-router'));
app.serverUse(module,'derby-jade');
app.serverUse(module, 'derby-stylus');

app.loadViews(__dirname + '/views');
app.loadStyles(__dirname + '/styles');

app.get('home', '/');

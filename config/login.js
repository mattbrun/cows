'use strict';

module.exports = {

  collection: 'auths',            // db collection
  publicCollection: 'users',      // projection of db collection
  
  user: {                         // projection
    id: true,
    email: true
  },
  
  encryption: 'scryptjs',

  confirmRegistration: false,

  passport: {
    successRedirect: '/',
    failureRedirect: '/'
  },

  hooks: {
    request: function(req, res, userId, isAuthenticated, done) {
      var passUrlWhiteList = function (path) {
        var letPass       = false
          , urlWhiteList  = [ '/api' ];

        for (var i = 0; i < urlWhiteList.length; i++) {
          if (path.indexOf(urlWhiteList[i]) >= 0) {
            letPass = true;
            break;
          }
        }

        return letPass;
      };

      // Redirect all unAuth GET requests to loginUrl
      if (!isAuthenticated && req.method === 'GET' &&
          req.url !== this.options.confirmRegistrationUrl &&
          req.url !== this.options.loginUrl &&
          req.url !== this.options.registrationConfirmedUrl &&
          req.url.indexOf(this.options.recoverPasswordUrl) !== 0 &&
          req.url.indexOf('/auth/') !== 0 &&
          !passUrlWhiteList(req.path)) {
        res.redirect(this.options.loginUrl);
      } else {
        done();
      }
    }
  }
};

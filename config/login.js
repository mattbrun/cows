module.exports = {
  // db collection
  collection: 'auths',
  // projection of db collection
  publicCollection: 'users',
  // passportjs options
  passport: {
    successRedirect: '/',
    failureRedirect: '/',
    registerCallback: function(req, res, user, done) {
      var model = req.getModel();
      var $user = model.at('auths.' + user.id);
      model.fetch($user, function() {
        $user.set('email', $user.get('local.email'), done);
      });
    }
  },
  strategies: {
  },
  // projection
  user: {
    id: true,
    email: true
   }
}
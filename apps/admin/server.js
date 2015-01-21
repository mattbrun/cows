// #############################################################################
// Dependencies
// #############################################################################

var derbyLogin = require('derby-login');



// #############################################################################
// Init
// #############################################################################



// #############################################################################
// Routes
// #############################################################################

module.exports.userAdd = function (req, res, next) {
  var user = req.body;
  
  derbyLogin.createUser(
    user.email,
    user.password,
    user.data,
    function (err) {
      if (err) {
        return res.json(500, err);
      } else {
        return res.sendStatus(200);
      }
    }
  );
};

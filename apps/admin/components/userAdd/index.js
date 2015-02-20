var superagent  = require('superagent'),
    _           = require('lodash');

function Useradd(){}
module.exports = Useradd;

function toBoolean (b) {
  return (b || (b !== '') || (b === 'true'));
}

Useradd.prototype.view = __dirname;
Useradd.prototype.name = 'userAdd';

Useradd.prototype.init = function (model) {
  model.set('email', '');
  model.set('password', '');
  model.set('admin', false);
};

Useradd.prototype.addUser = function () {
  var staff   = this.model.get('groups'),
      i       = _.findIndex(staff, {name: this.model.get('selectedGroup')}),
      isAdmin = toBoolean(this.model.get('admin'));

  if (i < 0) { i = 0; }
  var user = {
    email: this.model.get('email'),
    password: this.model.get('password'),
    data: {
      group: staff[i].id,
      admin: isAdmin
    }
  };
  
  var postPath = this.app.pathFor('userAdd');
  superagent.post(postPath).send(user).end(function (res) {
    if (!res.ok) {
      // TODO: handle error
      throw res;
    } else {
    }
  });
};

var superagent  = require('superagent'),
    _           = require('lodash');

function Useradd(){}
module.exports = Useradd;

Useradd.prototype.view = __dirname;
Useradd.prototype.name = 'userAdd';

Useradd.prototype.init = function (model) {
  model.setNull('email', '');
  model.setNull('password', '');
  model.setNull('admin', false);

  model.ref('_groups', model.scope('groups').filter(null));
};

Useradd.prototype.addUser = function () {
  var staff   = this.model.get('_groups'),
      i       = _.findIndex(staff, {name: this.model.get('selectedGroup')}),
      isAdmin = this.model.get('admin');
  
  if (i < 0) { i = 0; }
  var user = {
    email: this.model.get('email'),
    password: this.model.get('password'),
    data: {
      nickName: this.model.get('nickName'),
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

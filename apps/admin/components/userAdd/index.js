var superagent  = require('superagent'),
    _           = require('lodash');

function Useradd(){}
module.exports = Useradd;

function toBoolean (b) {
  return (b || (b !== '') || (b === 'true'));
}

Useradd.prototype.view = __dirname;
Useradd.prototype.name = 'userAdd';

Useradd.prototype.create = function (model) {
  model.set('_email', '');
  model.set('_password', '');
  model.set('_admin', '');
  model.ref('_groups', model.root.at('_page.groups'));
};

Useradd.prototype.addUser = function () {
  var staff   = this.model.get('_groups'),
      i       = _.findIndex(staff, {name: this.model.get('_selectedGroup')}),
      isAdmin = toBoolean(this.model.get('_admin'));

  if (i < 0) { i = 0; }
  var user = {
    email: this.model.get('_email'),
    password: this.model.get('_password'),
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
      //console.log('### res', res);
    }
  });
};

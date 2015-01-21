var superagent  = require('superagent'),
    _           = require('lodash');

function Useradd(){}
module.exports = Useradd;

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
      i       = _.findIndex(staff, {name: this.model.get('_selectedGroup')});

  console.log('### staff', staff);
  console.log('### i', i);
  
  var user = {
    email: this.model.get('_email'),
    password: this.model.get('_password'),  // FIXME: encrypt client-side ??
    data: {
      group: staff[i].id,
      admin: this.model.get('_admin')
    }
  };
  
  var postPath = this.app.pathFor('userAdd');
  superagent.post(postPath).send(user).end(function (res) {
    if (!res.ok) {
      // TODO: handle error
      console.log('### res', res);
    } else {
      console.log('### res', res);
    }
  });
};

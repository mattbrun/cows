'use strict';

var superagent = require('superagent');

function Useradd(){}
module.exports = Useradd;

Useradd.prototype.view = __dirname;
Useradd.prototype.name = 'userAdd';

Useradd.prototype.create = function (model) {
  model.set('_email', '');
  model.set('_password', '');
  model.set('_staff', '');
  model.set('_admin', '');
};

Useradd.prototype.addUser = function () {
  var staff     = this.model.get('_staff'),
      selStaff  = ['*'];

  if (staff) {
    staff.forEach(function (p) {
      if (p.sel) { selStaff.push(p.name); }
    });
  }

  var user = {
    email: this.model.get('_email'),
    password: this.model.get('_password'),  // FIXME: encrypt client-side
    data: {
      groups: selStaff,
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

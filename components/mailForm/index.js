var superagent = require('superagent');

module.exports = Mailform;

function Mailform(){}

Mailform.prototype.view = __dirname;
Mailform.prototype.name = 'mailForm';


Mailform.prototype.create = function (model) {
  this.model.set('from', this.model.root.get('_page.user.email'));
  this.model.set('to', '');
  this.model.set('subject', '');
  this.model.set('text', '');
};


Mailform.prototype.send = function () {
  var self  = this,
      model = this.model;

  var email = {
    from      : this.model.get('from'),
    to        : this.model.get('to'),
    subject   : this.model.get('subject'),
    text      : this.model.get('text'),
  };

  superagent
    .post(this.app.pathFor('sendEmail'))
    .send(email)
    .set('X-Requested-With', 'XMLHttpRequest')
    .end(function (res) {
      if (!res.ok) { return error(res.text); }

      if (!res.body.success) {
        console.log('### ERROR', res.body.error);
      } else {
        console.log('mail mandata', res);
      }
    });
};

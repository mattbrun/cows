var superagent = require('superagent');

function Mailform(){}
module.exports = Mailform;

Mailform.prototype.view = __dirname;

Mailform.prototype.name = 'mailForm';

Mailform.prototype.init = function (model) {
  model.setNull('from', model.root.get('_page.user.email'));
  model.setNull('to', model.get('@to'));
  model.setNull('subject', '');
  model.setNull('text', '');
};


Mailform.prototype.create = function (model) {
  this.selectize = $('#iTo').selectize({
    plugins: ['remove_button']
  })[0];
};


Mailform.prototype.send = function () {
  var self    = this,
      email   = {},
      emails  = [];

  for (var i = 0; i < this.selectize.length; i++) {
    emails.push(self.selectize[i].value);
  }

  email = {
    from      : this.model.get('from'),
    to        : emails,
    subject   : this.model.get('subject'),
    text      : this.model.get('text'),
  };

  superagent
    .post(this.app.pathFor('sendEmail'))
    .send(email)
    .set('X-Requested-With', 'XMLHttpRequest')
    .end(function (res) {
      if (!res.ok) {
        // TODO: handle error
        throw res;
      } else {
        // FIXME reset data without refreshing page
        history.go('/coca/mail');
      }
    });
};

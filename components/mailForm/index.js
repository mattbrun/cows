var superagent = require('superagent');

function MailForm(){}
module.exports = MailForm;

MailForm.prototype.view = __dirname;

MailForm.prototype.name = 'mailForm';


MailForm.prototype.init = function (model) {
  model.setNull('subject', '');
  model.setNull('text', '');
};


MailForm.prototype.create = function (model) {
  this.selectize = $('#iTo').selectize({
    plugins: ['remove_button']
  })[0].selectize;
};


MailForm.prototype.send = function () {
  var self    = this,
      email   = {};

  email = {
    from      : this.model.get('emailSender'),
    to        : self.selectize.items,
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


MailForm.prototype.clickEmailGroupAll = function () {
  var self = this;

  this.model.get('emailRecipients').forEach(function (e) {
    self.selectize.addItem(e.email);
  });
};


MailForm.prototype.clickEmailGroupNone = function () {
  this.selectize.clear();
};

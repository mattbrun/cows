var superagent  = require('superagent');

function MailForm(){}
module.exports = MailForm;

MailForm.prototype.view = __dirname;

MailForm.prototype.name = 'mailForm';


MailForm.prototype.init = function (model) {
  model.setNull('subject', '');
  model.setNull('text', '');

  model.ref('_groups', model.scope('groups').filter(null));
};


MailForm.prototype.create = function (model) {
  var self = this,

      // Even if recipients change during the user interaction with the page
      // the selectize doesn't change, so it's ok to use get once
      recipients  = model.get('recipients');

  this.selectizeTo = $('#iTo').selectize({
    create: true,
    plugins: ['remove_button']
  })[0].selectize;

  // TODO: use https://github.com/d-sko/selectize-item-color
  // to color tags based on the group color
  this.selectizeGroups = $('#iToGroups').selectize({
    plugins: ['remove_button'],
    onItemAdd: function (value, $item) {
      for (var i = 0; i < recipients.length; i++) {
        if (recipients[i].gid === value) {
          self.selectizeTo.addItem(recipients[i].email);
        }
      }
    },
    onItemRemove: function (value) {
      for (var i = 0; i < recipients.length; i++) {
        if (recipients[i].gid === value) {
          self.selectizeTo.removeItem(recipients[i].email);
        }
      }
    },
    onClear: function () {
      self.selectizeTo.clear();
    }
  })[0].selectize;
};


MailForm.prototype.send = function () {
  var self    = this,
      email   = {};

  email = {
    from      : this.model.get('sender'),
    to        : self.selectizeTo.items,
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


MailForm.prototype.clickToGroupAll = function () {
  var self = this;

  this.model.get('_groups').forEach(function (g) {
    self.selectizeGroups.addItem(g.id);
  });
};


MailForm.prototype.clickToGroupNone = function () {
  this.selectizeGroups.clear();
};

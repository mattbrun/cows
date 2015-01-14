'use strict';

var superagent = require('superagent');

module.exports = Mailform;

function Mailform(){}

Mailform.prototype.view = __dirname;
Mailform.prototype.name = 'mailForm';


Mailform.prototype.init = function () {
  this.model.set('from', this.model.root.get('_page.user.email'));
  this.model.set('to', '');
  this.model.set('subject', '');
  this.model.set('text', 'ciao');
};


Mailform.prototype.create = function (model) {
  // FIXME: put the error handling in a separate component
  if (this.fields) {
    var cleanError = function() {
      model.del('error');
    };
    
    for (var i = 0; i < this.fields.length; i++) {
      var field = this.fields[i];
      model.on('change', field, cleanError);
    }
  }
};


Mailform.prototype.send = function () {
  var self = this,
      model = this.model;

  function error (message) {
    model.set('error', message);
    self.emit('error', message);
  }

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
        error(res.body.error);
      } else {
        console.log('mail mandata', res);
      }
    });
};
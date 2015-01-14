'use strict';

function Userslist () {}
module.exports = Userslist;

Userslist.prototype.view = __dirname;
Userslist.prototype.name = 'usersList';

Userslist.prototype.create = function (model) {
  var usersQuery = model.root.query('users', {});

  usersQuery.subscribe(function (err) {
    if (err) { throw err; }
    model.ref('_users', usersQuery);
  });
};

Userslist.prototype.arrayToString = function (array) {
  var result = "";

  if (array) {
    for (var i = 0; i < array.length - 1; i++) {
      result += array[i] + ', ';
    }
    result += array[i];
  }

  return result;
};

Userslist.prototype.delUser = function (uid) {
  this.model.root.del('users.' + uid);
};

'use strict';

var _ = require('lodash');

function UsersList () {}
module.exports = UsersList;

UsersList.prototype.view = __dirname;
UsersList.prototype.name = 'usersList';

UsersList.prototype.create = function (model) {
  var usersQuery = model.root.query('users', {});

  model.ref('_groups', model.root.at('_page.groups'));
  usersQuery.subscribe(function (err) {
    if (err) { throw err; }
    model.ref('_users', usersQuery);
  });
};

UsersList.prototype.getGroupName = function (gid) {
  var result = '';
  console.log('### gid', gid);

  if (gid === '*') {
    result = gid;
  } else {
    var i = _.findIndex(this.model.get('_groups'), {id: gid});
    result = this.model.get('_groups.' + i + '.name') + ' ';
  }

  return result;
};

UsersList.prototype.delUser = function (uid) {
  this.model.root.del('users.' + uid);
};

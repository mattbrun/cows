var _ = require('lodash');

function UsersList () {}
module.exports = UsersList;

UsersList.prototype.view = __dirname;
UsersList.prototype.name = 'usersList';

UsersList.prototype.init = function (model) {
  model.ref('_users', model.scope('users').filter(null));
  model.ref('_groups', model.scope('groups').filter(null));
};

UsersList.prototype.getGroupName = function (gid) {
  var result = '';

  if (gid) {
    if (gid === '*') {
      result = gid;
    } else {
      var groups  = this.model.get('_groups'),
          i       = _.findIndex(groups, {id: gid});
      if (i >= 0) { result = groups[i].name; }
    }
  }

  return result;
};

UsersList.prototype.delUser = function (uid) {
  this.model.del('users.' + uid);
};


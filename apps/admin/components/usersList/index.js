var _ = require('lodash');

function UsersList () {}
module.exports = UsersList;

UsersList.prototype.view = __dirname;
UsersList.prototype.name = 'usersList';

UsersList.prototype.getGroupName = function (gid) {
  var result = '';

  if (gid === '*') {
    result = gid;
  } else {
    var groups  = this.model.at('groups'),
        i       = _.findIndex(groups.get(), {id: gid});
    result = groups.get(i + '.name') + ' ';
  }

  return result;
};

UsersList.prototype.delUser = function (uid) {
  this.model.root.del('users.' + uid);
};

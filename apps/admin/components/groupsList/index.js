function GroupsList(){}
module.exports = GroupsList;

GroupsList.prototype.view = __dirname;
GroupsList.prototype.name = 'groupsList';

GroupsList.prototype.init = function (model) {
  model.setNull('newGroupName', '');
  model.ref('_groups', model.scope('groups').filter(null));
};

GroupsList.prototype.addGroup = function () {
  var ng = this.model.get('newGroupName');

  this.model.root.add('groups', {name: ng});
  this.model.set('newGroupName', '');
};

GroupsList.prototype.delGroup = function (g) {
  this.model.root.del('groups.' + g.id);
};

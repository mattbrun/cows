'use strict';

function GroupsList(){}
module.exports = GroupsList;

GroupsList.prototype.view = __dirname;
GroupsList.prototype.name = 'groupsList';

GroupsList.prototype.create = function (model) {
  model.set('_newGroupName', '');
  model.ref('_groups', model.root.at('_page.groups'));
};

GroupsList.prototype.addGroup = function () {
  var ng = this.model.get('_newGroupName');

  this.model.root.add('groups', {name: ng});
  this.model.set('_newGroupName', '');
};

GroupsList.prototype.delGroup = function (g) {
  this.model.root.del('groups.' + g.id);
};

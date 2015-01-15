'use strict';

module.exports = {
  
  user: {
    load: function () {
      var userId = this.model.get('_session.userId');
      this.user = this.model.at('users.' + userId);
      this.addSubscription(this.user);
    },
    setup: function () {
      this.model.ref('_page.user', this.user);
    }
  },

  groups: {
    load: function () {
      this.groupsQuery = this.model.query('groups', {});
      this.addSubscription(this.groupsQuery);
    },
    setup: function () {
      this.model.ref('_page.groups', this.groupsQuery);
    }
  }
  
};

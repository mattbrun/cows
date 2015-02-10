var _ = require('lodash');

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
  },
  
  usersEmail: {
    load: function () {
      this.usersQuery = this.model.query('users', {});
      this.addSubscription(this.usersQuery);
    },
    setup: function () {
      this.emails = _.pluck(this.usersQuery.get(), 'email');
      this.model.set('_page.usersEmail', this.emails);
    }
  }

};

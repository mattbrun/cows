module.exports = {
  
  user: {
    load: function () {
      var userId = this.model.get('_session.userId');
      this.user = this.model.at('users.' + userId);
      this.addSubscriptions(this.user);
    },
    setup: function () {
      this.model.ref('_page.user', this.user);
    }
  },

  groups: {
    load: function () {
      this.groups = this.model.at('groups');
      this.addSubscriptions(this.groups);
    },
    setup: function () {
      this.model.ref('_page.groups', this.groups);
    }
  },
  
  users: {
    load: function () {
      this.users = this.model.at('users');
      this.addSubscriptions(this.users);
    },
    setup: function () {
      this.model.ref('_page.users', this.users);
    }
  },
  
  usersEmail: {
    load: function () {
      this.usersQuery = this.model.query('users', {});
      this.addSubscriptions(this.usersQuery);
      //this.users = this.model.at('users');
      //this.addSubscriptions(this.users);
    },
    setup: function () {
      var uq      = this.usersQuery.get(),
          emails  = [];

      uq.forEach(function (user) {
        emails.push({
          email: user.email,
          gid: user.group
        });
      });

      this.model.set('_page.usersEmail', emails);
    }
  }

};

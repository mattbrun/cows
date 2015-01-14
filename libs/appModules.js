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
  }
  
};
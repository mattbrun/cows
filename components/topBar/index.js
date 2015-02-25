// #############################################################################
// Definition and configuration
// #############################################################################

var TopBar = function() { };

TopBar.prototype.name = 'topBar';

TopBar.prototype.view = __dirname;



// #############################################################################
// Prototype
// #############################################################################

TopBar.prototype.toggleSideBar = function () {
  $("#wrapper").toggleClass("toggled");
};

TopBar.prototype.reconnect = function() {
  var model = this.model;

  // Hide the reconnect link for a second after clicking it
  model.set('hideReconnect', true);
  setTimeout(function() {
    model.set('hideReconnect', false);
  }, 1000);
  model.reconnect();
};

TopBar.prototype.reload = function() {
  window.location.reload();
};

TopBar.prototype.sentenceCase = function(text) {
  return text && (text.charAt(0).toUpperCase() + text.slice(1));
};



// #############################################################################
// Export
// #############################################################################

module.exports = TopBar;

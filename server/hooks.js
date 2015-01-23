// #############################################################################
// Dependencies
// #############################################################################

var derbyHook   = require('derby-hook');



// #############################################################################
// Hooks
// #############################################################################

function registerHooks (/*store*/) {
  /* EXAMPLES: Hooks events are create, change, delete
  store.hook('create', 'todos', function (docId, value, session, backend) {
    var model = store.createModel();
    model.fetch ('todos.'+docId, function (err){
      if (err) { throw err; }
      var time = +new Date();
      model.set('todos.'+docId+'.ctime', time);
      model.close();
    });
  });
  store.hook('change', 'users.*.location', function (docId, value, op, session, backend){
    var model = store.createModel();
    console.log('User change location HOOK');
    model.close();
  });
  store.hook('del', 'todos', function(docId, value, session, backend) {
    var model = store.createModel();
    model.close();
  });
  */
}



// #############################################################################
// Export
// #############################################################################

module.exports = function(store) {
  derbyHook(store);
  registerHooks(store);
};
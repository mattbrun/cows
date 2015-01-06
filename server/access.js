'use strict';

// #############################################################################
// Dependencies
// #############################################################################

var sa = require('share-access');



// #############################################################################
// Users policy
// #############################################################################

function authsColl () {
  var collName = 'auths';
  
  sa.allowCreate(collName, function (/*docId, doc, session*/) {
    return true;
  });
  sa.denyCreate(collName, function (/*docId, doc, session*/) {
    return false;
  });

  sa.allowRead(collName, function (/*docId, doc, session*/) {
    return true;
  });
  sa.denyRead(collName, function (/*docId, doc, session*/) {
    return false;
  });

  sa.allowDelete(collName, function (/*docId, doc, session*/) {
    return true;
  });
  sa.denyDelete(collName, function (/*docId, doc, session*/) {
    return false;
  });

  sa.allowUpdate(collName, function (/*docId, oldDoc, newDoc, path, session*/) {
    return true;
  });
  sa.denyUpdate(collName, function (/*docId, oldDoc, newDoc, path, session*/) {
    return false;
  });
}



// #############################################################################
// Export
// #############################################################################

module.exports = function(derby) {
  // Init component
  derby.use(sa);

  // Define custom policies
  authsColl();
};
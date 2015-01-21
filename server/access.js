// #############################################################################
// Dependencies
// #############################################################################

var sa = require('share-access');



// #############################################################################
// Policies definitions
// #############################################################################

function authsColl () {
  var collName = 'auths';
  
  sa.allowCreate(collName, function (docId, doc, session) {
    console.log('### allowCreate auths', docId, doc, session);
    return true;
  });
  sa.denyCreate(collName, function (docId, doc, session) {
    console.log('### denyCreate auths', docId, doc, session);
    return false;
  });

  sa.allowRead(collName, function (docId, doc, session) {
    console.log('### allowRead auths', docId, doc, session);
    return true;
  });
  sa.denyRead(collName, function (docId, doc, session) {
    console.log('### denyRead auths', docId, doc, session);
    return false;
  });

  sa.allowDelete(collName, function (docId, doc, session) {
    console.log('### allowDelete auths', docId, doc, session);
    return true;
  });
  sa.denyDelete(collName, function (docId, doc, session) {
    console.log('### denyDelete auths', docId, doc, session);
    return false;
  });

  sa.allowUpdate(collName, function (docId, oldDoc, newDoc, path, session) {
    console.log('### allowUpdate auths', docId, oldDoc, newDoc, path, session);
    return true;
  });
  sa.denyUpdate(collName, function (docId, oldDoc, newDoc, path, session) {
    console.log('### denyUpdate auths', docId, oldDoc, newDoc, path, session);
    return false;
  });
}

function usersColl () {
  var collName = 'users';
  
  sa.allowCreate(collName, function (docId, doc, session) {
    console.log('### allowCreate users', docId, doc, session);
    return true;
  });
  sa.denyCreate(collName, function (docId, doc, session) {
    console.log('### denyCreate users', docId, doc, session);
    return false;
  });

  sa.allowRead(collName, function (docId, doc, session) {
    console.log('### allowRead users', docId, doc, session);
    return true;
  });
  sa.denyRead(collName, function (docId, doc, session) {
    console.log('### denyRead users', docId, doc, session);
    return false;
  });

  sa.allowDelete(collName, function (docId, doc, session) {
    console.log('### allowDelete users', docId, doc, session);
    return true;
  });
  sa.denyDelete(collName, function (docId, doc, session) {
    console.log('### denyDelete users', docId, doc, session);
    return false;
  });

  sa.allowUpdate(collName, function (docId, oldDoc, newDoc, path, session) {
    console.log('### allowUpdate users', docId, oldDoc, newDoc, path, session);
    return true;
  });
  sa.denyUpdate(collName, function (docId, oldDoc, newDoc, path, session) {
    console.log('### denyUpdate users', docId, oldDoc, newDoc, path, session);
    return false;
  });
}

function groupsColl () {
  var collName = 'groups';
  
  sa.allowCreate(collName, function (docId, doc, session) {
    console.log('### allowCreate groups', docId, doc, session);
    return true;
  });
  sa.denyCreate(collName, function (docId, doc, session) {
    console.log('### denyCreate groups', docId, doc, session);
    return false;
  });

  sa.allowRead(collName, function (docId, doc, session) {
    console.log('### allowRead groups', docId, doc, session);
    return true;
  });
  sa.denyRead(collName, function (docId, doc, session) {
    console.log('### denyRead groups', docId, doc, session);
    return false;
  });

  sa.allowDelete(collName, function (docId, doc, session) {
    console.log('### allowDelete groups', docId, doc, session);
    return true;
  });
  sa.denyDelete(collName, function (docId, doc, session) {
    console.log('### denyDelete groups', docId, doc, session);
    return false;
  });

  sa.allowUpdate(collName, function (docId, oldDoc, newDoc, path, session) {
    console.log('### allowUpdate groups', docId, oldDoc, newDoc, path, session);
    return true;
  });
  sa.denyUpdate(collName, function (docId, oldDoc, newDoc, path, session) {
    console.log('### denyUpdate groups', docId, oldDoc, newDoc, path, session);
    return false;
  });
}



// #############################################################################
// Policies config
// #############################################################################

authsColl();
usersColl();
groupsColl();



// #############################################################################
// Export
// #############################################################################

module.exports = sa;

// #############################################################################
// Dependencies
// #############################################################################

var path        = require('path')
  , fs          = require('fs')
  , config      = require('./config')
  , async       = require('async')
  , MongoClient = require('mongodb').MongoClient;



// #############################################################################
// Mongo clean functions
// #############################################################################

// clean "auths" collection
function cleanAuthsCollection (db) {
  var collAuths       = db.collection('auths'),
      collAuths_ops   = db.collection('auths_ops');

  // For each session, keeps only its last record in auths_ops
  collAuths.find().toArray(function (err, auths) {
    if (err) { throw err; }

    auths.forEach(function (auth) {
      if (!auth.local) {  // The user has been deleted
        collAuths.remove({ _id: auth._id }, function (err) { if (err) { throw err; } });
        collAuths_ops.remove({ name: auth._id }, function (err) { if (err) { throw err; } });
      } else {  // The user still exists
        collAuths_ops.remove({
          name: auth._id,
          v: { $ne: auth._v - 1 }
        }, function (err) { if (err) { throw err; } });
      }
    });
  });
}

function cleanCollections (db, collName, collOpsName) {
  var iDB       = collName.indexOf('.') + 1,
      coll      = db.collection(collName.substr(iDB)),
      coll_ops  = db.collection(collOpsName.substr(iDB));

  // Clean deleted records which are kept by default by sharejs
  coll.find({
    _data: { $type: 10 }
  }).toArray(function (err, objs) {
    if (err) { throw err; }
    
    objs.forEach(function (obj) {
      if (obj) {
        coll.remove({_id: obj._id}, function (err) { if (err) { throw err; } });
        coll_ops.remove({name: obj._id}, function (err) { if (err) { throw err; } });
        coll_ops.remove({name: 'undefined'}, function (err) { if (err) { throw err; } });
      }
    });
  });
}

function cleanDeletedData (db) {
  db.collectionNames({ namesOnly: true }, function (err, colls) {
    if (err) { throw err; }
    
    while (colls.length > 0) {
      var coll1 = colls.shift(),
          coll2 = '';
      if (coll1.indexOf('_ops') < 0) { // No _ops collection
        var iOps = colls.indexOf(coll1 + '_ops');
        if (iOps >= 0) { // There is an _ops collection
          coll2 = colls.splice(iOps, 1);
          if (coll2.length > 0) {
            cleanCollections(db, coll1, coll2[0]);
          }
        }
      } else { // _ops collection
        // Get index of non _ops collection
        var i = colls.indexOf(coll1.substr(0, coll1.length - 4));
        coll2 = colls.splice(i, 1);
        if (coll2.length > 0) {
          cleanCollections(db, coll2[0], coll1);
        }
      }
    }
  });
}



// #############################################################################
// File system clean functions
// #############################################################################

function cleanDerbyBundle() {
  var location = path.join(__dirname, '../public/derby');
  if (fs.existsSync(location)) {
    var files = fs.readdirSync(location);
    files.forEach(function(file) {
      fs.unlinkSync(path.join(location, file));
    });
  }
}



// #############################################################################
// Main function and export
// #############################################################################

function eraseDbCollections (db, cb) {
  if (config.app.eraseDBOnStart) {
    // TODO make it async
    /*
    db.dropDatabase(function (err) {
      if (err) { throw err; }
      if (cb) { cb(); }
    });
    */
  } else {
    if (cb) { cb(); }
  }
}

function clean (db, cb) {
  cleanAuthsCollection(db);
  cleanDeletedData(db);
  if (cb) { cb(); }
}

module.exports = function () {
  cleanDerbyBundle();

  // Since sharejs doesn't completely remove objects from the DB for delete ops
  // rewind possibility, we force the deletion of those objects
  MongoClient.connect(config.mongo.url + '?auto_reconnect', { safe: true }, function(err, db) {
    if(err) { throw err; }

    eraseDbCollections(db, function () {
      clean(db, function () {
        setInterval(async.apply(clean, db, null), config.app.cleanInterval);
      });
    });
  });
};

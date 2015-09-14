(function () {

  'use strict';

  angular
    .module('memebook.services')
    .service('usersFirebase', [
      'FIREBASE', '$q',
      function(FIREBASE, $q) {
        var firebase = new Firebase(FIREBASE.DATABASE_URL);
        var users = firebase.child(FIREBASE.USERS);

        this.ref = users;

        this.saveUser = function (user) {
          var savedUser = users.push(user);
          savedUser.update({online: true});
          savedUser.onDisconnect().update({online: false});
          return savedUser.key();
        };

        this.validate = function (id) {
          var deferred = $q.defer();
          if (!id) {
            deferred.resolve(null);
            return deferred.promise;
          }
          users.child(id).once('value', function(snapshot) {
            deferred.resolve(snapshot);
          });
          return deferred.promise;
        };

        this.getAllUsers = function() {
          var deferred = $q.defer();
          users.once('value', function(snapshot) {
            deferred.resolve(snapshot);
          });
          return deferred.promise;
        };

        this.findByName = function(name) {
          var deferred = $q.defer();
          users.orderByChild('name').equalTo(name).once('value', function(snapshot) {
            deferred.resolve(snapshot);
          });
          return deferred.promise;
        };

        this.updateVotesUp = function (userId, postId) {
          var deferred = $q.defer();
          var user = users.child(userId + '/likes/');
          user.push({ postId: postId}, function (snapshot) {
            deferred.resolve(snapshot);
          });
          return deferred.promise;
        };

        this.updateVotesDown = function (userId, postId) {
          var deferred = $q.defer();
          var user = users.child(userId + '/dislikes/');
          user.push({ postId: postId}, function (snapshot) {
            deferred.resolve(snapshot);
          });
          return deferred.promise;
        };

        this.onUpdate = function (userId, cb) {
          var user = users.child(userId);
          user.on('value', cb);
        };
      }
    ]);
})();
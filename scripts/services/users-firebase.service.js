(function () {

  'use strict';

  angular
    .module('memebook.services')
    .service('usersFirebase', [
      'FIREBASE',
      '$q',
      usersFirebase
    ]);

  function usersFirebase (FIREBASE, $q) {
    var firebase = new Firebase(FIREBASE.DATABASE_URL);
    var users = firebase.child(FIREBASE.USERS);

    this.saveUser = function (user) {
      return users.push(user).key();
    };

    this.validate = function (id) {
      var deferred = $q.defer();
      if (!id) {
        deferred.resolve(null);
        return deferred.promise;
      }
      users.child(id).once('value', function(snapshot) {
        deferred.resolve(snapshot.val());
      });
      return deferred.promise;
    };
  }
})();
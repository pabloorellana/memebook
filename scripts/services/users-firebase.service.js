(function () {

  'use strict'

  angular
    .module('memebook.services')
    .service('usersFirebase', [
      'FIREBASE',
      usersFirebase
    ]);

  function usersFirebase (FIREBASE) {
    var firebase = new Firebase(FIREBASE.DATABASE_URL);
    var users = firebase.child(FIREBASE.USERS);

    this.saveUser = function (user) {
      return users.push(user).key();
    };

    this.onUserAdded = function (cb) {
      users.on('child_added', cb);
    };
  }
})();
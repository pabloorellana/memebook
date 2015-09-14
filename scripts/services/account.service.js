(function() {

  'use strict';

  angular
    .module('memebook.services')
    .service('account', [
      'MEMEBOOK', 'usersFirebase',
      function Account(MEMEBOOK, usersFirebase) {

        var SESSION_KEY = MEMEBOOK.SESSION_KEY;

        var current = JSON.parse(sessionStorage.getItem(SESSION_KEY));

        this.isSignedIn = function() {
          return usersFirebase.validate((current || {}).id);
        };

        this.signIn = function(user) {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
          current = user;
        };

        this.signOut = function() {
          sessionStorage.removeItem(SESSION_KEY);
          current = null;
        };

        this.getUserName = function () {
          return JSON.parse(sessionStorage.getItem(SESSION_KEY));
        };

        this.getUserInfo = function () {
          return JSON.parse(sessionStorage.getItem(SESSION_KEY));
        };
      }
    ]);
})();
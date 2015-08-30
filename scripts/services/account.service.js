(function() {

  'use strict';

  angular
    .module('memebook.services')
    .service('account', Account);

  function Account() {

    var SESSION_KEY = 'session-memebook';

    var current = localStorage.getItem(SESSION_KEY);

    this.isSignedIn = function() {
      return !!current;
    };

    this.signIn = function(username) {
      localStorage.setItem(SESSION_KEY, username);
      current = username;
    };

    this.signOut = function() {
      localStorage.removeItem(SESSION_KEY);
      current = null;
    };
  }

})();
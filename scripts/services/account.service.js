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

    this.signIn = function(user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      current = user;
    };

    this.signOut = function() {
      localStorage.removeItem(SESSION_KEY);
      current = null;
    };

    this.getUserName = function () {
      return localStorage.getItem(SESSION_KEY);
    };
  }

})();
(function() {

  'use strict';

  angular
    .module('memebook.services')
    .service('account', Account);

  function Account() {

    var SESSION_KEY = 'session-memebook';

    var current = sessionStorage.getItem(SESSION_KEY);

    this.isSignedIn = function() {
      return !!current;
    };

    this.signIn = function(user) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
      current = user;
    };

    this.signOut = function() {
      sessionStorage.removeItem(SESSION_KEY);
      current = null;
    };

    this.getUserInfo = function () {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY));
    };
  }

})();
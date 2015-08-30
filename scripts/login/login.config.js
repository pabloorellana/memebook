(function() {

  'use strict';

  angular
    .module('memebook.login')
    .config(configure);

  configure.$inject = ['$routeProvider'];

  function configure($routeProvider) {

    $routeProvider
     .when('/login', {
      templateUrl: 'scripts/login/login.view.html',
      controller: 'LoginController',
      controllerAs: 'login'
    });
  }
})();
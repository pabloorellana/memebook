(function() {

  'use strict';

  angular
    .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {

    $routeProvider
     .when('/login', {
      templateUrl: 'scripts/login/login.view.html',
      controller: 'LoginController',
      controllerAs: 'login'
    });
  }
})();
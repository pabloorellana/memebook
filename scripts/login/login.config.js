(function() {

  'use strict';

  angular
    .module('memebook.login')
    .config([
      '$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/login', {
            templateUrl: 'scripts/login/login.view.html',
            controller: 'LoginController'
          });
    }]);

})();
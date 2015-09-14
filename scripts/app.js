(function() {

  angular
    .module('memebook', [
      'ngResource',
      'ngRoute',
      'ngAnimate',
      'toaster',
      'memebook.directives',
      'memebook.login',
      'memebook.board',
      'memebook.users'
    ])
    .config([
      '$httpProvider', '$routeProvider',
      function ($httpProvider, $routeProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $routeProvider
          .otherwise({
            redirectTo: '/board'
          });
      }
    ]);
})();
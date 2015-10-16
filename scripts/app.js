(function() {

  angular
    .module('memebook', [
      'ngResource',
      'ngRoute',
      'ngAnimate',
      'toaster',
      //'memebook.login',
      //'memebook.directives',
      //'memebook.board'
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
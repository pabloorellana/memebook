(function() {

  'use strict';

  angular
    .module('memebook.login')
    .run(run);

  run.$inject = ['$rootScope', '$location', 'account'];

  function run($rootScope, $location, account) {

    var LOGIN_TEMPLATE = 'scripts/login/login.view.html';

    $rootScope.$on('$routeChangeStart', verifyAccount);

    function verifyAccount(evt, next, current) {

      if (next.templateUrl !== LOGIN_TEMPLATE) {
        if (!account.isSignedIn()) {
          evt.preventDefault();
          $location.path('/login');
        }
      }
    }
  }
})();
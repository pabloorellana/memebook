(function() {

  'use strict';

  angular
    .module('memebook.login')
    .run(run);

  run.$inject = ['$rootScope', '$location', '$route', 'account', 'usersFirebase'];

  function run($rootScope, $location, $route, account, usersFirebase) {

    var LOGIN_TEMPLATE = 'scripts/login/login.view.html';

    $rootScope.$on('$routeChangeStart', verifyAccount);
    var isValidUser = false;

    function verifyAccount(evt, next, current) {

      var originalRoute = next.$$route.originalPath;

      if (isValidUser || next.templateUrl === LOGIN_TEMPLATE) {
        return;
      }

      evt.preventDefault();

      account.isSignedIn()
        .then(function(user) {
          if (user) {
            isValidUser = true;
            $location.path(originalRoute);
            $route.reload();
            return;
          }
          account.signOut();
          $location.path('/login');
        });
    }
  }
})();
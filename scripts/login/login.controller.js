(function() {

  'use strict';

  angular
    .module('memebook.login')
    .controller('LoginController', [
      '$scope', '$location', 'account', 'usersFirebase',
      function($scope, $location, account, usersFirebase) {

        $scope.nick = null;
        $scope.submit = submit;

        function submit() {

          /*var userId = usersFirebase.saveUser({
            name: $scope.nick,
            createdAt: new Date()
          });

          account.signIn({
            name: $scope.nick,
            id: userId
          });

          $location.path('/board');*/
        }
      }]);

})();
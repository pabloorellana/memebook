(function() {

  'use strict';

  angular
    .module('memebook.users')
    .directive('mbUsers', [
      '$timeout', 'usersFirebase', 'account',
      function($timeout, userService, account) {

        return {
          replace: true,
          scope: {},
          templateUrl: 'scripts/users/users.view.html',
          link: function(scope) {

            scope.users = [];

            scope.$on('$destroy', destroyListener);

            var userCreate = userService.onCreate(userCreateListener);
            var userChange = userService.onChange(userChangeListener);

            function userCreateListener(user) {
              scope.$evalAsync(function() {
                scope.users.push(user);
              });
            }

            function userChangeListener(user) {
              scope.$evalAsync(function() {
                var results = scope.users.filter(function(filteredUser) {
                  return filteredUser.name === user.name;
                });
                var firstResult = results[0];
                if (angular.isDefined(firstResult)) {
                  angular.copy(user, firstResult);
                } else {
                  scope.users.push(user);
                }
              });
            }

            function destroyListener() {
              userCreate.remove();
              userChange.remove();
            }
          }
        };
      }
    ]);
})();

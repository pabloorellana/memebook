(function() {

  'use strict';

  angular
    .module('memebook.directives')
    .directive('mbUsers', [
      '$timeout', 'usersFirebase', 'account',
      function($timeout, userService, account) {

        return {
          replace: true,
          scope: {},
          templateUrl: 'scripts/directives/users/users.view.html',
          link: function(scope) {

            scope.users = [];

            scope.$on('$destroy', destroyListener);

            var userAdded = userService.onUserAdded(userAddedListener);
            var userChanged = userService.onUserChanged(userChangedListener);

            function userAddedListener(user) {
              scope.$evalAsync(function() {
                scope.users.push(user);
              });
            }

            function userChangedListener(user) {
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
              userAdded.remove();
              userChanged.remove();
            }
          }
        };
      }
    ]);
})();

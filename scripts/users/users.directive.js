(function() {

  'use strict';

  angular
    .module('memebook.users')
    .directive('mbUsers', [
      '$timeout', 'usersFirebase', 'account',
      function mbUsers($timeout, usersFirebase, account) {

        return {
          replace: true,
          scope: {},
          templateUrl: 'scripts/users/users.view.html',
          link: function link(scope) {

            scope.users = [];

            scope.$on('$destroy', destroyListener);
            usersFirebase.ref.on('child_added', childAddedListener);
            usersFirebase.ref.on('child_changed', childChangedListener);

            function childAddedListener(snapshot) {
              scope.users.push(snapshot.val());
              scope.$digest();
            }

            function childChangedListener(snapshot) {
              var updatedUser = snapshot.val();
              var matches = scope.users.filter(function(user) {
                return user.name === updatedUser.name;
              });
              var firstMatch = matches[0];
              if (firstMatch) {
                angular.copy(updatedUser, firstMatch);
              } else {
                scope.users.push(updatedUser);
              }
              scope.$digest();
            }

            function destroyListener() {
              usersFirebase.ref.off('child_added', childAddedListener);
            }
          }
        };
      }
    ]);
})();

(function() {

  'use strict';

  angular
    .module('memebook.users')
    .directive('mbUsers', mbUsers);

  mbUsers.$inject = ['usersFirebase'];

  function mbUsers(usersFirebase) {

    var directive = {
      replace: true,
      scope: {},
      templateUrl: 'scripts/users/users.view.html',
      link: link
    };

    return directive;

    function link(scope) {

      scope.users = [];

      usersFirebase.getAllUsers()
        .then(function(usersSnapshot) {
          usersSnapshot.forEach(function(userSnapshot) {
            var user = userSnapshot.val();
            scope.users.push(user);
          });
        });
    }
  }
})();

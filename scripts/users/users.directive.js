(function() {

  'use strict';

  angular
    .module('memebook.users')
    .directive('mbUsers', mbUsers);

  mbUsers.$inject = ['$timeout', 'usersFirebase', 'account'];

  function mbUsers($timeout, usersFirebase, account) {

    var directive = {
      replace: true,
      scope: {},
      templateUrl: 'scripts/users/users.view.html',
      link: link
    };

    return directive;

    function link(scope) {

      scope.users = [];

      scope.$on('$destroy', destroyListener);
      usersFirebase.ref.on('child_added', childAddedListener);

      function childAddedListener(snapshot) {
        $timeout(function () {
          scope.users.push(snapshot.val());
        });
      };

      function destroyListener() {
        usersFirebase.ref.off('child_added', childAddedListener);
      }


    }
  }
})();

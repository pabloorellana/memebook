(function() {

  'use strict';

  angular
    .module('memebook.login')
    .controller('LoginController', [
      '$location', 'account', 'usersFirebase',
      function($location, account, usersFirebase) {

        var vm = this;

        vm.nick = null;
        vm.submit = submit;

        function submit() {

          var userId = usersFirebase.saveUser({
            name: vm.nick,
            createdAt: new Date()
          });

          account.signIn({
            name: vm.nick,
            id: userId
          });

          $location.path('/board');
        }
      }]);

})();
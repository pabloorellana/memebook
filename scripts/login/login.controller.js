(function() {

  'use strict';

  angular
    .module('memebook.login')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', 'account', 'usersFirebase'];

  function LoginController($location, account, usersFirebase) {

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
  }

})();
(function() {

  'use strict';

  angular
    .module('memebook.login')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', 'account'];

  function LoginController($location, account) {

    var vm = this;

    vm.nick = null;
    vm.submit = submit;

    function submit() {
      account.signIn(vm.nick);
      $location.path('/board');
    }
  }

})();
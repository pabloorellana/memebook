(function() {

  'use strict';

  angular
    .module('memebook.login')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope'];

  function LoginController() {

    var vm = this;

    vm.submit = submit;

    function submit() {

      console.log('submit');
    }
  }

})();
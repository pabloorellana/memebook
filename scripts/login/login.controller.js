(function() {

  'use strict';

  angular
    .module('myapp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope'];

  function LoginController() {

    var vm = this;
  }

})();
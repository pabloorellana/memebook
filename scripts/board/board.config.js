(function() {

  'use strict';

  angular
    .module('memebook.board')
    .config(configure);

  configure.$inject = ['$routeProvider'];

  function configure($routeProvider) {

    $routeProvider
     .when('/board', {
      templateUrl: 'scripts/board/board.view.html',
      controller: 'BoardController',
      controllerAs: 'board'
    });
  }
})();
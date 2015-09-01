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
      controllerAs: 'board',
      resolve: {
        memeList : [
          'memeService',
          function (memeService) {
            return memeService.getMemeList().$promise
              .then(function (result) {
                return result.filter(function (value, index, self) {
                  return self.indexOf(value) === index && !value.match(/\d+/g)
                }).sort();
              })
              .catch(function (err) {
                console.log(err);
                return [];
              });
          }
        ],
        currentUser : [
          'account',
          'usersFirebase',
          function (account, usersFirebase) {
            var username = account.getUserInfo();
            return usersFirebase.findByName(username.name)
              .then(function (result) {
                return result.val()[username.id];
              });
          }
        ]
      }
    });
  }
})();
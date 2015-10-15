(function() {

  'use strict';

  angular
    .module('memebook.board')
    .config([
      '$routeProvider',
      function($routeProvider) {

        $routeProvider
          .when('/board', {
            templateUrl: 'scripts/board/board.view.html',
            controller: 'BoardController',
            controllerAs: 'board',
            resolve: {
              memeList : [
                'memeService',
                'MEMEBOOK',
                function (memeService, MEMEBOOK) {
                  var memeList = JSON.parse(sessionStorage.getItem(MEMEBOOK.MEME_LIST));
                  if (memeList) {
                    return memeList;
                  }
                  return memeService.getMemeList().$promise
                    .then(function (result) {

                      var filteredMemeList = result.filter(function (value, index, self) {
                        return self.indexOf(value) === index && !value.match(/\d+/g);
                      }).sort();
                      sessionStorage.setItem(MEMEBOOK.MEME_LIST, JSON.stringify(filteredMemeList));
                      return filteredMemeList;
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
    ]);
})();
(function() {

  'use strict';

  angular.module('memebook.board')
    .controller('BoardController', [
      '$http',
      '$scope',
      'firebaseFactory',
      'memeService',
      BoardController
    ]);

  function BoardController ($http, $scope, firebaseFactory, memeService) {

    $scope.meme = {
      top: '',
      bottom: ''
    };

    $scope.image = '';

    $scope.generateMeme = function() {

      memeService.get({
        meme:'Evil Otter',
        top : $scope.meme.top,
        bottom: $scope.meme.bottom
      }).$promise
        .then(function (result) {
          $scope.image = result.image;
        })
        .catch(function (err) {
          console.log(err);
        });
    };
  }
})();


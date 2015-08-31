(function() {

  'use strict';

  angular.module('memebook.board')
    .controller('BoardController', [
      '$http',
      '$scope',
      'firebaseFactory',
      'memeList',
      'memeService',
      BoardController
    ]);

  function BoardController ($http, $scope, firebaseFactory, memeList, memeService) {

    $scope.meme = {
      top: '',
      bottom: '',
      image: ''
    };

    $scope.memes = memeList;

    $scope.postImage = false;

    $scope.post = {
      message : '',
      selectedMeme: ''
    };

    $scope.changePostMode = function () {
      $scope.postImage = !$scope.postImage;
    };

    $scope.generateMeme = function() {
      memeService.getMeme({
        meme: $scope.post.selectedMeme,
        top : $scope.meme.top,
        bottom: $scope.meme.bottom
      }).$promise
        .then(function (result) {
          $scope.meme.image = result.image;
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    $scope.publish = function () {
      if($scope.postImage) {

      } else {

      }
    };
  }
})();


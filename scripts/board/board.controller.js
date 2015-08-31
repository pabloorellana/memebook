(function() {

  'use strict';

  angular.module('memebook.board')
    .controller('BoardController', [
      '$http',
      '$scope',
      'postFirebase',
      'memeList',
      'memeService',
      'account',
      BoardController
    ]);

  function BoardController ($http, $scope, postFirebase, memeList, memeService, account) {

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

    $scope.posts = [];

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
      var userInfo = account.getUserInfo();

      if($scope.postImage) {

      } else {
        postFirebase.addPost({
          userId: userInfo.id,
          text: $scope.post.message,
          image: '',
          createdAt: new Date(),
          likes: 0,
          dislikes: 0,
          comments: {}
        })
      }
    };

    postFirebase.onPostAdded(function (child) {
      $scope.posts.push(child.val());
    })
  }
})();


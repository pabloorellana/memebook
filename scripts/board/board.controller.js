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

    $scope.memes = memeList;

    $scope.meme = {
      top: '',
      bottom: '',
      image: ''
    };

    $scope.postWithImage = false;

    $scope.post = {
      text : '',
      meme: ''
    };

    $scope.posts = [];

    $scope.changePostMode = function () {
      $scope.postWithImage = !$scope.postWithImage;
      $scope.meme.image = '';
      $scope.post.meme = '';
    };

    $scope.generateMeme = function() {
      memeService.getMeme({
        meme: $scope.post.meme,
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

      postFirebase.addPost({
        userId: userInfo.id,
        text: $scope.post.text,
        image: $scope.meme.image,
        createdAt: new Date(),
        likes: 0,
        dislikes: 0,
        comments: {}
      });
    };

    postFirebase.onPostAdded(function (child) {
      $scope.posts.push(child.val());
    })
  }
})();


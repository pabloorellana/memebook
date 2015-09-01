(function() {

  'use strict';

  angular.module('memebook.board')
    .controller('BoardController', [
      '$timeout',
      '$scope',
      'postFirebase',
      'memeList',
      'memeService',
      'account',
      BoardController
    ]);

  function BoardController ($timeout, $scope, postFirebase, memeList, memeService, account) {

    $scope.memes = memeList;

    $scope.meme = {
      text: '',
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
      var memeText = getTopAndBottomText($scope.meme.text);

      memeService.getMeme({
        meme: $scope.post.meme,
        top : memeText.top,
        bottom: memeText.bottom
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
        username: userInfo.name,
        text: $scope.post.text,
        image: $scope.meme.image,
        createdAt: new Date(),
        likes: 0,
        dislikes: 0,
        comments: {}
      });

      resetForm();
    };

    postFirebase.onPostAdded(function (child) {
      $timeout(function () {
        var post = angular.extend({ id: child.key()}, child.val());
        $scope.posts.unshift(post);
      });
    });

    postFirebase.onPostUpdated(function (child) {
        updatePost(child.key(), child.val());
    });

    function updatePost (postId, updatedPost) {
      var post;
      for (var i = 0; i < $scope.posts.length; i++) {
        if ($scope.posts[i].id === postId) {
          post = $scope.posts[i];
          break;
        }
      }

      $timeout(function () {
        for (var prop in updatedPost) {
          if (updatedPost.hasOwnProperty(prop)) {
            post[prop] = updatedPost[prop];
          }
        }
      });
    };

    function getTopAndBottomText (text) {
      text = text.replace(/\s\s+/g, ' ');
      var indexes = [];
      for (var i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          indexes.push(i);
        }
      }
      var half = Math.floor(indexes.length / 2);

      return {
        top: text.slice(0, indexes[half]),
        bottom: indexes[half] ? text.substring(indexes[half]) : ''
      }
    };

    function resetForm () {
      $scope.meme = {
        text: '',
        image: ''
      };

      $scope.postWithImage = false;

      $scope.post = {
        text : '',
        meme: ''
      };
    };
  }
})();


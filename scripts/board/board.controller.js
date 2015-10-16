(function() {

  'use strict';

  angular.module('memebook.board')
    .controller('BoardController', [
      '$timeout', '$scope', 'postFirebase', 'usersFirebase', 'memeList', 'currentUser', 'memeService', 'account',
      'toaster',
      function($timeout, $scope, postFirebase, usersFirebase, memeList, currentUser, memeService, account, toaster) {

        var userInfo = account.getUserInfo();
        $scope.memes = memeList;

        $scope.currentUser = currentUser;

        function resetForm () {
          $scope.meme = {text: '', image: ''};
          $scope.post = {text : '', meme: ''};
          $scope.postWithImage = false;
        }

        resetForm();

        $scope.posts = [];

        $scope.$on('$destroy', destroyListener);

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
          /*postFirebase.addPost({
            username: userInfo.name,
            text: $scope.post.text,
            image: $scope.meme.image,
            createdAt: new Date(),
            likes: 0,
            dislikes: 0,
            comments: {}
          });

          resetForm();*/
        };

        function notifyPostAdded(child) {
          toaster.pop('success', 'POST AGREGADO', child.val().username + ' agrego un nuevo post');
        }

        function notifyPostUpdated(child) {
          toaster.pop('success', 'POST ACTUALIZADO', 'El post de ' + child.val().username + ' fue actualizado');
        }

        var postCreate = postFirebase.onPostAdded(function (child) {
          $scope.$evalAsync(function () {
            notifyPostAdded(child);
            var post = angular.extend({ id: child.key()}, child.val());
            $scope.posts.unshift(post);
          });
        });

        var postChange = postFirebase.onPostChanged(function (child) {
          notifyPostUpdated(child);
          updatePost(child.key(), child.val());
        });

        usersFirebase.onUpdate(userInfo.id, function (user) {
          updateObject($scope.currentUser, user.val());
        });

        function updatePost(postId, updatedPost) {
          var post;
          for (var i = 0; i < $scope.posts.length; i++) {
            if ($scope.posts[i].id === postId) {
              post = $scope.posts[i];
              break;
            }
          }

          $scope.$evalAsync(function () {
            updateObject(post, updatedPost);
          });
        }

        function updateObject (objA, objB) {
          for (var prop in objB) {
            if (objB.hasOwnProperty(prop)) {
              objA[prop] = objB[prop];
            }
          }
        }

        function getTopAndBottomText (text) {
          text = text.replace(/\s\s+/g, ' ');
          var indexes = [];
          for (var i = 0; i < text.length; i++) {
            if (text[i] === ' ') {
              indexes.push(i);
            }
          }
          var half = Math.floor(indexes.length / 2);

          return {
            top: text.slice(0, indexes[half]),
            bottom: indexes[half] ? text.substring(indexes[half]) : ''
          };
        }

        function destroyListener() {
          postCreate.remove();
          postChange.remove();
        }
      }
    ]);
})();


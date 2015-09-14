(function () {

  'use strict';

  angular
    .module('memebook.directives')
    .directive('card', [
      'account', 'postFirebase', 'usersFirebase',
      function card (account, postFirebase, usersFirebase) {
        return {
          restrict: 'EA',
          replace: true,
          scope: {
            post: '=',
            currentUser: '='
          },
          templateUrl: 'scripts/directives/card/card.template.html',
          link: function (scope, elem, att) {
            var userinfo = account.getUserInfo();

            scope.form = {
              commentText: ''
            };

            scope.alreadyLiked = function () {
              return Object.keys(scope.currentUser.likes || {}).map(function (i) {
                return scope.currentUser.likes[i].postId;
              }).indexOf(scope.post.id) !== -1;
            };

            scope.alreadyDisliked = function () {
              return Object.keys(scope.currentUser.dislikes || {}).map(function (i) {
                return scope.currentUser.dislikes[i].postId;
              }).indexOf(scope.post.id) !== -1;
            };

            scope.voteUp = function () {
              if (scope.alreadyLiked() || scope.alreadyDisliked()) {
                return;
              }
              scope.$evalAsync(function() {
                postFirebase.voteUp(scope.post);
                usersFirebase.updateVotesUp(userinfo.id, scope.post.id);
              });
            };

            scope.voteDown = function () {
              if (scope.alreadyLiked() || scope.alreadyDisliked()) {
                return;
              }
              scope.$evalAsync(function() {
                postFirebase.voteDown(scope.post);
                usersFirebase.updateVotesDown(userinfo.id, scope.post.id);
              });
            };

            scope.comment = function () {
              postFirebase.comment(scope.post, {
                username: userinfo.name,
                text: scope.form.commentText
              });

              scope.form.commentText = '';
            };
          }
        };
      }
    ]);
})();
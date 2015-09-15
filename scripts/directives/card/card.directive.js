(function () {

  'use strict';

  angular
    .module('memebook.directives')
    .directive('card', [
      'account', 'postFirebase', 'usersFirebase',
      function(account, postFirebase, usersFirebase) {
        return {
          restrict: 'EA',
          replace: true,
          scope: {
            post: '=',
            currentUser: '='
          },
          templateUrl: 'scripts/directives/card/card.view.html',
          link: function (scope, elem, att) {

            var userinfo = account.getUserInfo();
            scope.form = {};

            resetForm();

            function resetForm() {
              scope.form.commentText = '';
            }

            function alreadyLiked() {
              return Object.keys(scope.currentUser.likes || {}).map(function (i) {
                return scope.currentUser.likes[i].postId;
              }).indexOf(scope.post.id) !== -1;
            }

            function alreadyDisliked() {
              return Object.keys(scope.currentUser.dislikes || {}).map(function (i) {
                return scope.currentUser.dislikes[i].postId;
              }).indexOf(scope.post.id) !== -1;
            }

            scope.voteUp = function () {
              if (alreadyLiked() || alreadyDisliked()) {
                return;
              }
              postFirebase.voteUp(scope.post);
              usersFirebase.updateVotesUp(userinfo.id, scope.post.id);
            };

            scope.voteDown = function () {
              if (alreadyLiked() || alreadyDisliked()) {
                return;
              }
              postFirebase.voteDown(scope.post);
              usersFirebase.updateVotesDown(userinfo.id, scope.post.id);
            };

            scope.createComment = function () {
              postFirebase.comment(scope.post, {
                username: userinfo.name,
                text: scope.form.commentText
              });

              resetForm();
            };
          }
        };
      }
    ]);
})();
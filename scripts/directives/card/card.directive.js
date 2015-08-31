(function () {

  'use strict'

  angular
    .module('memebook.directives')
    .directive('card', [
      'account',
      'postFirebase',
      card
    ]);

  function card (account, postFirebase) {
    return {
      restrict: 'EA',
      scope: {
        post: '='
      },
      templateUrl: "scripts/directives/card/card.template.html",
      link: function (scope, elem, att) {
        scope.form = {
          commentText: ''
        };

        scope.voteUp = function () {
          postFirebase.voteUp(scope.post);
        };

        scope.voteDown = function () {
          postFirebase.voteDown(scope.post);
        };

        scope.comment = function () {
          var userinfo = account.getUserInfo();
          postFirebase.comment(scope.post, {
            username: userinfo.name,
            text: scope.form.commentText
          });

          scope.form.commentText = '';
        };

      }
    }
  };
})();
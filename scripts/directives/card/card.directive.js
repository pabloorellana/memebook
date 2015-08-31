(function () {

  'use strict'

  angular
    .module('memebook.directives')
    .directive('card', [
      'postFirebase',
      card
    ]);

  function card (postFirebase) {
    return {
      restrict: 'EA',
      scope: {
        post: '='
      },
      templateUrl: "scripts/directives/card/card.template.html",
      link: function (scope, elem, att) {

        scope.voteUp = function () {
          scope.post.likes = scope.post.likes + 1;
          postFirebase.voteUp(scope.post);
        };

        scope.voteDown = function () {
          scope.post.dislikes = scope.post.dislikes + 1;
          postFirebase.voteDown(scope.post);
        }

      }
    }
  };
})();
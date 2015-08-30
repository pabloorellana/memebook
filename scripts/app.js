/*var root = {

  users: {

    'id1': {
      name: 'string',
      createdAt: 'date',
      likes: {
        postId: 'post.id1'
      },
      dislikes: {
        postId: 'post.id2'
      },
    },
    'id2': {
      name: 'string',
      createdAt: 'date',
      likes: {
        postId: 'post.id1'
      },
      dislikes: {
        postId: 'post.id2'
      },
    }
  },

  posts: {

    'id1': {
      userId: 'user.id1',
      type: 'text|image',
      content: 'string',
      createdAt: 'date',
      likes: 'number',
      dislikes: 'number',
      comments: {
        'id1': {
          userId: 'user.id2'
          content: 'string'
        }
      }
    },
    'id1': {
      userId: 'user.id2',
      type: 'text|image',
      content: 'string',
      createdAt: 'date',
      likes: 'number',
      dislikes: 'number'
    }
  }
}*/

(function () {

  angular.module('memebook.login', ['ngRoute']);

  angular
    .module('myapp', [
      'ngResource',
      'memebook.login'
    ])
    .config([
      '$httpProvider',
      function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
      }
    ]);

  angular.module('myapp')
    .controller('mainController', [
      '$http',
      '$scope',
      'firebaseFactory',
      'memeService',
      mainController
    ]);

  function mainController ($http, $scope, firebaseFactory, memeService) {

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
    }
  };
})();
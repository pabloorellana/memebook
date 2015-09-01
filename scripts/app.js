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
      text: 'string',
      image: 'string',
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
      text: 'string',
      image: 'string',
      createdAt: 'date',
      likes: 'number',
      dislikes: 'number'
    }
  }
}*/

(function () {

  angular
    .module('memebook', [
      'ngResource',
      'ngRoute',
      'ngAnimate',
      'toaster',
      'memebook.directives',
      'memebook.login',
      'memebook.board',
      'memebook.users'
    ])
    .config([
      '$httpProvider',
      '$routeProvider',
      function ($httpProvider, $routeProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $routeProvider
          .otherwise({
            redirectTo: '/board'
          });
      }
    ]);
})();
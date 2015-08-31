(function () {

  'use strict'

  angular
    .module('memebook.constants')
    .constant('FIREBASE', {
      DATABASE_URL: 'https://popping-inferno-8110.firebaseio.com/',
      POSTS: 'posts',
      USERS: 'users',
      COMMENTS: 'comments'
    });

})();